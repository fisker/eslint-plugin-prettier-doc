# eslint-plugin-prettier-doc

> ESLint rules for Prettier Doc.

## no-concat

> `concat(…)` has been deprecated, use `array` instead.

**Please disable this rule, before fixing `no-nested-concat`, and `no-single-doc-concat` , they both relay on `concat(…)`**

### Fail

```js
const doc = concat(['prettier', line '(', line, ')'])
```

### Pass

```js
const doc = ['prettier', line '(', line, ')']
```

## no-empty-flat-contents-for-if-break

> The second argument (flatContents) for `ifBreak(…)` should omitted when it's empty.

### Fail

```js
const comma = ifBreak(',', '')
```

### Pass

```js
const comma = ifBreak(',')
```

## no-nested-concat

> Should be flat nested `concat(…)`.

### Fail

```js
const doc = concat(['prettier', concat([line '(', line, ')'])])
```

### Pass

```js
const doc = concat(['prettier', line '(', line, ')'])
```

## no-single-doc-concat

> Single `Doc` should use directly.

### Fail

```js
const doc = concat(['prettier()'])
```

### Pass

```js
const doc = 'prettier()'
```
