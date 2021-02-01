'use strict'

const selector = [
  'CallExpression',
  '[optional=false]',
  '[callee.type="Identifier"]',
  '[callee.name="concat"]',
  '[arguments.length=1]',
  '[arguments.0.type="ArrayExpression"]',
  '[arguments.0.elements.length=1]',
  '[arguments.0.elements.0.type!="SpreadElement"]',
].join('')

const messageId = 'no-single-doc-concat'

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      url:
        'https://github.com/fisker/eslint-plugin-prettier-doc/blob/main/no-single-doc-concat.js',
    },
    messages: {
      [messageId]: 'Do not use `concat(…)` to concat single `Doc`.',
    },
    fixable: 'code',
  },
  create(context) {
    const sourceCode = context.getSourceCode()
    return {
      [selector](node) {
        context.report({
          node,
          messageId,
          fix: (fixer) =>
            fixer.replaceText(
              node,
              sourceCode.getText(node.arguments[0].elements[0])
            ),
        })
      },
    }
  },
}
