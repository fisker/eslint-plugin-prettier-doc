const selector = [
  'CallExpression',
  '[optional!=true]',
  '>',
  'Identifier.callee',
  '[name="concat"]',
].join('')

const messageId = 'no-concat'

export default {
  meta: {
    type: 'suggestion',
    docs: {
      url: 'https://github.com/fisker/eslint-plugin-prettier-doc#no-concat',
    },
    messages: {
      [messageId]: 'Use array directly instead of `concat(…)`.',
    },
    fixable: 'code',
  },
  create(context) {
    return {
      [selector](node) {
        context.report({
          node,
          messageId,
          fix: (fixer) => fixer.replaceText(node, ''),
        })
      },
    }
  },
}
