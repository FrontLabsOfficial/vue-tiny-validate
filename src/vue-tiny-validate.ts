import { computed, reactive, isRef, watch, UnwrapRef, Ref } from 'vue';
import {
  TEST_FUNCTION,
  ERROR_MESSAGE,
  RESULT,
  hasOwn,
  isObject,
} from './helpers';
import {
  Data,
  Rules,
  Rule,
  Dirt,
  Entries,
  UnknownObject,
  Result,
  Args,
  ArgsObject,
  Entry,
  Error,
  UseValidate,
} from './types';

const useValidate = (
  data: UnwrapRef<Data> | Ref<Data>,
  rules: UnwrapRef<Rules> | Ref<Rules>,
): UseValidate => {
  const dirt = reactive<Dirt>({});
  const rawData = reactive<UnknownObject>({});
  const entries = reactive<Entries>({});
  const result = computed<Result>(() => getResult(entries, dirt));

  const getResult = (entries: Entries, dirt: Dirt): Result => {
    const result: Result = { ...RESULT, $dirty: false };
    const keys: Array<string> = Object.keys(entries);

    let testFns: Array<Function> = [];
    let resetFns: Array<Function> = [];

    const setOverallResult = (result: Result, childResult: Result): void => {
      if (!result.$dirty && childResult.$dirty) result.$dirty = true;
      if (!result.$invalid && childResult.$invalid) result.$invalid = true;

      result.$errors = [...result.$errors, ...childResult.$errors];
      result.$messages = [...result.$messages, ...childResult.$messages];

      testFns = [...testFns, childResult.$test];
      resetFns = [...resetFns, childResult.$reset];
    };

    keys.forEach(key => {
      if (isObject(entries[key]) && !hasOwn(entries[key], '$invalid')) {
        const childResult = getResult(
          entries[key] as Entries,
          dirt[key] as Dirt,
        );
        result[key] = { ...childResult };

        setOverallResult(result, childResult);
      } else {
        result[key] = { ...entries[key] };
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

  const setDefaultValue = (
    data: Data,
    rules: Rules,
    dirt: Dirt,
    rawData: UnknownObject,
    entries: Entries,
  ): void => {
    const keys: Array<string> = Object.keys(data);

    keys.forEach(key => {
      if (isObject(data[key])) {
        rawData[key] = {};
        dirt[key] = reactive({});
        entries[key] = reactive({});

        const args: Args = [
          data[key],
          rules[key] as Rules,
          dirt[key] as Dirt,
          rawData[key],
          entries[key] as Entries,
        ];

        return setDefaultValue(...args);
      }

      dirt[key] = false;
      rawData[key] = data[key];

      const entryData: ArgsObject = { data, rules, dirt, rawData, entries };

      entries[key] = {
        ...RESULT,
        $reset: () => reset(entryData, key),
        $test: () => test(entryData, key),
      };
    });
  };

  const test = (entryData: ArgsObject, key: string): void => {
    const { data, rules, dirt, rawData, entries } = entryData;

    dirt[key] = dirt[key] || data[key] !== rawData[key];

    let $errors: Array<Error> = [];
    let $messages: Array<string> = [];

    const ruleItem = rules[key] as Array<Rule>;

    if (!ruleItem) return;

    ruleItem.forEach((rule, index) => {
      const { $test = TEST_FUNCTION, $message = ERROR_MESSAGE, $key } = rule;
      const testValue = $test(data[key]);

      if (!testValue) {
        const testMessage =
          typeof $message === 'function' ? $message(data[key]) : $message;
        $messages = [...$messages, testMessage];
        $errors = [...$errors, { name: $key }];
      }
    });

    entries[key] = {
      ...entries[key],
      $errors,
      $messages,
      $invalid: Boolean($errors.length),
    } as Entry;
  };

  const reset = (entryData: ArgsObject, key: string): void => {
    const { dirt } = entryData;
    dirt[key] = false;
  };

  const initialize = () => {
    setDefaultValue(
      (isRef(data) ? data.value : data) as Data,
      (isRef(rules) ? rules.value : rules) as Rules,
      dirt,
      rawData,
      entries,
    );
  };

  initialize();

  watch(data, initialize);

  watch(rules, initialize);

  return { result, test: result.value.$test, reset: result.value.$reset };
};

export default useValidate;

export * from './types';
