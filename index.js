const rules = [
  'no-concat',
  'no-empty-flat-contents-for-if-break',
  'no-nested-concat',
  'no-single-document-concat',
]

function fromEntries(pairs) {
  const object = Object.create(null)
  for (const [key, value] of pairs) {
    object[key] = value
  }
  return object
}

const definitions = fromEntries(
  rules.map((ruleId) => [ruleId, require(`./rules/${ruleId}.js`)]),
)

const configs = fromEntries(
  rules.map((ruleId) => [`prettier-doc/${ruleId}`, 'error']),
)

module.exports = {
  configs: {
    recommended: {
      rules: configs,
    },
  },
  rules: definitions,
}
