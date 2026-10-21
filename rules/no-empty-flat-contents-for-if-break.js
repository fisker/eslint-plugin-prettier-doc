// By @sosukesuzuki https://github.com/prettier/prettier/pull/10172

const selector = [
  'CallExpression',
  '[optional!=true]',
  '[callee.type="Identifier"]',
  '[callee.name="ifBreak"]',
  '[arguments.length=2]',
  '[arguments.0.type!="SpreadElement"]',
  '[arguments.1.type="Literal"]',
  '[arguments.1.value=""]',
].join('')

const messageId = 'no-empty-flat-contents-for-if-break'

export default {
  meta: {
    type: 'suggestion',
    docs: {
      url: 'https://github.com/fisker/eslint-plugin-prettier-doc#no-empty-flat-contents-for-if-break',
    },
    messages: {
      [messageId]: 'Do not pass empty `flatContents` to `ifBreak(…)`.',
    },
    fixable: 'code',
  },
  create(context) {
    return {
      [selector](node) {
        const [, flatContents] = node.arguments

        context.report({
          node: flatContents,
          messageId,
          fix(fixer) {
            const {sourceCode} = context
            const closingParenthesesToken = sourceCode.getLastToken(node)
            const commaTokenBefore = sourceCode.getTokenBefore(
              flatContents,
              ({type, value}) => type === 'Punctuator' && value === ',',
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
