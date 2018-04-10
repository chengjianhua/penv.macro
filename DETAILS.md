## Why

We need different configurations for multiple deployment environments, a classical
solution is writing multiple configuration files which correspond to the environment
respectively. Then use alias or dynamic require to choose what we need.

The process of taking multiple configuration files is straightforward, there are some caveats of it:

* We have to assign different values to one variable in multiple files separately.
  It's hard to read if you want to know all the details of one variable simultaneously,
  even harder if there are more environments.

* As a result of separating it into multiple files, it's common that we would forget to add
  assignment to some other environment configuration files.

All of these could be a nightmare for us, but why didn't we declare them in one configuration file ? That's because we don't want to bundle the irrelevant configurations into a bundle of a specified environment.

`penv.macro` aims to solved the above problems.

## How it works

It read the ast of argument you passed into the `env()` function, then pick the
property whose key matches the value of `process.env.NODE_ENV` and use its
property value node to replace the whole `env(...)` expression statement.

Due to this, it supports plain object only right now and the key must be a string
literal, not a computed expression statement. But the property value can be
anything the `JavaScript` syntax supports.
