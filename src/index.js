import { ref, computed, reactive, watch, isRef } from 'vue';

const TEST_FUNCTION = () => true;

const ERROR_MESSAGE = '';

const RESULT = { $invalid: false, $errors: [], $messages: [] };

const hasOwn = (obj, key) => typeof obj[key] !== 'undefined';

const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';

const useValidate = (data, rules) => {
  const dirt = reactive({});

  const rawData = reactive({});

  const entry = reactive({});

  const result = computed(() => getResult(entry, dirt));

  const getResult = (entry, dirt) => {
    const result = {
      ...RESULT,
      $dirty: false,
    };

    const keys = Object.keys(entry);

    let testFns = [];
    let resetFns = [];

    const setOverallResult = (result, childResult) => {
      if (!result.$dirty && childResult.$dirty) result.$dirty = true;
      if (!result.$invalid && childResult.$invalid) result.$invalid = true;

      result.$errors = [...result.$errors, ...childResult.$errors];
      result.$messages = [...result.$messages, ...childResult.$messages];

      testFns = [...testFns, childResult.$test];
      resetFns = [...resetFns, childResult.$reset];
    };

    keys.forEach(key => {
      if (isObject(entry[key]) && !hasOwn(entry[key], '$invalid')) {
        const childResult = getResult(entry[key], dirt[key]);
        result[key] = { ...childResult };

        setOverallResult(result, childResult);
      } else {
        result[key] = { ...entry[key] };
        result[key].$dirty = dirt[key];

        setOverallResult(result, result[key]);
      }
    });

    result.$test = () => {
      testFns.forEach(fns => fns());
    };

    result.$reset = () => {
      resetFns.forEach(fns => fns());
    };

    return result;
  };

  const initialize = (data, rules, dirt, rawData, entry) => {
    const keys = Object.keys(data);

    keys.forEach(key => {
      if (isObject(data[key])) {
        rawData[key] = {};
        dirt[key] = reactive({});
        entry[key] = reactive({});

        const args = [data[key], rules[key], dirt[key], rawData[key], entry[key]];

        return initialize(...args);
      }

      dirt[key] = false;
      rawData[key] = data[key];

      const entryData = { data, rules, dirt, rawData, entry };

      entry[key] = {
        ...RESULT,
        $reset: () => reset(entryData, key),
        $test: () => test(entryData, key),
      };
    });
  };

  const test = (entryData, key) => {
    const { data, rules, dirt, rawData, entry } = entryData;

    dirt[key] = dirt[key] || data[key] !== rawData[key];

    let $errors = [];
    let $messages = [];

    rules[key].forEach((rule, index) => {
      const { $test = DEFAULT_TEST_FUNCTION, $message = DEFAULT_ERROR_MESSAGE } = rule;
      const testValue = $test(data[key]);

      if (!testValue) {
        const testMessage = typeof $message === 'function' ? $message(data) : $message;
        $messages = [...$messages, testMessage];
        $errors = [...$errors, { name: $test.name, index }];
      }
    });

    entry[key] = { ...entry[key], $errors, $messages, $invalid: Boolean($errors.length) };
  };

  const reset = (entryData, key) => {
    const { dirt } = entryData;
    dirt[key] = false;
  };

  initialize(isRef(data) ? data.value : data, rules, dirt, rawData, entry);

  return { result, test: result.value.$test, reset: result.value.$reset };
};

export default useValidate;
