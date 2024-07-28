---
author: Utkarsh Goel
pubDatetime: 2024-07-29T12:00:00Z
title: Getting started with ROS using Python
postSlug: ros_part1
featured: false
draft: false
tags:
  - python
  - ros2
ogImage: ""
description: The part 1 to the multi-part series of a developer's journey with ROS2 and Python
---

I will be writing this topic in multiple parts, that I'll try to publish over the next couple of days/weeks. Eventually, I will be giving a talk on this topic in PyCon which will span about 45 mins. Hopefully, by the time I am writing the last part of this series of posts, I will be ready to give that talk as well.

Now, I know a lot of you saw Python in the title and, if I gave you a comment box under this blog, you'd be ready to hit me with the skill issues comments, or show me the right path of using C++ for blazing fast performance. I already hear you. I spend a lot of time writing C++ in my work building robots. However, my goal here is to pave a path for existing Python developers, or even beginners in programming to adopt Python as their entrypoint into robotics if they wish to do so. I am sure we can all agree that Python is a lot easier to learn.

# Why this guide for ROS and python

Even before I get started with my guide, I must inform you, the reader, that if you are looking for a no-BS short way to get started with ROS and Python, there is nothing better than the official ROS documentation websites. That's how I got started, and I think it is by-far one of the best I have come across on the internet. Follow the installation steps on the website, and you can get going almost instantly.

Then why am I even writing this?

There's very little content for beginners to get started with robotics. At least that is how I felt, when I got started in 2018, as I remember it. I am no expert by any means, but I have been doing this stuff for a bit, and I feel like it is my time to give back, may be with an organised set of thoughts and walk through for someone who might be me in 2018, today.

I would give you a step-by-step on how to install ROS, write your code, etc etc... but I want this article to be useful hopefully way into the future. So instead of giving some commands to type in, I'll make this a more of a gamebook like experience where as you read, I will tell you to go somewhere else for a bit before you come back here. Get in on the adventure!

# Let's get started

So first things first, let's make sure you know what you're installing on your computer. Do you have a computer? What operating system (OS) are we using? I will **mandate** Ubuntu for the purpose of this article. This matters. It's a fact that ROS is just easier to work with on Ubuntu. You will be working with the path of least resistance.

What Ubuntu version you use depends on the year in which you are reading this post. I'm using Ubuntu 20.04, and as a consequence, I am going to install ROS Foxy. This also matters! **Ubuntu versions and ROS versions are paired together**. Find your ROS version for your Ubuntu version with a quick search on the internet and then hop back here. I just went for a "ROS Foxy install Ubuntu" and the first result was it. Then I chose the "Debian" install and copied a few commands in. Few minutes in, easy install. Can't commend the ROS docs enough on this. They really have good instructions.

Just don't fuck around here. Seriously read through the installation instructions and be a champ and install at least the non-optional stuff fully.

I'll also add in a tip that you'll need this thing called `colcon` working properly. As of today (when I wrote this), the package was called `python3-colcon-common-extensions` and I could install it with `sudo apt install python3-colcon-common-extensions`. Thank me later!

If you really have ROS installed on your system, you should be able to `source` it in your terminal and run the basic ROS command line stuff.

### Unpacking `source` for the beginners. Move to the next section if you know this.

`source` lets you tell your command line to put some stuff in your command line's environment. By default, some program locations, for example, ROS is not known by your terminal. If you use the `source` command, and source the file that ROS provides, that file helps your command line to learn the location of the ROS command line tools. Once you have run the `source` command, the ROS command line tools will be available within that command line session. _You close that command line window and open a new one, you'll need to `source` again_.

## Source the ROS installation

I am using ROS Foxy in Ubuntu 20.04, in a `bash` shell. So I run:

```
source /opt/ros/foxy/setup.bash
```

Just remember to change the things in the command based on your ROS version, and shell.

Don't know what _shell_ you are using? Just run `echo $0`. If you're on `bash`, it will give you a `-bash` as output. If you are on `zsh` it will give you `-zsh` as output. You only need to care about this when you are running `source` and never again. Then the extension at the end of that command will change from `.bash` to `.zsh` if you are on `zsh`, for instance.

## Check that you got it right

Just run the ros command

```
$> ros
```

You should get a long list of available ROS commands available to you and whatnot. If you didn't get that, you messed up. Check what went wrong. If this command didn't give a nice output, trust me you are a lucky person. You are in for a journey that I am not going to document in this post, and you'll mostly be offroading, but it will be fun and educational. Just remember that if you feel that running some random command on the internet is _going to far_, sit back and think if it really solves your problem. Otherwise, we'll be pulling you out of a ditch where you'll be installing your operating system again, and we'll meet at the top of this article (which I look forward to if that happens :P).

## Create a workspace for your code

If all of this went well, then you need a ROS workspace. This is me being vulnerable here, and I hope that you will be supportive here. When I first got started, I did not understand this concept. I know what you're thinking, "what an idiot". Where I came from, things were simple when we made projects: create a folder, write your code in it, build it and do what you want with the executable (think Go). When the docs told me to make a workspace, I felt something equivalent to the culture shock that I felt when I first came from India to Hong Kong.

It's a simple concept though. Just under your home directory, or anywhere on your computer, where you put your code, you make a folder where you are going to do your ROS shenanigans. Say we call is `ros_ws` as the documentation tells us, or whatever to your heart's content. It does not matter. It does not need to be the only folder as well. You can have multiple workspaces on your computer too. More on that later.

**Your ROS workspace has to have a specific structure to it.** This is important. You have to make a folder called `src` inside your workspace. This folder will contain your `packages`, your little self-sufficient code thingies that will do stuff in ROS. So go ahead and make a `src` folder inside the workspace you created as well.

```
$ /home/1heartros/ros_ws > mkdir src
```

Remember we installed this `colcon` thing before? It's a handy build tool for ROS. Even with an empty src directory, you can go ahead and run `colcon build` **from your workspace directory**. I sometimes make this mistake even today, but you have to make sure that you are running this `colcon build` command when you are in your workspace directory on the command line, and not anywhere else. Don't know where you are? Run `pwd` to print the current working directory of your command line. In my case following the above example, I would get `/home/1heartros/ros_ws`. After the `colcon build` command runs, you should have 3 more folders in your workspace alongside `src`: `build`, `install` and `log`. If all of them didn't appear, you messed up again. You are on that journey we talked about earlier and I wish you the best. I'm sure we'll see you again.

# The end of the beginning

If you got to the end here, congratulations, you have made it to the end of this part. I had the itch to really keep going, and help you make your first package. But I realised that if you are just getting started, following the above may have already been a chonky amount of content to swallow. But things are getting exciting so I understand you may want to keep up the momentum. If my next part is out, you will find it linked here: LINK. If not, it only means, you've reached here before I could write the next part. So you may need to start offroading from here. I'm sure you'll probably be fine! What's really the worst? If you're asking me, I would love to meet you at the top again if all goes to shit.

I'll see you in the next part!
