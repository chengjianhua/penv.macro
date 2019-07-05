import macrosPlugin from 'babel-plugin-macros'

import createTests from './helpers/create-tests'

process.env.NODE_ENV = 'test'

describe('penv.macro', () => {
  describe('# with config', () => {
    let originalAppEnv

    beforeAll(() => {
      originalAppEnv = process.env.APP_ENV
      process.env.APP_ENV = 'test'
    })

    createTests({
      plugin: (babel, options) =>
        macrosPlugin(babel, {
          penv: {
            targetName: 'APP_ENV',
          },
          ...options,
        }),
    })

    afterAll(() => {
      process.env.APP_ENV = originalAppEnv
    })
  })

  describe('# without config', () => {
    let originalNodeEnv

    beforeAll(() => {
      originalNodeEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'test'
    })

    createTests({
      plugin: (babel, options) =>
        macrosPlugin(babel, {
          penv: null,
          ...options,
        }),
    })

    afterAll(() => {
      process.env.NODE_ENV = originalNodeEnv
    })
  })
})
