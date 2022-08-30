import { reactive } from 'vue-demi';
import useValidate from '../src';
import { baseState, valueExpect } from './shared';

describe('rules', () => {
  it.concurrent('should work with multiple value', () => {
    const data = reactive({ year: 2020 });
    const rules = reactive({
      year: [
        {
          name: 'in20th',
          test: (v: any) => v < 2000 && v >= 1900,
        },
        {
          name: 'odd',
          test: (v: any) => v % 2 === 1,
        },
      ],
    });

    const { result } = useValidate(data, rules);

    result.value.$test();

    valueExpect(result.value.year, {
      ...baseState,
      $invalid: true,
      $errors: [
        { name: 'in20th', message: null },
        { name: 'odd', message: null },
      ],
    });
  });

  it.concurrent('should work after mutation', () => {
    const data = reactive({ year: 1970 });
    const rules = reactive({
      year: {
        name: 'in20th',
        test: (v: any) => v < 2000 && v >= 1900,
      },
    });

    const { result } = useValidate(data, rules);

    result.value.$test();

    valueExpect(result.value.year, baseState);
  });

  it.concurrent('should work with resolved async validator', () => {
    const data = reactive({ year: 1970 });
    const rules = reactive({
      year: {
        name: 'in20th',
        test: (): Promise<boolean> => {
          return new Promise(resolve => setTimeout(() => resolve(false), 2000));
        },
      },
    });

    const { result } = useValidate(data, rules);

    result.value.$test().then(() => {
      valueExpect(result.value.year, {
        ...baseState,
        $invalid: true,
        $errors: [{ name: 'in20th', message: null }],
      });
    });

    expect(result.value.year.$pending).toBe(true);
  });

  it.concurrent('should work with rejected async validator', () => {
    const data = reactive({ year: 1970 });
    const rules = reactive({
      year: {
        name: 'in20th',
        test: (): Promise<boolean> => {
          // eslint-disable-next-line promise/param-names
          return new Promise((_, reject) => reject(new Error('Rejected')));
        },
      },
    });

    const { result } = useValidate(data, rules);

    result.value.$test().then(() => {
      valueExpect(result.value.year, {
        ...baseState,
        $invalid: true,
        $errors: [{ name: 'in20th', message: null }],
      });
    });

    expect(result.value.year.$pending).toBe(true);
  });

  it.concurrent('should work with high order validator', () => {
    const data = reactive({ zip: 33 });

    const rgxCheck =
      (rgx: RegExp) =>
      (value: string): boolean =>
        rgx.test(value);

    const rules = reactive({
      zip: {
        test: rgxCheck(/^[0-9]{5}(?:-[0-9]{4})?$/),
        name: 'zip',
      },
    });

    const { result } = useValidate(data, rules);

    result.value.$test();

    valueExpect(result.value.zip, {
      ...baseState,
      $invalid: true,
      $errors: [{ name: 'zip', message: null }],
    });
  });

  it.concurrent('should work with extra param in validator', () => {
    const data = reactive({ password: 'well666', rePassword: '' });
    const rules = reactive({
      rePassword: {
        test: (v: any, d: any) => v === d.password,
        name: 'same',
      },
    });

    const { result } = useValidate(data, rules);

    result.value.$test();

    valueExpect(result.value.rePassword, {
      ...baseState,
      $invalid: true,
      $errors: [{ name: 'same', message: null }],
    });
  });

  it.concurrent('should work with message', () => {
    const data = reactive({ year: 2020 });
    const rules = reactive({
      year: {
        name: 'in20th',
        test: (v: any) => v < 2000 && v >= 1900,
        message: 'Should be in the 20th',
      },
    });

    const { result } = useValidate(data, rules);

    result.value.$test();

    valueExpect(result.value.year, {
      ...baseState,
      $invalid: true,
      $errors: [{ name: 'in20th', message: 'Should be in the 20th' }],
      $messages: ['Should be in the 20th'],
    });
  });

  it.concurrent('should work with data value in message', () => {
    const data = reactive({ year: 2020 });
    const rules = reactive({
      year: {
        name: 'in20th',
        test: (v: any) => v < 2000 && v >= 1900,
        message: (v: any) => `${v} is not in the 20th`,
      },
    });

    const { result } = useValidate(data, rules);

    result.value.$test();

    valueExpect(result.value.year, {
      ...baseState,
      $invalid: true,
      $errors: [{ name: 'in20th', message: '2020 is not in the 20th' }],
      $messages: ['2020 is not in the 20th'],
    });
  });

  it.concurrent('should work with high order message function', () => {
    const messageFn = (endMessage: any) => (v: any) =>
      `${v} is not in the 20th. ${endMessage}`;

    const data = reactive({ year: 2020 });
    const rules = reactive({
      year: {
        name: 'in20th',
        test: (v: any) => v < 2000 && v >= 1900,
        message: messageFn('Try another year.'),
      },
    });

    const { result } = useValidate(data, rules);

    result.value.$test();

    valueExpect(result.value.year, {
      ...baseState,
      $invalid: true,
      $errors: [
        {
          name: 'in20th',
          message: '2020 is not in the 20th. Try another year.',
        },
      ],
      $messages: ['2020 is not in the 20th. Try another year.'],
    });
  });
});
