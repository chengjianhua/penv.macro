/* eslint-disable */
import pluginTester from 'babel-plugin-tester'

export default function createTestsForPenvMacro({plugin}) {
  pluginTester({
    plugin,
    snapshot: true,
    babelOptions: {
      filename: __filename,
    },
    tests: {
      'should replace the environment variable to the matched value': {
        code: `
          import env from '../../macro';

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
          import inlineEnv from '../../macro';
  
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
          import penv from '../../macro';
  
          penv({
            unmatched: () => {},
          });
        `,
      },
    },
  })
}
