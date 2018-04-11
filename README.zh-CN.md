# penv.macro

[![version][version-badge]][package]
![downloads][downloads-badge]
[![MIT License][license-badge]][license]
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)
[![Babel Macro](https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg?style=flat-square)](https://github.com/kentcdodds/babel-plugin-macros)

`penv.macro` 旨在将多个环境的配置代码集成在一个文件中并且删除在最终的打包文件中的不必要的代码。 了解更多，请点击[这里](DETAILS.zh-CN.md)。

## 语言

[English](README.md) | [中文](#)

## 安装

该模块与 [node](https://nodejs.org/en/) 捆绑在一起的 [npm](https://www.npmjs.com/) 配合进行使用，请确保他们已经存在于你的项目之中。

```shell
yarn add penv.macro --dev
```

或

```shell
npm install penv.macro --save-dev
```

如果你还没有配置安装 [babel-macros](https://github.com/kentcdodds/babel-plugin-macros)，请先完成这一步。

## 使用

一旦你已经完成 [配置 `babel-macros`](https://github.com/kentcdodds/babel-plugin-macros/blob/master/other/docs/user.md) 你就可以使用 `import/require` 导入 `penv.macro` 。

### 基本用法

```javascript
import env from 'penv.macro'

const BASE_URL = env({
  development: 'https://development.example.com',
  staging: 'https://staging.example.com',
  production: (() => 'https://production.example.com')(),
})

// 假定 `process.env.NODE_ENV` 的值是 `production`
const BASE_URL = (() => 'https://production.example.com')()
```

### 进阶用法

默认的 [node](https://nodejs.org/en/) 环境变量用于确定哪个属性值所匹配的是 `NODE_ENV`，如果你想改变默认配置，可以通过 [配置 `babel-plugin-macros`](https://github.com/kentcdodds/babel-plugin-macros/blob/master/other/docs/author.md#config-experimental) 进行自定义。

`<ProjectRoot>/package.json` 示例:

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

想获取更多配置详情，请点击[这里](https://github.com/kentcdodds/babel-plugin-macros/blob/master/other/docs/author.md#config-experimental)。

## 问题反馈

点击[这里](https://github.com/chengjianhua/penv.macro/issues/new)进行问题反馈。

## 许可

[MIT](https://github.com/chengjianhua/penv.macro/blob/master/LICENSE)

[npm]: https://www.npmjs.com/
[version-badge]: https://img.shields.io/npm/v/penv.macro.svg?style=flat-square
[package]: https://www.npmjs.com/package/penv.macro
[downloads-badge]: https://img.shields.io/npm/dm/penv.macro.svg?style=flat-square
[npmcharts]: http://npmcharts.com/compare/penv.macro
[license-badge]: https://img.shields.io/npm/l/penv.macro.svg?style=flat-square
[license]: https://github.com/chengjianhua/penv.macro/blob/master/LICENSE
