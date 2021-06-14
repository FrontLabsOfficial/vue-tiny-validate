import { computed, reactive, isRef } from 'vue';
import { TEST_FUNCTION, ERROR_MESSAGE, RESULT, hasOwn, isObject } from './helpers'
import { Data, Rules, Rule, Dirt, Entry, UnknownObject, Result, InitializeArgs, EntryData, EntryItem, Error } from './types'

const useValidate = (data: Data, rules: Rules) => {
  const dirt = reactive<Dirt>({});
  const rawData = reactive<UnknownObject>({});
  const entry = reactive<Entry>({});
  const result = computed<Result>(() => getResult(entry, dirt));

  const getResult = (entry: Entry, dirt: Dirt): Result => {
    const result: Result = { ...RESULT, $dirty: false };
    const keys: Array<string> = Object.keys(entry);

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
      if (isObject(entry[key]) && !hasOwn(entry[key], '$invalid')) {
        const childResult = getResult(entry[key] as Entry, dirt[key] as Dirt);
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

  const initialize = (data: Data, rules: Rules, dirt: Dirt, rawData: UnknownObject, entry: Entry): void => {
    const keys: Array<string> = Object.keys(data);

    keys.forEach((key) => {
      if (isObject(data[key])) {
        rawData[key] = {};
        dirt[key] = reactive({});
        entry[key] = reactive({});

        const args :InitializeArgs = [data[key], rules[key] as Rules, dirt[key] as Dirt, rawData[key], entry[key] as Entry];

        return initialize(...args);
      }

      dirt[key] = false;
      rawData[key] = data[key];

      const entryData: EntryData = { data, rules, dirt, rawData, entry };

      entry[key] = {
        ...RESULT,
        $reset: () => reset(entryData, key),
        $test: () => test(entryData, key),
      };
    });
  };

  const test = (entryData: EntryData, key: string): void => {
    const { data, rules, dirt, rawData, entry } = entryData;

    dirt[key] = dirt[key] || data[key] !== rawData[key];

    let $errors: Array<Error> = [];
    let $messages: Array<string> = [];

    const ruleItem = rules[key] as Array<Rule>

    ruleItem.forEach((rule, index) => {
      const { $test = TEST_FUNCTION, $message = ERROR_MESSAGE } = rule;
      const testValue = $test(data[key]);

      if (!testValue) {
        const testMessage = typeof $message === 'function' ? $message(data[key]) : $message;
        $messages = [...$messages, testMessage];
        $errors = [...$errors, { name: $test.name, index }];
      }
    });

    entry[key] = { ...entry[key], $errors, $messages, $invalid: Boolean($errors.length) } as EntryItem;
  };

  const reset = (entryData: EntryData, key: string): void => {
    const { dirt } = entryData;
    dirt[key] = false;
  };

  initialize((isRef(data) ? data.value : data) as Data, rules, dirt, rawData, entry);

  return { result, test: result.value.$test, reset: result.value.$reset };
};

export default useValidate;
