## Installation

with NPM:

```bash
npm install vue-tiny-validate
```

or with Yarn:

```bash
yarn add vue-tiny-validate
```

## Quickstart

::: warning
`vue-tiny-validate` is primarily written for **Vue 3**. In order to use with **Vue 2**, you need to install
`@vue/composition-api`.
:::

You already install the library. Lets get started with a very basic usage below.

```js
<template>
  <input v-model="data.name" />
  <span>Is Invalid: {{ result.$invalid }}</span>
  <button v-on:click='result.$test'>Validate</button>
</template>

import { reactive } from 'vue';
import useValidate from 'vue-tiny-validate';

export default {
  setup() {
    const data = reactive({ name: 'Evelyn' });
    const rules = reactive({
      name: {
        $key: 'required',
        $test: (value) => Boolean(value),
        $message: 'Name must not be empty.'
      }
    })

    const { result } = useValidate(data, rules);

    return { result, data };
  }
}
```

As you can see above, the `useValidate` composition requires 2 parameters `data` and `rules`.

The `result` value has everything you need to **get** and **set** the validation. In this example, we use the
`$test` function to validate and the `$invalid` property to get validation state.

Head to [Usage](/usage) to see more detailed instructions.
