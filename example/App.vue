<template>
  <div>
    <div>
      <label>First Name</label>
      <input v-model="info.firstName" />
    </div>
    <div>
      <label>Last Name</label>
      <input v-model="info.lastName" />
    </div>
    <div>
      <label>District</label>
      <input v-model="info.address.district" />
    </div>
    <div>
      <label>Street</label>
      <input v-model="info.address.street" />
    </div>
    <div>
      <button @click="result.address.street.$test()">Test</button>
    </div>
    <div>{{ result }}</div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import useValidate from 'vue-tiny-validate';
export default {
  name: 'App',
  setup() {
    const info = reactive({
      firstName: 'Duy Anh',
      lastName: 'Le',
      address: {
        district: 'Thanh Xuan',
        street: 'Quan Nhan',
      },
    });

    const rules = reactive({
      firstName: [{ $test: value => value !== '', $message: 'This field is required' }],
      lastName: [{ $test: value => value !== '', $message: 'This field is required' }],
      address: {
        district: [
          {
            $test: value => value.length > 5,
            $message: 'This field must have at least 5 characters',
          },
        ],
        street: [
          {
            $test: value => value.length > 10,
            $message: 'This field must have at least 10 characters',
          },
        ],
      },
    });

    const { result, test, entry } = useValidate(info, rules);

    return { info, result, test };
  },
};
</script>
<style>
label {
  display: block;
}
</style>
