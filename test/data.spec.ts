import { computed, reactive, ref } from 'vue-demi';
import useValidate from '../src';
import { baseState, initialExpect, valueExpect } from './shared';

describe('data', () => {
  it.concurrent('should work with ref', () => {
    const data = ref({ name: '' });
    const rules = ref({
      name: { name: 'required', test: (value: any) => Boolean(value) },
    });

    const { result } = useValidate(data, rules);

    initialExpect(result.value.name);

    result.value.$test();

    valueExpect(result.value.name, {
      ...baseState,
      $invalid: true,
      $errors: [{ name: 'required', message: null }],
    });

    data.value = { name: 'Anh Le' };
    result.value.$test();

    valueExpect(result.value.name, {
      ...baseState,
      $dirty: true,
    });
  });

  it.concurrent('should work with reactive', () => {
    const data = reactive({ age: 0 });
    const rules = reactive({
      age: { name: 'positive', test: (value: any) => value > 0 },
    });

    const { result } = useValidate(data, rules);

    initialExpect(result.value.age);

    result.value.$test();

    valueExpect(result.value.age, {
      ...baseState,
      $invalid: true,
      $errors: [{ name: 'positive', message: null }],
    });

    data.age = 25;
    result.value.$test();

    valueExpect(result.value.age, {
      ...baseState,
      $dirty: true,
    });
  });

  it.concurrent('should work with computed', () => {
    const origin = ref(false);

    const data = computed(() => ({ agree: origin.value }));
    const rules = computed(() => ({
      agree: { name: 'isNotFalse', test: (value: any) => Boolean(value) },
    }));

    const { result } = useValidate(data, rules);

    initialExpect(result.value.agree);

    result.value.$test();

    valueExpect(result.value.agree, {
      ...baseState,
      $invalid: true,
      $errors: [{ name: 'isNotFalse', message: null }],
    });

    origin.value = true;
    result.value.$test();

    valueExpect(result.value.agree, {
      ...baseState,
      $dirty: true,
    });
  });

  it.concurrent('should work with multiple value', () => {
    const data = reactive({ name: '', age: 0 });
    const rules = reactive({
      name: { name: 'required', test: (value: any) => Boolean(value) },
      age: { name: 'positive', test: (value: any) => value > 0 },
    });

    const { result } = useValidate(data, rules);

    initialExpect(result.value);
    initialExpect(result.value.name);
    initialExpect(result.value.age);

    result.value.$test();

    valueExpect(result.value, {
      ...baseState,
      $invalid: true,
      $errors: [
        { name: 'required', message: null },
        { name: 'positive', message: null },
      ],
    });

    valueExpect(result.value.name, {
      ...baseState,
      $invalid: true,
      $errors: [{ name: 'required', message: null }],
    });

    valueExpect(result.value.age, {
      ...baseState,
      $invalid: true,
      $errors: [{ name: 'positive', message: null }],
    });

    data.name = 'Anh Le';
    data.age = 25;
    result.value.$test();

    valueExpect(result.value, {
      ...baseState,
      $dirty: true,
    });

    valueExpect(result.value.name, {
      ...baseState,
      $dirty: true,
    });

    valueExpect(result.value.age, {
      ...baseState,
      $dirty: true,
    });
  });

  it.concurrent('should work with nested value', () => {
    const data = reactive({ info: { age: 0 } });
    const rules = reactive({
      info: {
        age: { name: 'positive', test: (value: any) => value > 0 },
      },
    });

    const { result } = useValidate(data, rules);

    initialExpect(result.value.info.age);

    result.value.$test();

    valueExpect(result.value.info.age, {
      ...baseState,
      $invalid: true,
      $errors: [{ name: 'positive', message: null }],
    });

    data.info.age = 25;
    result.value.$test();

    valueExpect(result.value.info.age, {
      ...baseState,
      $dirty: true,
    });
  });
});
