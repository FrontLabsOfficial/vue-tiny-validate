<template>
  <div class="form">
    <div class="form-item">
      <label>First Name</label>
      <input v-model="info.firstName" :class="{ 'input-error': result.firstName.$invalid }" />
      <div v-if="result.firstName.$invalid" class="form-item-message">{{ result.firstName.$messages }}</div>
    </div>
    <div class="form-item">
      <label>Last Name</label>
      <input v-model="info.lastName" :class="{ 'input-error': result.lastName.$invalid }" />
      <div v-if="result.lastName.$invalid" class="form-item-message">{{ result.lastName.$messages }}</div>
    </div>
    <div class="form-item">
      <label>District</label>
      <input v-model="info.address.district" :class="{ 'input-error': result.address.district.$invalid }" />
      <div v-if="result.address.district.$invalid" class="form-item-message">
        {{ result.address.district.$messages }}
      </div>
    </div>
    <div class="form-item">
      <label>Street</label>
      <input v-model="info.address.street" :class="{ 'input-error': result.address.street.$invalid }" />
      <div v-if="result.address.street.$invalid" class="form-item-message">{{ result.address.street.$messages }}</div>
    </div>
    <div class="form-item">
      <label>Number</label>
      <input v-model="info.address.no" :class="{ 'input-error': result.address.no.$invalid }" />
      <div v-if="result.address.no.$invalid" class="form-item-message">{{ result.address.no.$messages }}</div>
    </div>
    <button class="validate-btn" @click="validate">Validate</button>
  </div>
  <div class="tree">
    <JsonTreeView :data="JSON.stringify(result)" />
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from 'vue';
import { JsonTreeView } from 'json-tree-view-vue3';
import useValidate from '../src';
export default defineComponent({
  name: 'App',
  components: {
    JsonTreeView,
  },
  setup() {
    const info = reactive({
      firstName: '',
      lastName: '',
      address: {
        district: '',
        street: '',
        no: '',
      },
    });

    const required = (value: string): boolean => value !== '';

    const atLeastTenChars = (value: string): boolean => String(value).length >= 10;

    const isNumber = (value: string): boolean => value !== '' && !isNaN(Number(value));

    const isNumberMessage = (value: string): string => {
      return `Input ${value} is not allowed. A number is required`;
    };

    const rules = {
      firstName: [{ $test: required, $message: 'Input is required' }],
      lastName: [{ $test: required, $message: 'Input is required' }],
      address: {
        district: [{ $test: required, $message: 'Input is required' }],
        street: [
          { $test: required, $message: 'Input is required' },
          { $test: atLeastTenChars, $message: 'At least 10 chars' },
        ],
        no: [
          { $test: required, $message: 'Input is required' },
          { $test: isNumber, $message: isNumberMessage },
        ],
      },
    };

    const { result } = useValidate(info, rules);

    const validate = () => {
      result.value.$test();
    };

    return { info, result, validate };
  },
});
</script>
<style>
* {
  box-sizing: border-box;
}
body {
  margin: 16px;
}

.form-item {
  margin-bottom: 24px;
  position: relative;
}

.form-item-message {
  position: absolute;
  bottom: -20px;
  color: mediumvioletred;
  font-size: 14px;
}

.root-item {
  font-family: monospace;
  border: 1px solid lightgray;
  border-radius: 4px;
}

.json-view-item:not(.root-item) {
  margin-left: 32px;
}

.validate-btn {
  display: block;
  font-size: 16px;
  background: lightgray;
  border-radius: 4px;
  border: 1px solid grey;
  margin-bottom: 16px;
  padding: 8px;
}

label {
  display: block;
  margin-bottom: 4px;
}

input {
  display: inline-block;
  width: 100%;
  padding: 8px 16px;
  margin: 0;
  border-radius: 4px;
  border: 1px solid lightgray;
}

.input-error {
  border-color: red;
}
</style>
