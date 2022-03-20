## 0.2.4

- Fix `result` value is touched / dirtied before finishing test.

## 0.2.3

- This version is un-published due to some build problems.

## 0.2.2

- Fix wrong `result` when `data` has multiple nested properties.
- Async `$test` method.

```s
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

## 0.2.1

- New `options` parameter. See documentation for more detail.
- Support async validate function.

```js
const rules = reactive({
  name: {
    name: 'required',
    test: value =>
      new Promise(resolve => {
        resolve(true);
      }),
  },
});
```

- Clear entry data (`$error`, `$invalid`, `$messages`) on resetting.

## 0.2.0

- Support `Ref` data and `Ref` rules.

```js
export default {
  setup() {
    const data = ref({ name: 'Evelyn' });
    const rules = ref({
      name: {
        name: 'required',
        test: value => Boolean(value),
        message: 'Name must not be empty.',
      },
    });

    const { result } = useValidate(data, rules);

    return { result, data };
  },
};
```

## 0.1.3

- Convert from JavaScript to TypeScript.
- Fix wrong default `result`.
