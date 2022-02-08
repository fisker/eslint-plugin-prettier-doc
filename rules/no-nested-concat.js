const concatCallSelector = [
  'CallExpression',
  '[optional!=true]',
  '[callee.type="Identifier"]',
  '[callee.name="concat"]',
  '[arguments.length=1]',
].join('')

const selector = [
  concatCallSelector,
  '>',
  'ArrayExpression.arguments',
  '>',
  `${concatCallSelector}.elements`,
].join('')

const messageId = 'no-nested-concat'

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      url: 'https://github.com/fisker/eslint-plugin-prettier-doc#no-nested-concat',
    },
    messages: {
      [messageId]: 'Do not use `concat(…)` in `concat(…)`.',
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
          *fix(fixer) {
            // Remove `concat`
            yield fixer.remove(node.callee)
            const openingParenthesisToken = sourceCode.getTokenAfter(
              node.callee,
            )
            yield fixer.remove(openingParenthesisToken)
            const closingParenthesisToken = sourceCode.getLastToken(node)
            yield fixer.remove(closingParenthesisToken)

            const [concatParts] = node.arguments
            if (concatParts.type === 'ArrayExpression') {
              const firstToken = sourceCode.getFirstToken(concatParts)
              yield fixer.remove(firstToken)
              const lastToken = sourceCode.getLastToken(concatParts)
              yield fixer.remove(lastToken)

              // trailing comma
              const lastElement =
                concatParts.elements[concatParts.elements.length - 1]
              const penultimateToken = sourceCode.getTokenAfter(lastElement)
              if (
                penultimateToken.type === 'Punctuator' &&
                penultimateToken.value === ','
              ) {
                yield fixer.remove(penultimateToken)
              }
            } else {
              yield fixer.insertTextBefore(concatParts, '...')
            }
          },
        })
      },
    }
  },
}
