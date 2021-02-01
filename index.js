'use strict'

module.exports = {
  rules: {
    'no-concat': require('./rules/no-concat'),
    'no-empty-flat-contents-for-if-break': require('./rules/no-empty-flat-contents-for-if-break'),
    'no-nested-concat': require('./rules/no-nested-concat'),
    'no-single-doc-concat': require('./rules/no-single-doc-concat'),
  },
}
