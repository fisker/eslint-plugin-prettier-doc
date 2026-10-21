# eslint-plugin-prettier-doc

[![Npm Version][package_version_badge]][package_link]
[![MIT License][license_badge]][license_link]
[![Coverage][coverage_badge]][coverage_link]

[coverage_badge]: https://img.shields.io/codecov/c/github/fisker/eslint-plugin-prettier-doc.svg?style=flat-square
[coverage_link]: https://app.codecov.io/gh/fisker/eslint-plugin-prettier-doc
[license_badge]: https://img.shields.io/npm/l/eslint-plugin-prettier-doc.svg?style=flat-square
[license_link]: https://github.com/fisker/eslint-plugin-prettier-doc/blob/main/license
[package_version_badge]: https://img.shields.io/npm/v/eslint-plugin-prettier-doc.svg?style=flat-square
[package_link]: https://www.npmjs.com/package/eslint-plugin-prettier-doc

> ESLint rules for [Prettier Doc](https://github.com/prettier/prettier/blob/main/commands.md).

## Install

```bash
yarn add eslint-plugin-prettier-doc --dev
```

## Usage

Use `recommended` preset config

```js
import eslintPluginPrettierDoc from 'eslint-plugin-prettier-doc'

export default [
  // ... your other eslint configs
  eslintPluginPrettierDoc.configs.recommended,
]
```

Or config manually

```js
import eslintPluginPrettierDoc from 'eslint-plugin-prettier-doc'

export default [
  // ... your other eslint configs
  {
    plugin: {'prettier-doc': eslintPluginPrettierDoc},
    rules: {
      'prettier-doc/no-concat': 'error',
    },
  },
]
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
const doc = ['prettier', line, '(', line, ')']
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
const doc = concat(['prettier', concat([line, '(', line, ')'])])
```

```js
// Pass
const doc = concat(['prettier', line, '(', line, ')'])
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
