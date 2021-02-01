import path from 'path'
import outdent from 'outdent'
import {RuleTester} from 'eslint'
// eslint-disable-next-line unicorn/import-index
import plugin from './index.js'

const test = (ruleId, tests) => {
  new RuleTester({parserOptions: {ecmaVersion: 2021}}).run(
    ruleId,
    plugin.rules[ruleId],
    tests
  )
}

test('no-concat', {
  valid: ['notConcat([])', 'concat', '[].concat([])'],
  invalid: [
    {
      code: 'concat(parts)',
      output: '(parts)',
      errors: [
        {
          message: 'Use array directly instead of `concat(…)`.',
        },
      ],
    },
    {
      code: "concat(['foo', line])",
      output: "(['foo', line])",
      errors: 1,
    },
  ],
})

test('no-empty-flat-contents-for-if-break', {
  valid: [
    "ifBreak('foo', 'bar')",
    'ifBreak(doc1, doc2)',
    "ifBreak(',')",
    'ifBreak(doc)',
    "ifBreak('foo', '', { groupId })",
    "ifBreak(...foo, '', { groupId })",
    "ifBreak(...foo, '')",
  ],
  invalid: [
    {
      code: "ifBreak('foo', '')",
      output: "ifBreak('foo')",
      errors: [
        {
          message: 'Do not pass empty `flatContents` to `ifBreak(…)`.',
        },
      ],
    },
    {
      code: "ifBreak(((doc)), (('')),)",
      output: 'ifBreak(((doc)))',
      errors: 1,
    },
  ],
})

test('no-nested-concat', {
  valid: [],
  invalid: [
    {
      code: "concat([concat([hardline, hardline]), 'extra'])",
      output: "concat([hardline, hardline, 'extra'])",
      errors: [
        {
          message: 'Do not use `concat(…)` in `concat(…)`.',
        },
      ],
    },
    {
      code: "concat([concat([hardline, hardline, ]), 'extra'])",
      output: "concat([hardline, hardline , 'extra'])",
      errors: 1,
    },
    {
      code: "concat([concat(parts), 'extra'])",
      output: "concat([...parts, 'extra'])",
      errors: 1,
    },
  ],
})

test('no-single-document-concat', {
  valid: [
    'notConcat([doc])',
    'concat([doc], extraArgument)',
    'concat([...parts])',
  ],
  invalid: [
    {
      code: 'concat([path.call(print, "params")])',
      output: 'path.call(print, "params")',
      errors: [
        {
          message: 'Do not use `concat(…)` to concat single `Doc`.',
        },
      ],
    },
  ],
})
