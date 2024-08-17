---
author: Utkarsh Goel
pubDatetime: 2024-08-17T12:00:00Z
title: Getting started with ROS using Python - Part 2
postSlug: ros_part2
featured: false
draft: false
tags:
  - python
  - ros2
ogImage: ""
description: The part 2 to the multi-part series of a developer's journey with ROS2 and Python
---

This is the second part of the series that I have promised to eventually complete before September. If you have not read fir the first part, you might still be able to make sense of this if you are an absolute chad. You can always go back and read the [first part](/posts/ros_part1).

In this part, I am going to cover the next chunk of content that is also a part of my talk. I left the last part at teasing the `colcon build` command in an empty ROS workspace. Let's pick up from there. We can start writing some actual code in there. If you have never written ROS packages before, you might feel a bit lost. ROS is opinionated. You need to structure your packages a certain way, need to write your nodes a certain way and then build and run your nodes in a specific way as well. Its not all that hard once you know what goes where.

By the end of this part, you will have a basic Python based ROS node written and executable. We'll not get into writing the business logic yet, but this post gets you almost all the way there, after which you can decide to take it upon yourself.

# Nomenclature of ROS2

So we have already talked about workspace, and just in the last paragraph I dropped nomenclature such as packages, nodes and, lets add topics, to that as well. So before we even write a single line of code, we can do a quick crash-course on ROS nomenclature. Briefly, here is what you need to know:

- Workspace - An isolated folder where you, and ROS is going to put everything when you are building your own project. This workspace is a standalone environment, quite clean in my opinion.
- Package - A distributable module in ROS. You organise your code in packages, and once ready, you can give these packages to other people to install and run on their robots.
- Node - A piece of code that runs like a process, similar to when you run a simple script in Python.
- Topic - A named message highway where you publish messages from nodes, or subscribe to messages in nodes.
- Message - A structured, typed data.

This nomenclature should be sufficient to get us through the whole series. There is something that is not ROS nomenclature above: the concept of pub-sub (publish and subscribe). In case you are not familiar with it, I encourage you to read up a little bit just to understand the concept and hop right back in because all you need is understanding of the concept. Everything else, we will eventually cover as you read.

# Create a package

First step to getting started: create a package in your workspace. ROS provides the scaffolding for you. You just need to run the command:

```
$ /home/1heartros/ros_ws/src > ros2 pkg create my_package --build-type ament_python
```

This should create the directory for you in the `src` folder, named `my_package`. That directory should have a `package.xml` file, and another `my_package` folder in it, with an `__init__.py` file.

```
.
- resource
- - my_package
- setup.cfg
- setup.py
- test
- - test_pep257.py
- - test_flake8.py
- - test_copyright.py
- package.xml
- my_package
- - __init__.py
```

If that did not work for you, go through this list of troubleshooting:

1. Did you source ROS?
2. Did you go inside the ROS workspace's `src` directory?
3. Did you read the error more carefully when you ran the command above?

If these did not help you, we are back to off-roading here. I cannot possibly cover everything that can go wrong, but I am sure you will come back to this point in the article once you feel like you have arrived at the result that we were expecting by the end of this step: a `my_package` directory.

# Write your first node

Your code goes inside a `.py` file inside the same folder as the `__init__.py` file. Let's say we call it `node.py`.

The basics of writing a node is such:

- You create a node instance
- You spin the node instance
- You kill the node instance

I am oversimplifying it but the concept is just that.

Something as minimal as below would do that:

```py
import rclpy
from rclpy.node import Node


def main():
    rclpy.init()

    node = Node("my_node")
    rclpy.spin(node)

    node.destroy_node()
    rclpy.shutdown()


if __name__ == "__main__":
    main()
```

The above node will run, but it will do absolutely nothing, just run indefinitely until terminated. But let's say we want to get this running, before we start putting our business logic. We'll make modifications to it later to add the logic.

# Building your node

Packages inside a ROS workspace can be built with the command `colcon build`. You have to be in the workspace directory to do so (remember the guide in part 1). Once the build is complete, your ROS2 packages in the workspace are installed within your workspace. That is the elegant thing about ROS workspaces. Just like you source the ROS2 installation, you can source your local workspace:

```
$ /home/1heartros/ros_ws > source ./install/local_setup.bash
```

You can then run your nodes inside your packages. ROS allows you to run nodes using a `ros2 run` command for installed packages. You can run the following command:

```
ros2 run package_name console_script
```

Where package_name is the name of the installed ROS2 package. However, we've not come accross `console_script` yet.

## Console Script

The `package_name` is already defined when creating the package (in our case "my_package"). This console script is defined in the `setup.py` file. If you open the file, you'll see an empty section for `console_scripts`

```
    ...
    entry_points={
        "console_scripts": [
        ],
    },
    ...
```

We can define one in there that runs our main function:

```diff
    ...
    entry_points={
        "console_scripts": [
+            "node = my_package.node:main",
        ],
    },
    ...
```

See how it's defined? `my_package` is the folder in which the `__init__.py` is. Next, `node` is the `node.py` file. Lastly, `main` is the entry function.

How that you have that in place, you are ready to build your package and see your node run.

Go back to the workspace directory and run the build.

```
$ /home/1heartros/ros_ws > colcon build
Starting >>> my_package
Finished <<< my_package [0.49s]

Summary: 1 package finished [0.62s]

$ /home/1heartros/ros_ws > source ./install/local_setup.bash
$ /home/1heartros/ros_ws > ros2 run my_package node

```

If you see the cursor waiting for you to terminate at the end, then everything has gone well! You have a node running using Python! In case it did not, take a step back to understand what went wrong. There is no shame at meeting us back at the top. In fact, you get to read more of my words again, and hopefully with some helpful exploration on the internet, get to learn a lot more than whatever I cover in my post alone.

Fron here on, you can start adding you logic to your Python node, which is the exciting part. But there is a lot of information in this post already, and I want to make sure that all of you hae the chance to absorb this information in more bite-sized pieces, than a four-course meal. So, this part of the series will take a break here.

# We'll see you in the next part

Just like I said in the previous part, if my next part is out, you will find it linked here: LINK. If not, it only means, you've reached here before I could write the next part. So if you wish to keep going ahead, you may need to start offroading from here. I'm sure you'll probably be fine! What's really the worst? If you're asking me, I would love to meet you at the top again if all goes to shit.

I'll see you in the next part! We'll start doing some logic in our nodes, so they can do more than just wait for termination.
