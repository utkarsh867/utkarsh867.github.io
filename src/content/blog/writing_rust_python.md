---
author: Utkarsh Goel
pubDatetime: 2023-11-28T15:22:00Z
title: Import your Rust code in Python
postSlug: rust_python_lib
featured: true
draft: false
tags:
  - python
  - py03
  - rust
ogImage: ""
description: I've been having fun learning Rust! Building a Rust library that can be imported in Python, started as a joke, but I have been able to discover some really cool things that I hope to share in this article!
---

# Import your Rust code in Python

Why? I started this as a joke. I had just started learning Rust, and as everyone knows Rust is fast! Python is slow. It does not have a type system, which always makes me feel like I am always walking on thin ice. So if was working on a Python project with a team, and I wrote Rust code that could be imported it in Python, I would have the type system, the speed, and no one would have to "re-write everything in Rust". Awesome! I get the added benefit of telling everyone that you wrote it in Rust and be the 10x engineer that I am striving to be.

With the intention to spin up a little project that can be imported in Python, I got to the internet search and found PyO3! I understood that I was not the first person to have this bright idea.

Check out PyO3 btw: https://pyo3.rs

## A small test project

It's admittedly very simple to get started with PyO3, but I thought that if I was going to screw it up in my first attempt, it should be a side-project or a dummy project. I also wanted to approach this a little differently than what I had previously joked about. I wanted to build a Python library using Rust. It would have Rust code, but install with PyPi and would be usable by simply importing it in a Python file. I'll briefly explain the process with an extremely simple example, and leave the hard work to you.

This library will be called `utkarshpy` will have a `yell_name` function that can be called, and it will print on the screen, in my case, my name. You can take the creative liberty to put whatever you like.

### Start a cargo project: maturin

This is the quick boilerplate stuff. We're making a Rust project, running a init and getting our Cargo.toml and our src directory ready. Now this is where we are introduced to the first new thing, [maturin](https://github.com/PyO3/maturin). It's a zero-config tool for building our library.

Starting the project is simple, we create our project folder, and from in it, run a `maturin init` and get going. It gets us the basic boilerplate: `Cargo.toml`, a `src` directory, and even a `.github` that has some basic CI workflow to build the project. To change the name of the lib, we edit the `Cargo.toml`. If we run a `maturin build` on this project as it is, we'll see that it can make a Python dynamic library file already, and we can install the wheel for the library, usually placed in the `target/wheels` folder.

If you are following this around the same time that it was written, this would be in your `src/lib.rs` file. This is the entrypoint of our library, and the `#[pymodule]` denotes that it is the Python module implementation.

```rust
use pyo3::prelude::*;

/// Formats the sum of two numbers as string.
#[pyfunction]
fn sum_as_string(a: usize, b: usize) -> PyResult<String> {
    Ok((a + b).to_string())
}

/// A Python module implemented in Rust.
#[pymodule]
fn sample(_py: Python, m: &PyModule) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(sum_as_string, m)?)?;
    Ok(())
}

```

### Writing my own function

We now get to adding our function `yell_name`.

```rust
#[pyfunction]
fn yell_name() -> PyResult<()> {
    println!("HELLO UTKARSH!");
    Ok(())
}
```

Quite simple! Just add this to the module using the `add_function` method.

```rust
m.add_wrapped(wrap_pyfunction!(yell_name))?;
```

### Install the library and use it

Mostly done! Build it again using `maturin build` and install the wheel using `pip install <wheel file>`.

In a `main.py`, we just need to import it.

```py
import utkarshpy

utkarshpy.yell_name()
```

```shell
❯ python main.py
HELLO UTKARSH!
```

It worked! PyO3 makes this really simple! This is what I ended up with: https://github.com/tumblingpointers/004-rust-python-library

## A big project

I work on ML projects. I write inference applications as a software engineer, and Python is my only option. And to be honest, it is perfectly fine! There are plenty of capable Python API frameworks: Flask, FastAPI and others. But after having done this small stunt, I thought, can we do this in Rust's Actix web framework. I present to you: Meteorite ☄️ [GitHub](https://github.com/deploifai/meteorite). It implements a simple job queue, uses webhooks to return a response of the job, and uses the Actix web framework to process requests.

Does it really give a huge boost in performance? I have honestly not benchmarked it. It works well, it's easy to maintain, has some in-built stuff that works really well with ML API development, and does not make me anxious as I try to expand its features. So I develop this further! And btw, I'm the 10x engineer now who is writing this in Rust!
