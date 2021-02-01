'use strict'

const selector = [
  'CallExpression',
  '[optional=false]',
  '[callee.type="Identifier"]',
  '[callee.name="ifBreak"]',
  '[arguments.length=2]',
  '[arguments.0.type!="SpreadElement"]',
  '[arguments.1.type="Literal"]',
  '[arguments.1.value=""]',
].join('')

const messageId = 'no-empty-flat-contents-for-if-break'

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      url:
        'https://github.com/fisker/eslint-plugin-prettier-doc/blob/main/no-empty-flat-contents-for-if-break.js',
    },
    messages: {
      [messageId]: 'Do not pass empty `flatContents` to `ifBreak(…)`.',
    },
    fixable: 'code',
  },
  create(context) {
    const sourceCode = context.getSourceCode()

    return {
      [selector](node) {
        const [, flatContents] = node.arguments

        context.report({
          node: flatContents,
          messageId,
          fix(fixer) {
            const closingParenthesesToken = sourceCode.getLastToken(node)
            const commaTokenBefore = sourceCode.getTokenBefore(
              flatContents,
              ({ type, value }) => type === 'Punctuator' && value === ','
            )

            return fixer.removeRange([
              commaTokenBefore.range[0],
              closingParenthesesToken.range[0],
            ])
          },
        })
      },
    }
  },
}
