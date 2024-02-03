---
author: Utkarsh Goel
pubDatetime: 2024-02-03T15:00:00Z
title: The concept of SSH apps is mind blowing!
postSlug: ssh-apps
featured: true
draft: false
tags:
  - ssh
  - linux
  - go
  - sysadmin
ogImage: ""
description: "I am trying to build a SSH app that can help me with remote robot management and debugging"
---

What do you think about when you think SSH? I think about a terminal window. Or so I used to. I came across the concept of SSH apps. These are apps that when you "SSH" into a machine, you don't see a terminal window, instead, you might see a TUI. I fundamentally understood that SSH is a "protocol" and not the terminal itself, but it kinda blew my mind for a moment.

## Where would you have seen SSH?

SSH allows for a secure connection between two machines. You may have used SSH to login to remote servers, clone a GitHub repository, transfer files to remote servers, and even create tunnels to specific ports on a remote server. It is also possible that you may have not encountered SSH so far (in which case, I am excited that this is your first exposure to the concept)!

The fact is, all of the above is possible, with a secure connection, over an otherwise insecure network, with the help of the SSH protocol!

## The concept of SSH Apps

This has piqued my interest since I learned about [wish](https://github.com/charmbracelet/wish) on YouTube. I watched it, and my first reaction was "Of course!" and then I could not stop imagining the possibilities of what all I could achieve with this concept, at work!

I manage a few servers, and remote machines (robots) every now and then using SSH. There are a couple of repeated tasks when I remote into one of our robots. Usually, it is to check if a daemon service is running well, read some logs, or run commands. I have been wondering if I could create a simple SSH app that would help me with these tasks. That way, I can simply "SSH into the app" to get a quick glance at everything I usually need to see, and build in some keyboard shortcuts that I can run with simple key presses.

And that is exactly what I will be doing very soon! I will be using wish, along with [bubbletea](https://github.com/charmbracelet/bubbletea), to create an SSH app for robot diagnosis.

![SSH into a server via wish](/assets/blog/ssh-apps/termscreen.gif)

I'll post further updates soon!

## References

1. Check our [charm.sh](https://charm.sh)! Most of what I talked about is built by the amazing team there.
2. Learn about SSH [on Wikipedia](https://en.wikipedia.org/wiki/Secure_Shell).
3. Check out [wish](https://github.com/charmbracelet/wish) on GitHub.
4. There's an interesting [video on YouTube](https://youtu.be/bo6BVvfvH-k?feature=shared) that talks about SSH and charm!
