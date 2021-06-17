<template>
  <div>Hello World</div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, computed } from 'vue';
import { JsonTreeView } from 'json-tree-view-vue3';
import useValidate from '../../src/vue-tiny-validate';
export default defineComponent({
  name: 'App',
  components: {
    JsonTreeView,
  },
  setup() {
    const info = ref({
      firstName: '',
      lastName: '',
      address: {
        district: '',
        street: '',
        no: '',
      },
    });

    const required = (value: string): boolean => value !== '';

    const atLeastTenChars = (value: string): boolean =>
      String(value).length >= 10;

    const isNumber = (value: string): boolean =>
      value !== '' && !isNaN(Number(value));

    const isNumberMessage = (value: string): string => {
      return `Input ${value} is not allowed. A number is required`;
    };

    const rules = computed(() => ({
      firstName: [
        { $test: required, $message: 'Input is required', $key: 'required' },
      ],
      lastName: [
        { $test: required, $message: 'Input is required', $key: 'required' },
      ],
      address: {
        district: [
          { $test: required, $message: 'Input is required', $key: 'required' },
        ],
        street: [
          { $test: required, $message: 'Input is required', $key: 'required' },
          {
            $test: atLeastTenChars,
            $message: 'At least 10 chars',
            $key: 'atLeast10Char',
          },
        ],
        no: [
          { $test: required, $message: 'Input is required', $key: 'required' },
          { $test: isNumber, $message: isNumberMessage, $key: 'isNumber' },
        ],
      },
    }));

    const { result } = useValidate(info, rules);

    const validate = () => {
      result.value.$test();
    };

    return { info, result, validate };
  },
});
</script>
