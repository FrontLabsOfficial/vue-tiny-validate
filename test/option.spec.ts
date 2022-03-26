import { reactive } from 'vue-demi';
import useValidate from '../src';
import { baseState, delay, valueExpect } from './shared';

describe('option', () => {
  it.concurrent('should work with autoTest', async () => {
    const data = reactive({ city: '' });
    const rules = reactive({
      city: {
        name: 'blank',
        test: (v: any) => v === '',
      },
    });

    const option = reactive({ autoTest: true });

    const { result } = useValidate(data, rules, option);

    data.city = 'Hanoi';

    // since $test is async function, delay to wait until it's done
    await delay(100);

    valueExpect(result.value, {
      ...baseState,
      $invalid: true,
      $errors: [{ name: 'blank', message: null }],
      $dirty: true,
    });
  });

  it.concurrent('should work with autoTouch', async () => {
    const data = reactive({ city: '' });
    const rules = reactive({
      city: {
        name: 'blank',
        test: (v: any) => v === '',
      },
    });

    const option = reactive({ autoTouch: true });

    const { result } = useValidate(data, rules, option);

    data.city = 'Hanoi';

    await delay(100);

    valueExpect(result.value, {
      ...baseState,
      $dirty: true,
    });
  });

  it.concurrent('should work with lazy', () => {
    const data = reactive({ city: 'Hanoi' });
    const rules = reactive({
      city: {
        name: 'blank',
        test: (v: any) => v === '',
      },
    });

    const option = reactive({ lazy: true });

    const { result } = useValidate(data, rules, option);

    result.value.$test();

    valueExpect(result.value, baseState);
  });

  it.concurrent('should work with firstError', () => {
    const data = reactive({ city: '' });
    const rules = reactive({
      city: [
        { name: 'notBlank', test: (v: any) => v !== '' },
        { name: 'has5chars', test: (v: any) => v.length === 5 },
      ],
    });

    const option = reactive({ firstError: true });

    const { result } = useValidate(data, rules, option);

    result.value.$test();

    valueExpect(result.value, {
      ...baseState,
      $invalid: true,
      $errors: [{ name: 'notBlank', message: null }],
    });
  });

  it.concurrent('should work with touchOnTest', () => {
    const data = reactive({ city: 'Hanoi' });
    const rules = reactive({
      city: [
        { name: 'notBlank', test: (v: any) => v !== '' },
        { name: 'has5chars', test: (v: any) => v.length === 5 },
      ],
    });

    const option = reactive({ touchOnTest: true });

    const { result } = useValidate(data, rules, option);

    result.value.$test();

    valueExpect(result.value, {
      ...baseState,
      $dirty: true,
    });
  });

  it.concurrent('should work with transform', () => {
    const data = reactive({ city: 'Hanoi' });
    const rules = reactive({
      city: [
        { name: 'notBlank', test: (v: any) => v !== '' },
        { name: 'has5chars', test: (v: any) => v.length === 5 },
      ],
    });

    const option = reactive({
      transform: (r: any) => {
        const { $test, $reset, $touch } = r;
        return { $test, $reset, $touch, custom: 1 };
      },
    });

    const { result } = useValidate(data, rules, option);

    result.value.$test();

    expect(result.value.custom).toBe(1);
  });
});
