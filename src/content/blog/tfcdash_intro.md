---
author: Utkarsh Goel
pubDatetime: 2026-09-16T19:04:01Z
title: Building software for an audience of one
postSlug: tfcdash-tf-cloud
featured: true
draft: false
tags:
  - thoughts
  - opinions
  - terraform
  - ai agents
  - LLMs
ogImage: ""
description: I built tfcdash to approve Terraform Cloud runs from my terminal. It changed how I think about building software for an audience of one.
---

Recently, I have found myself hating one thing about my workflow: leaving the terminal to apply a plan on Terraform Cloud. My workflow runs in GitHub Actions, which triggers a plan on Terraform Cloud but leaves the decision to apply it to me. I open Terraform Cloud in the browser and click the apply button, which completes the release on my infrastructure. It is tedious, but at least I get to take the blame for deleting my Kubernetes pods by clicking apply, not my GitHub Actions workflow.

## Enter tfcdash

What if I had a tool that made just this part easier for me? I found myself wondering, "In this age of AI, isn't this a solved problem?" That's how `tfcdash` came into existence, and it is published [on GitHub](https://github.com/utkarsh867/tfcdash). It is a terminal-based application that replaces the need to browse to Terraform Cloud for the simple task of applying Terraform plans.

I am not arguing that the world needs another TUI. I am arguing that one more can exist to solve the only problem I want it to solve, and nothing else.

## The impact of AI

Ever since I learnt how to program, I have taken the approach that if Express exists, I generally need not implement a web server using Node's `http` module. Why repeat all the work when someone else has done the hard work? If Express had bugs, I could even go back and contribute to it. We all stand on the shoulders of giants who came before us, and everyone benefits in the process.

This project made me realise something about software in a landscape changed by LLMs: a SaaS company or another open-source project no longer needs to solve every small tooling requirement I have. I can build something myself without worrying that it will require a huge investment of time. The perceived cost of building small tools has changed.

Fundamentally, LLMs lower the cost of building software for an audience of one. And they have gotten really good recently!

I've noticed that LLMs have worked really well for me when implementing API layers for platforms I have never studied in detail before. In this case, the Terraform SDK was completely unknown to me. If we were in a pre-LLM era, I would have learnt how to use the SDK. Not anymore! I wrote the basic TUI application UI and then asked an agent to complete the integration with the Terraform SDK. After only a couple of hours of tinkering, the project was usable on my computer.

Now, I find myself reaching for `tfcdash` whenever our team makes a new release that submits a plan on Terraform Cloud.

## Questions worth asking about this experiment

### Am I really saving that much time?

I'll set aside the option of not building this tool at all. I would miss out on all the fun and have to move to my browser, which I do not like!

It is undeniable that LLMs can push out code faster than I can. I tend to type slowly as well. But there are some simple ground rules for when the output is really usable:

1. The requirements given to the LLM are very clear.
2. There is some clarity about the architecture of the application, such as the tech stack you want to use and the way you want to implement certain features.

My role in building the project shifted from development to system design and review. I was able to sprint towards a working application in very few revisions. Every time the agent finished working, I looked at the code, decided on the next direction, and repeated the cycle.

However, LLM prompts can start feeling like slot machines. It is easy to lose track of time while chasing the gratification of seeing the machine produce something you want. That was the biggest time sink during this project. I kept prompting the agent just to see what it might come back with, and the reward loop encouraged me to continue long after the tool met my needs.

### What did I lose out on? What did I gain?

`tfcdash` solves my problem directly and exactly as I imagined it.

If I had built this myself without AI agents to iterate quickly, it would have taken a lot longer. I spent far more time building side projects before this new reality of agentic coding existed, so who is to say whether I would have built this anyway? However, I am sure things moved faster, with far less friction in overcoming the knowledge gaps involved, such as the details of the Terraform SDK and TUI styling.

There used to be a feeling of satisfaction in doing "toy projects" for the love of the game. I am not sure if I feel the same now. When I sit down at my terminal to code, I feel compelled to build things faster. If an agent can give me what I want, why not try that first? Sometimes, I want to pretend that agentic coding does not exist, sit down for a couple of hours, and produce a feature hand-rolled by my own human hands.

I gained a useful tool in a fraction of the time, but I may have lost some of the satisfaction that once made toy projects worth building.
