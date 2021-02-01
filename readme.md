# eslint-plugin-prettier-doc [![Coverage](https://img.shields.io/coveralls/github/fisker/eslint-plugin-prettier-doc?style=flat-square)](https://coveralls.io/github/fisker/eslint-plugin-prettier-doc)

> ESLint rules for [Prettier Doc](https://github.com/prettier/prettier/blob/main/commands.md).

## Usage

Add `prettier-doc` to the `plugins` and `extends` sections of your `.eslintrc` configuration file.

```json
{
  "plugins": ["prettier-doc"],
  "extends": ["plugin:prettier-doc/recommended"]
}
```

## Rules

### no-concat

> `concat(…)` has been [deprecated](https://github.com/prettier/prettier/pull/9733), use `array` instead.

This rule is fixable.

**Please disable this rule before fixing `no-nested-concat`, and `no-single-doc-concat`, they both relay on checking `concat(…)` call**

```js
// Fail
const doc = concat(['prettier', line, '(', line, ')'])
```

```js
// Pass
const doc = ['prettier', line '(', line, ')']
```

### no-empty-flat-contents-for-if-break

> The second argument (flatContents) for `ifBreak(…)` should omitted when it's empty.

This rule is fixable.

```js
// Fail
const comma = ifBreak(',', '')
```

```js
// Pass
const comma = ifBreak(',')
```

### no-nested-concat

> Nested `concat(…)` should be flatted.

This rule is fixable.

```js
// Fail
const doc = concat(['prettier', concat([line '(', line, ')'])])
```

```js
// Pass
const doc = concat(['prettier', line '(', line, ')'])
```

### no-single-document-concat

> Single `Doc` should use directly.

This rule is fixable.

```js
// Fail
const doc = concat(['prettier()'])
```

```js
// Pass
const doc = 'prettier()'
```
