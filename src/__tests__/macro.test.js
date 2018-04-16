import pluginTester from 'babel-plugin-tester'
import plugin from 'babel-plugin-macros'

process.env.NODE_ENV = 'test'

const testMacro = () => {
  pluginTester({
    plugin,
    snapshot: true,
    tests: {
      'should replace the environment variable to the matched value': {
        code: `
          import env from './src/macro';
  
          const variable = env({
            development: 'development',
            staging: 'staging',
            production: 'production',
            test: () => {
              console.log('test');
              
              return 'test';
            }
          });
        `,
      },

      'should use `null` as default value if no relevant value was matched': {
        code: `
          import inlineEnv from './src/macro';
  
          const variable = inlineEnv({
            development: 'development',
            staging: 'staging',
            production: 'production',
          });
        `,
      },

      'should remove expression if `env` is a standalone expression': {
        // only: true,
        code: `
          import penv from './src/macro';
  
          penv({
            unmatched: () => {},
          });
        `,
      },
    },
  })
}

describe('penv.macro', () => {
  describe('# with config', () => {
    let originalAppEnv

    beforeAll(() => {
      originalAppEnv = process.env.APP_ENV
      process.env.APP_ENV = 'test'
    })

    testMacro()

    afterAll(() => {
      process.env.APP_ENV = originalAppEnv
    })
  })

  describe('# without config', () => {
    let originalNodeEnv

    beforeAll(() => {
      originalNodeEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'test'

      jest.doMock('cosmiconfig', () => {
        return () => ({load: () => null})
      })
    })

    testMacro()

    afterAll(() => {
      jest.resetModules()

      process.env.NODE_ENV = originalNodeEnv
    })
  })
})
