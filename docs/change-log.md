## 0.2.4

- Fix `result` value is touched / dirtied before finishing test.

## 0.2.3

- This version is un-published due to some build problems.

## 0.2.2

- Fix wrong `result` when `data` has multiple nested properties.
- Async `$test` method.

```js
await result.$test();
console.log('Tested');
```

- Cancel async validation on resetting.
- Add more parameters (`data`, `rules`, `options`) to `test` function. Also, update `rule` properties.

```js
const rules = reactive({
  name: {
    // rule now has (name, test, message) properties instead of ($key, $test, $message) properties
    name: 'required',
    test: (value, data, rules, options) => {
      // you can access data, rules, options here
      return Boolean(value);
    },
    message: 'Name must not be empty.',
  },
});
```

- Support Vue 2.6.
- Add `transform` option.

```js
// add some additional value to result object
const transform = value => ({ ...value, addition: 'some value' });

const options = reactive({ transform });

const { result } = useValidate(data, rules, options);
```

