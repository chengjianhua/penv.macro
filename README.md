<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

* [penv.macro](#penvmacro)
  * [Language](#language)
  * [Installation](#installation)
  * [Usage](#usage)
    * [Basic](#basic)
    * [Advanced](#advanced)
  * [Issues](#issues)
  * [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# penv.macro

[![version][version-badge]][package]
![downloads][downloads-badge]
[![MIT License][license-badge]][license]
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)
[![Babel Macro](https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg?style=flat-square)](https://github.com/kentcdodds/babel-plugin-macros)

The `penv.macro` aims to write configurations of multiple environments in one
file simultaneously and remove irrelevant configuration codes from the final bundle. If you want to know more about this plugin, please see [here](DETAILS.md).

## Language

[English](#) | [中文](README.zh-CN.md)

## Installation

This module is distributed via [npm](https://www.npmjs.com/) which is bundled with [node](https://nodejs.org/en/) and should be installed as one of your project's `devDependencies`:

```shell
yarn add penv.macro --dev
```

or

```shell
npm install penv.macro --save-dev
```

You'll also need to install and configure [babel-macros](https://github.com/kentcdodds/babel-plugin-macros) if you haven't already.

## Usage

Once you've [configured `babel-macros`](https://github.com/kentcdodds/babel-plugin-macros/blob/master/other/docs/user.md) you can `import/require` `penv.macro`.

### Basic

```javascript
import env from 'penv.macro'

const BASE_URL = env({
  development: 'https://development.example.com',
  staging: 'https://staging.example.com',
  production: (() => 'https://production.example.com')(),
})
###

// Assume that the value of `process.env.NODE_ENV` is `production`
const BASE_URL = (() => 'https://production.example.com')()
```

### Advanced

The default [node](https://nodejs.org/en/) environment variable used to determine which property value would
be matched is `NODE_ENV`, if you want to change the default setting, you can customize
it by [configuring `babel-plugin-macros`](https://github.com/kentcdodds/babel-plugin-macros/blob/master/other/docs/author.md#config-experimental).

For example in `<ProjectRoot>/package.json`:

```json
{
  "dependencies": {},
  "babelMacros": {
    "penv": {
      "targetName": "NODE_ENV"
    }
  }
}
```

To know more details, please go to the above [link](https://github.com/kentcdodds/babel-plugin-macros/blob/master/other/docs/author.md#config-experimental).

## Issues

Click [here](https://github.com/chengjianhua/penv.macro/issues/new) to open a new issue.

## License

[MIT](https://github.com/chengjianhua/penv.macro/blob/master/LICENSE)

[npm]: https://www.npmjs.com/
[version-badge]: https://img.shields.io/npm/v/penv.macro.svg?style=flat-square
[package]: https://www.npmjs.com/package/penv.macro
[downloads-badge]: https://img.shields.io/npm/dm/penv.macro.svg?style=flat-square
[npmcharts]: http://npmcharts.com/compare/penv.macro
[license-badge]: https://img.shields.io/npm/l/penv.macro.svg?style=flat-square
[license]: https://github.com/kentcdodds/penv.macro/blob/master/LICENSE
