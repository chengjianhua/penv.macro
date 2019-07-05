const {createMacro} = require('babel-plugin-macros')

function envVariableMacro({references, babel: {types: t}, config}) {
  const {targetName = 'NODE_ENV'} = config
  const targetEnv = process.env[targetName]

  const {default: defaultReferences} = references

  defaultReferences.forEach(referencePath => {
    const {parentPath} = referencePath
    const argumentPath = parentPath.get('arguments')[0]

    const matchedPropertyPath = argumentPath
      .get('properties')
      .find(propertyPath => {
        const keyName = propertyPath.get('key').node.name

        return keyName === targetEnv
      })

    const matchedValueNode = matchedPropertyPath
      ? matchedPropertyPath.get('value').node
      : t.nullLiteral()

    const wrapperPath = parentPath.get('parentPath').parentPath
    const {parent: parentNode} = wrapperPath
    // console.log(require('util').inspect(wrapperPath, { colors: true, depth: 4 }));

    if (t.isExpressionStatement(parentNode)) {
      wrapperPath.remove()
    } else {
      parentPath.replaceWith(matchedValueNode)
    }
  })
}

module.exports = createMacro(envVariableMacro, {configName: 'penv'})
