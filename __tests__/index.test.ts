import { ref, reactive } from 'vue';
import { shallowMount } from '@vue/test-utils';
// @ts-ignore
import useValidate from 'vue-tiny-validate';

// set up Vue component
export const createComponent = (_data: any, _rules: any, _options: any) => ({
  template: `<div></div>`,
  setup() {
    const data = reactive(_data);
    const rules = reactive(_rules);
    const options = reactive(_options);
    const { result } = useValidate(data, rules, options);

    return { result, data };
  },
});

// test stories
describe('data', () => {
  const options = {};

  test('simple data', () => {
    const data = { number: 0 };
    const rules = {
      number: { $key: 'test_01', $test: (value: any) => value > 0 },
    };

    const { vm } = shallowMount(createComponent(data, rules, options));

    expect(vm.result.$invalid).toBe(false);
    expect(vm.result.number.$invalid).toBe(false);

    vm.result.$test();

    expect(vm.result.$invalid).toBe(true);
    expect(vm.result.number.$invalid).toBe(true);
  });

  test('nested data', () => {
    const data = { number: 0, another: { number: 5 } };
    const rules = {
      number: { $key: 'test_01', $test: (value: any) => value > 0 },
      another: {
        number: { $key: 'test_02', $test: (value: any) => value > 0 },
      },
    };

    const { vm } = shallowMount(createComponent(data, rules, options));

    expect(vm.result.$invalid).toBe(false);
    expect(vm.result.number.$invalid).toBe(false);
    expect(vm.result.another.number.$invalid).toBe(false);

    vm.result.$test();

    expect(vm.result.$invalid).toBe(true);
    expect(vm.result.number.$invalid).toBe(true);
    expect(vm.result.another.number.$invalid).toBe(false);
  });
});

describe('rules', () => {
  const options = {};

  test('multiple rules', () => {
    const data = { number: 5 };
    const rules = {
      number: [
        { $key: 'test_01', $test: (value: any) => value !== 5 },
        { $key: 'test_02', $test: (value: any) => value % 2 === 0 },
      ],
    };

    const { vm } = shallowMount(createComponent(data, rules, options));

    expect(vm.result.$errors.length).toBe(0);
    expect(vm.result.number.$errors.length).toBe(0);

    vm.result.$test();

    expect(vm.result.$errors.length).toBe(2);
    expect(vm.result.number.$errors.length).toBe(2);
  });

  test('higher order function test rule', () => {
    const test = (cNumber: any) => (value: any) => cNumber === value;

    const data = { number: 5 };
    const rules = {
      number: { $key: 'test_01', $test: test(20) },
    };

    const { vm } = shallowMount(createComponent(data, rules, options));

    expect(vm.result.$errors.length).toBe(0);
    expect(vm.result.number.$errors.length).toBe(0);

    vm.result.$test();

    expect(vm.result.$errors.length).toBe(1);
    expect(vm.result.number.$errors.length).toBe(1);
  });

  test('rule with message', () => {
    const test = (cNumber: any) => (value: any) => cNumber === value;

    const data = { number: 5 };
    const rules = {
      number: {
        $key: 'test_01',
        $test: (value: any) => value !== 5,
        $message: 'Can not be 5!!!',
      },
    };

    const { vm } = shallowMount(createComponent(data, rules, options));

    expect(vm.result.$messages.length).toBe(0);
    expect(vm.result.number.$messages.length).toBe(0);

    vm.result.$test();

    expect(vm.result.$messages.length).toBe(1);
    expect(vm.result.number.$messages.length).toBe(1);
  });

  test('rule with message function', () => {
    const test = (cNumber: any) => (value: any) => cNumber === value;

    const data = { number: 5 };
    const rules = {
      number: {
        $key: 'test_01',
        $test: (value: any) => value !== 5,
        $message: (value: any) => `Got ${value}. Can not be 5!!!`,
      },
    };

    const { vm } = shallowMount(createComponent(data, rules, options));

    expect(vm.result.$messages.length).toBe(0);
    expect(vm.result.number.$messages.length).toBe(0);

    vm.result.$test();

    expect(vm.result.$messages.length).toBe(1);
    expect(vm.result.number.$messages.length).toBe(1);
  });

  test('async rule', async () => {
    const test = async (value: any) =>
      new Promise(resolve =>
        setTimeout(() => {
          resolve(false);
        }, 2000),
      );

    const data = { number: 5 };
    const rules = {
      number: { $key: 'test_01', $test: test },
    };

    const { vm } = shallowMount(createComponent(data, rules, options));

    expect(vm.result.$pending).toBe(false);
    expect(vm.result.$errors.length).toBe(0);
    expect(vm.result.number.$pending).toBe(false);
    expect(vm.result.number.$errors.length).toBe(0);

    vm.result.$test();

    expect(vm.result.$pending).toBe(true);
    expect(vm.result.number.$pending).toBe(true);

    // workaround to wait 2s
    await new Promise(resolve => setTimeout(resolve, 2100));

    expect(vm.result.$pending).toBe(false);
    expect(vm.result.$errors.length).toBe(1);
    expect(vm.result.number.$pending).toBe(false);
    expect(vm.result.number.$errors.length).toBe(1);
  });
});

describe('option', () => {
  // skip autoTouch / autoTest / lazy because i haven't found good workaround to update field data without touching dom

  test('firstError', () => {
    const data = { number: 5 };
    const rules = {
      number: [
        { $key: 'test_01', $test: (value: any) => value !== 5 },
        { $key: 'test_02', $test: (value: any) => value % 2 === 0 },
      ],
    };

    const { vm } = shallowMount(
      createComponent(data, rules, { firstError: true }),
    );

    expect(vm.result.$errors.length).toBe(0);
    expect(vm.result.number.$errors.length).toBe(0);

    vm.result.$test();

    expect(vm.result.$errors.length).toBe(1);
    expect(vm.result.number.$errors.length).toBe(1);
  });

  test('touch on testing', () => {
    const data = { number: 5 };
    const rules = {
      number: { $key: 'test_01', $test: (value: any) => value !== 5 },
    };

    const { vm } = shallowMount(
      createComponent(data, rules, { touchOnTest: true }),
    );

    expect(vm.result.$dirty).toBe(false);
    expect(vm.result.number.$dirty).toBe(false);

    vm.result.$test();

    expect(vm.result.$dirty).toBe(true);
    expect(vm.result.number.$dirty).toBe(true);
  });
});
