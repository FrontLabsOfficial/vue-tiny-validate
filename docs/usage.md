## Basic

```js
<template>
  <input v-model="data.name" />
  <div>Is Invalid: {{ result.$invalid }}</div>
  <div v-if="result.$messages.length">
    <span v-for="(message, index) in result.$messages" :key="index">
      {{ message }}
    </span>
  </div>
  <button v-on:click='result.$test'>Validate</button>
</template>

import { reactive } from 'vue';
import useValidate from 'vue-tiny-validate';

export default {
  setup() {
    const data = reactive({ name: 'Evelyn' });
    const rules = reactive({
      name: {
        name: 'required',
        test: (value) => Boolean(value),
        message: 'Name must not be empty.'
      }
    })

    const options = reactive({});

    const { result } = useValidate(data, rules, options);

    return { result, data };
  }
}
```

The `useValidate` composition requires 3 parameters: `data`, `rules` and `options`. `data` and `rules` are **mandatory**.
They must have the **same properties** at every level. The other one `options` is optional.

These 3 parameters must all be **reactive object**. To be exact, they can only be `Ref`, `Reactive` or `Computed`.

Start validating your data by calling the `$test` method. All the validation states (such as **messages**) will be
stored in the `result` object.

::: warning
Re-assigning any **rules** or **options** values will also reset the **validation results**.
:::

### Nested data

Data can also be nested. Again, remember to assign the **same properties** for `data` and `rules` at every level.

```js
const data = reactive({
  name: 'Evelyn',
  add: {
    street: 'St Louis',
  },
});

const rules = reactive({
  name: {
    name: 'required',
    test: value => Boolean(value),
    message: 'Name must not be empty.',
  },
  add: {
    street: {
      name: 'required',
      test: value => Boolean(value),
      message: 'Street must not be empty.',
    },
  },
});
```

## Rules

Each property has its own rule. Rule must be **an object** (validator).

```js
const rules = reactive({
  name: {
    name: 'required',
    test: value => Boolean(value),
  },
});
```

Each validator has 3 properties: `key`, `test` and `message`. The first two items are **mandatory** and the other one
`message` is **optional**.

`key` is an unique string that is used to identify which **error** the property has after being validated.

`test` is a validate function that returns a **boolean** value. All the validate logic goes here.

Whenever the `test` function returns false value, a `message` string is also returned.

### Multiple

When the property has **more than one** rules, these rules must be presented in an **array** of validators.

```js
const rules = reactive({
  name: [
    { name: 'required', test: value => Boolean(value) },
    {
      name: 'maxLength10',
      test: value => value.length <= 10,
      message: 'Excess max length',
    },
  ],
});
```

### Async

**Async validation** is supported by default. Simply assign ab **async function** or a function that returns a
**Promise** to `test`.

```js
const rules = reactive({
  name: {
    name: 'required',
    test: (value) => new Promise(resolve => {
      resolve(true);
    });
  }
})
```

```js
const rules = reactive({
  name: {
    name: 'required',
    test: async (value) => {
      const r = await new Promise(resolve => {
        resolve(true);
      });

      return r;
    };
  }
})
```

### Extra parameters

In some cases, `test` depends on other parameters. In other words, you need to provide a **dynamic validator**, which
can simply be done by creating a **higher order function** that wraps your normal validator.

```js
const rgxCheck = rgx => value => rgx.test(value);

const rules = reactive({
  name: {
    name: 'checkZipCode',
    test: rgxCheck(/^[0-9]{5}(?:-[0-9]{4})?$/),
  },
});
```

## Messages

As said above, `message` is basically a string that is returned when `test` returns **false**.

```js
const rules = reactive({
  name: {
    name: 'required',
    test: value => Boolean(value),
    message: 'This property is required.',
  },
});
```

### With data value

If you need to include the **data** value in your message, simply assign a function that returns a **string** to
`message`.

```js
const rules = reactive({
  name: {
    name: 'required',
    test: value => Boolean(value),
    message: value => `Your "${value}" is not allowed.`,
  },
});
```

### Extra parameters

Same as the above. If you need to provide a **dynamic message**. Simply create a **higher order function** that wraps
your normal `$message` method.

```js
const messageWith = extra => value =>
  `The word "${extra}" will be rejected. Your ${value} is not allow.`;

const rules = reactive({
  name: {
    name: 'required',
    test: value => Boolean(value),
    message: messageWith('hello'),
  },
});
```

## Test

Validate your data by calling the `$test` method. Technically, it will run through all properties and execute each of
their validator.

::: warning
`$test` is either function or async function.
:::

```js
const { result } = useValidate(data, rules);

// This function is called to test all data
const testAll = () => {
  result.$test();
};

// This function is called to test the -name- property
const testName = () => {
  result.name.$test();
};
```

::: warning
Be careful. The `$test` method is different from the `test` function in validator.
:::

### Lazy

To **minimize** the processing time, you would sometimes want to **skip** validating **unchanged** (or undirtied, untouched)
properties. In this case, you could use the `lazy` option.

```js
const options = reactive({ lazy: true });

const { result } = useValidate(data, rules, options);
```

### Return first error

With the same purpose of **minimizing** effort, you could **stop** the validation process after you have detected the
**first error**. This can be done by using the `firstError` option.

If you want to have only one error at most at each validation, use the `firstError` option.

```js
const options = reactive({ firstError: true });

const { result } = useValidate(data, rules, options);
```

### Auto test

If you want the `$test` method to be called whenever any properties have changes, use the `autoTest` option.

```js
const options = reactive({ autoTest: true });

const { result } = useValidate(data, rules, options);
```

## Touch

Normally, only changed properties are considered as **touched** or **dirtied**. You can intentionally cause the property
to be **touched** or **dirtied** by calling the `$touch` method.

```js
const { result } = useValidate(data, rules);

// This function is called to touch all data
const touchAll = () => {
  result.$touch();
};

// This function is called to touch the -name- property
const touchName = () => {
  result.name.$touch();
};
```

### Auto touch

If you want the `$touch` method to be called whenever any properties have changes, use the `autoTouch` option.

```js
const options = reactive({ autoTouch: true });

const { result } = useValidate(data, rules, options);
```

### Touch on test

If you want the `$touch` method to be called along with the `$test` method, use the `touchOnTest` option.

```js
const options = reactive({ touchOnTest: true });

const { result } = useValidate(data, rules, options);
```

## Transform

If you want to transform the `result` value, use the `transform` option.

```js
// add some additional value to result object
const transform = value => ({ ...value, addition: 'some value' });

const options = reactive({ transform });

const { result } = useValidate(data, rules, options);
```

## Reset

Calling the `$reset` method will set the `errors`, `messages`, `invalid` and `pending` value of the property to its
default value.

```js
const { result } = useValidate(data, rules);

// This function is called to reset all data
const resetAll = () => {
  result.$reset();
};

// This function is called to reset the -name- property
const resetName = () => {
  result.name.$reset();
};
```
