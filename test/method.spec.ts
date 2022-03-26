import { reactive } from 'vue-demi';
import useValidate from '../src';
import { baseState, valueExpect } from './shared';

describe('method', () => {
  it.concurrent('should work with $test', () => {
    const data = reactive({
      name: '',
      age: 0,
    });

    const rules = reactive({
      name: {
        name: 'nameRequired',
        test: (v: any) => Boolean(v),
        message: 'Name is required',
      },
      age: {
        name: 'ageRequired',
        test: (v: any) => Boolean(v),
        message: 'Age is required',
      },
    });

    const { result } = useValidate(data, rules);

    result.value.age.$test();

    valueExpect(result.value, {
      ...baseState,
      $invalid: true,
      $errors: [{ name: 'ageRequired', message: 'Age is required' }],
      $messages: ['Age is required'],
    });

    result.value.$test();

    valueExpect(result.value, {
      ...baseState,
      $invalid: true,
      $errors: [
        { name: 'nameRequired', message: 'Name is required' },
        { name: 'ageRequired', message: 'Age is required' },
      ],
      $messages: ['Name is required', 'Age is required'],
    });
  });

  it.concurrent('should work with $reset', () => {
    const data = reactive({ age: 0 });
    const rules = reactive({
      age: {
        name: 'ageRequired',
        test: (v: any) => Boolean(v),
      },
    });

    const { result } = useValidate(data, rules);

    result.value.$test();

    result.value.$reset();

    valueExpect(result.value, baseState);
    valueExpect(result.value.age, baseState);
  });

  it.concurrent('should work with $touch', () => {
    const data = reactive({ age: 0 });
    const rules = reactive({
      age: {
        name: 'ageRequired',
        test: (v: any) => Boolean(v),
      },
    });

    const { result } = useValidate(data, rules);

    result.value.$touch();

    valueExpect(result.value, {
      ...baseState,
      $dirty: true,
    });

    valueExpect(result.value.age, {
      ...baseState,
      $dirty: true,
    });
  });
});
