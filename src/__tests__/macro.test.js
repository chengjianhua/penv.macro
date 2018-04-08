import pluginTester from 'babel-plugin-tester'
import plugin from 'babel-plugin-macros'

process.env.NODE_ENV = 'test'

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
  },
})
