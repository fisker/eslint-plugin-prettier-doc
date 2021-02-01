# eslint-plugin-prettier-doc

> ESLint rules for Prettier Doc.

## no-concat

> `concat(…)` has been [deprecated](https://github.com/prettier/prettier/pull/9733), use `array` instead.

**Please disable this rule, before fixing `no-nested-concat`, and `no-single-doc-concat` , they both relay on checking `concat(…)` call**

```js
// Fail
const doc = concat(['prettier', line, '(', line, ')'])
```

```js
// Pass
const doc = ['prettier', line '(', line, ')']
```

## no-empty-flat-contents-for-if-break

> The second argument (flatContents) for `ifBreak(…)` should omitted when it's empty.

```js
// Fail
const comma = ifBreak(',', '')
```

```js
// Pass
const comma = ifBreak(',')
```

## no-nested-concat

> Nested `concat(…)` should be flatted.

```js
// Fail
const doc = concat(['prettier', concat([line '(', line, ')'])])
```

```js
// Pass
const doc = concat(['prettier', line '(', line, ')'])
```

## no-single-doc-concat

> Single `Doc` should use directly.

### Fail

```js
// Fail
const doc = concat(['prettier()'])
```

### Pass

```js
// Pass
const doc = 'prettier()'
```
