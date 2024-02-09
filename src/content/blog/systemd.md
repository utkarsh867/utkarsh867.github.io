---
author: Utkarsh Goel
pubDatetime: 2023-09-18T15:22:00Z
title: Systemd your code that needs to start at boot (Linux)
postSlug: systemd-your-code
featured: false
draft: false
tags:
  - systemd
  - linux
  - python
ogImage: ""
description: We come accross a lot of methods to "start my python code on boot". I find systemd to be elegant and use it all the time.
---

# Systemd your code that needs to start at boot (Linux)

We come accross a lot of methods to "start my python code on boot". I find systemd to be elegant and use it all the time.

### The subjective beauty in using Systemd

Beauty is subjective. However, if you want some process to run at startup there are a few ways Linux systems will let you do it. Very few ways will allow you to define a configuration file that is statically typed, and fully-reliable to run processes during boot. These files are called unit files. They have a standard syntax that define of how the process must be handled. It looks something like:

```
[Unit]
Description=Some description
...
...

[Service]
...
...

[Install]
...
```

Conveniently, there is no scripting at all for common tasks, for example waiting for the network connection, executing as a specific user, or even setting up environment variables in config files. The beauty in it, for me, is that I don't need to do this work myself, and I can make a very clean and simple configuration that can perform these complex functionalities during system startup.

Let's take the example project I am building here.

- It is going to be an HTTP API server using Python and FastAPI. Let's say my server needs to start at system boot. I will configure systemd to enable the service and it will run on every boot.

- Next, let's say our server needs an internet connection. I will add a single line in the configuration to wait for internet connection.

- I also want to run the server as a specific user on the machine. I will add a single line for defining the user that should be assumed when running the process.

All of this simplicity is thanks to systemd!

I can start from creating a sample Python project that hosts an HTTP API, and work my way into making a unit file to launch this application on system startup. Whenever I start my computer, this API server would be online!

## The Python project

There are a couple of main components that make up our Python application.

### 1. FastAPI application

The `/` route is implemented in [main.py](example/example/main.py), which simply responds to a GET request with a dummy JSON.

### 2. Uvicorn

In the [repo](example/example), I have a FastAPI application. The unicorn app is launched using [`run.py`](example/example/run.py).

### 3. Application Config

This one is critical. I generate an executable for my project using configurations in [pyproject.toml](example/pyproject.toml) and [setup.cfg](example/setup.cfg). While the chunk of them is bolierplate, the section below in [setup.cfg](example/setup.cfg) is what creates application-specific executable:

```
[options.entry_points]
console_scripts =
  my_example_app=example.run:main
```

This creates a executable `my_example_app` that can be installed using `pip install -e .`. Run the command in example directory.

```bash
$ cd example
$ pip install -e .
...
...
Successfully installed example-0.0.1

$ my_example_app
INFO:     Started server process [35024]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

If you see an error here, certainly your `PATH` variable is not set up. While that is a separate topic, a few seaches and StackOverflow will reveal some guidance:

1. [How to add a PATH](https://unix.stackexchange.com/questions/26047/how-to-correctly-add-a-path-to-path)
2. [How to make pip install to PATH on Linux?](https://stackoverflow.com/questions/62822956/how-to-make-pip-install-to-path-on-linux)

Now, we finally need to create a systemd unit file that runs this executable. We will configure systemd to run this Python app to run on system boot up.

## The systemd unit file

Unit files are generally placed at `/etc/systemd/system` on Linux systems (although there are other paths where these files can be placed: [read here](https://www.freedesktop.org/software/systemd/man/systemd.unit.html#System%20Unit%20Search%20Path)). Each unit file defines some basic attributes of the daemon, such as a description, dependencies, and execution command.

Unit files are divided in sections. In this project we'll define three sections: `[Unit]`, `[Service]` and `[Install]`. I'll put down a basic unit file first, and then we can walk down the important parts of it.

```
[Unit]
Description=My Example App with FastAPI server
After=network-online.target
Wants=network-online.target

[Service]
User=utkarsh
EnvironmentFile=/opt/my_example_app/env
ExecStart=$HOME/.local/bin/my_example_app
Restart=always

