<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

* [penv.macro](#penvmacro)
  * [Why](#why)
  * [Installation](#installation)
  * [Use with `babel-plugin-macros`](#use-with-babel-plugin-macros)
  * [Usage](#usage)
    * [Basic](#basic)
    * [Advanced](#advanced)
  * [How it works](#how-it-works)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# penv.macro

[![version][version-badge]][package]
![downloads][downloads-badge]
[![MIT License][license-badge]][license]

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)
[![Babel Macro](https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg?style=flat-square)](https://github.com/kentcdodds/babel-plugin-macros)

The `penv.macro` aims to write configurations of multiple environments in one
file simultaneously and remove irrelevant configuration codes from the final bundle.

## Why

We need different configurations for multiple deployment environments, a classical
solution is that we could write multiple configuration files correspond to the environment
respectively then use alias or dynamic require to pick what we need.

It's straightforward for taking multiple configuration files, there are some caveats of it:

We have to assign different values to one variable in multiple files separately,
it's hard to read if you want to know all the details of one variable simultaneously,
more harder if there are more environments.

Due to separate it into multiple files, it's common that we would forget add
assignment to some other environment configuration file.

All of that are nightmare for us, but why didn't we declare them in one configuration
file ? That's because we don't want to bundle the irrelevant configurations into a
bundle of specified environment.

`penv.macro` aims to solved the above problems.

## Installation

```shell
yarn add -D penv.macro babel-plugin-macros
```

or

```shell
npm install -D penv.macro babel-plugin-macros
```

## Use with `babel-plugin-macros`

The babel plugin `babel-plugin-macros` is required for the usage of this package.
It's a peer dependency of this.

Once you've [configured `babel-plugin-macros`](https://github.com/kentcdodds/babel-plugin-macros/blob/master/other/docs/user.md)
you can import/require the penv macro at `penv.macro`.

For example:

```javascript
import env from 'penv.macro'

const BASE_URL = env({
  development: 'https://development.example.com',
  staging: 'https://staging.example.com',
  production: 'https://production.example.com',
})
```

## Usage

### Basic

Let's see the work of `penv.macro` through the previous example:

```javascript
import env from 'penv.macro'

const BASE_URL = env({
  development: 'https://development.example.com',
  staging: 'https://staging.example.com',
  production: (() => 'https://production.example.com')(),
})

// assume that the value of `process.env.NODE_ENV` is `production`

//      ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓

const BASE_URL = (() => 'https://production.example.com')()
```

### Advanced

The default node environment variable used to determine which property value would
be matched is `NODE_ENV`, if you want to change the default setting, you can customize
it by [configuring `babel-plugin-macros`](https://github.com/kentcdodds/babel-plugin-macros/blob/master/other/docs/author.md#config-experimental).

For example:

```json
// <ProjectRoot>/package.json
{
  "dependencies": {},
  "babelMacros": {
    "penv": {
      "targetName": "NODE_ENV"
    }
  }
}
```

To know more details, go to the above [link](https://github.com/kentcdodds/babel-plugin-macros/blob/master/other/docs/author.md#config-experimental) please.

## How it works

It read the ast of argument you passed into the `env()` function, then pick the
property whose key matches the value of `process.env.NODE_ENV` and use its
property value node to replace the whole `env(...)` expression statement.

Due to this, it supports plain object only right now and the key must be a string
literal, not a computed expression statement. But the property value can be
anything the javascript syntax supports.

[npm]: https://www.npmjs.com/
[version-badge]: https://img.shields.io/npm/v/penv.macro.svg?style=flat-square
[package]: https://www.npmjs.com/package/penv.macro
[downloads-badge]: https://img.shields.io/npm/dm/penv.macro.svg?style=flat-square
[npmcharts]: http://npmcharts.com/compare/penv.macro
[license-badge]: https://img.shields.io/npm/l/penv.macro.svg?style=flat-square
[license]: https://github.com/kentcdodds/penv.macro/blob/master/LICENSE
