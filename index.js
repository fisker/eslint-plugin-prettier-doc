import packageJson from './package.json' with {type: 'json'}
import * as rules from './rules/index.js'

const namespace = 'prettier-doc'

const plugin = {
  meta: {name: packageJson.name, version: packageJson.version, namespace},
  configs: {},
  rules,
}

plugin.configs.recommended = {
  plugins: {
    [namespace]: plugin,
  },
  rules: Object.fromEntries(
    Object.keys(rules).map((ruleId) => [`${namespace}/${ruleId}`, 'error']),
  ),
}

export default plugin
