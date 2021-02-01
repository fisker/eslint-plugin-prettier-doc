'use strict'

const rules = [
  'no-concat',
  'no-empty-flat-contents-for-if-break',
  'no-nested-concat',
  'no-single-doc-concat',
]

const definitions = Object.fromEntries(
  rules.map((ruleId) => [ruleId, require(`./rules/${ruleId}`)])
)

const configs = Object.fromEntries(rules.map((ruleId) => [ruleId, 'error']))

module.exports = {
  configs: {
    recommended: {
      rules: configs,
    },
  },
  rules: definitions,
}