[Install]
WantedBy=multi-user.target
```

### 1. `[Unit]` section

The `Description` is quite self-explanatory. The more interesting part is `After` and `Wants`.

By specifying `After=network-online.target` we tell systemd that the program must start after the network is connected and has a routable IP address. It's important since we have an API server that needs the network to be up first, before it can expose itself over port 8000.

In addition we also give a `Wants=network-online.target`. It specifies that this unit must be started only if the `network-online.target` unit starts. Otherwise, this unit is not started as well.

**Notice the subtle difference here**. `After=` and `Wants=` are defined independently, and do their specific jobs. The `Wants=` does not specify an order in which the service should start, only a dependency. Whereas, the `After=` helps us specify the order. For more details, [read here](https://www.freedesktop.org/wiki/Software/systemd/NetworkTarget).

There are several such Options that can configured, I will let you do your research: [[Unit] Section Options](https://www.freedesktop.org/software/systemd/man/systemd.unit.html#%5BUnit%5D%20Section%20Options)

### 2. `[Install]` section

This example only has one option `WantedBy=multi-user.target`. There is quite a bit to unpack here, so I will try to keep things very simple.

The `.target` unit files are usually a group of other unit files that are controlled together. `multi-user.target` is special. It includes most of the default services that must be started to bring the computer to a ready state in essence.

`WantedBy=` is like a reverse of `Wants=`. It defines that when the `multi-user.target` is reached, this service is one of the services that must be run.

While `WantedBy=` is not mandatory here, but I got to make an introduction to it, and isn't that the point!

### 3. `[Service]` section

This is the section you need to change is you are just copy-pasting everything else :P.

A lot of the options here explain themselves from their name.

```
[Service]
User=utkarsh
EnvironmentFile=/opt/my_example_app/env
ExecStart=$HOME/.local/bin/my_example_app
Restart=always
```

`User=` defines the user privlidges that this program should run with. Change this to your username. We don't want our API server running with `root` privilidges (which is the default). For some of you sharp minded folks, you might be thinking, there are groups in Linux as well, that help manage system previlidges. You can define the group as well, but the default group for the user is used by default, and we're happy with that.

`EnvironmentFile=` is simple as well. It's like a `.env` file for the web-dev folks. However, this becomes really useful if we have lots of these services, that need to have the same environment configurations. Even though we are not doing that here, its nice to show possibilities.

`Restart=always` will restart the service whenever it stops on it's own, for whatever reason. The API crashes and exits, and it will restart. We don't need to handle this ourselves.

And finally, `ExecStart=`. This defines what command must be executed when starting this service. We have the priviledge to use `$HOME` since this service is started as a user. Also note that the path `.local/bin/my_example_app` is where Python will put the executable after `pip install -e .`.

This unit file is in the repo at (etc/my_example_app.service)[etc/my_example_app.service]. It should be copied to `/etc/systemd/system`. Once the file is placed there, we instruct systemd to reload all unit files:

```
sudo systemctl daemon-reload
```

While this unit file is now ready, the final step is to start it, and tell systemd to run it at every boot.

## Starting and enabling the unit file

There is a CLI command to manage systemd called `systemctl`. It has commands like `start`, `stop`, `restart`, `enable` and `disable`, the purposes of which are quite intuitive. While start, stop and restart are self-explanatory, an introduction to enable and disable is all you really need.

The `enable` command is meant to specify to systemd that the service file must be started during boot. It's that simple conceptually. Guess what `disable` does?

To start our service we give the following commands:

```
sudo systemctl enable my_example_app.service
sudo systemctl start my_example_app.service
```

This will start the `my_example_app.service` but also, enable it so when our computer restarts, this service is run again. Very cool~

## In Conclusion

This is a relatively new-found knowledge for me. I use what I have explained above on a daily basis and I think it's great sharing for someone who may just be starting off in their learning journey for Linux administration!

Do not take whatever is here as a dictation of the "best practices". In fact I can point out a few places where this approach to things is not the best practice. Let's take the `After=network-online.target`. It actually slows the system on boot. It may be better if our application just handled the edge cases. But sometimes, it becomes a necessity. At the end, it really matters what you are working with.

Thanks for reading!

## Further readings

[Rethinking PID 1, Lennart Poettering](http://0pointer.de/blog/projects/systemd.html)
