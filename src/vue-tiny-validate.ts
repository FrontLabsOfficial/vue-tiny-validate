import { computed, reactive, watch, UnwrapRef, Ref } from 'vue';
import { OPTION, ENTRY_PARAM, NOOP, hasOwn, isObject, unwrap } from './helpers';
import {
  Fns,
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
  Option,
  UseValidate,
} from './types';

const useValidate = (
  _data: UnwrapRef<Data> | Ref<Data>,
  _rules: UnwrapRef<Rules> | Ref<Rules>,
  _option: UnwrapRef<Option> | Ref<Option> = OPTION,
): UseValidate => {
  const dirt = reactive<Dirt>({});
  const rawData = reactive<UnknownObject>({});
  const entries = reactive<Entries>({});

  const result = computed<Result>(() => getResult(entries, dirt));
  const option = computed(() => ({ ...OPTION, ...unwrap(_option) }));

  const getResult = (entries: Entries, dirt: Dirt): Result => {
    const result: Result = {
      ...ENTRY_PARAM,
      $dirty: false,
      $test: NOOP,
      $reset: NOOP,
      $touch: NOOP,
    };
    const keys: Array<string> = Object.keys(entries);

    const fns: Fns = { $test: [], $reset: [], $touch: [] };
    const fnsKeys = Object.keys(fns);

    const setOverallResult = (result: Result, childResult: Result): void => {
      const fields = [...Object.keys(ENTRY_PARAM), '$dirty'];

      for (const field of fields) {
        if (Array.isArray(result[field])) {
          result[field] = [...result[field], ...childResult[field]];
        } else {
          if (!result[field] && childResult[field]) result[field] = true;
        }
      }

      for (const key of fnsKeys) {
        fns[key].push(childResult[key]);
      }
    };

    for (const key of keys) {
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
    }

    for (const key of fnsKeys) {
      result[key] = () => {
        fns[key].forEach((fn: Function) => fn());
      };
    }

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

    for (const key of keys) {
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
        ...ENTRY_PARAM,
        $reset: () => reset(entryData, key),
        $test: () => test(entryData, key),
        $touch: () => touch(entryData, key),
      };

      if (entries[key].$unwatch) {
        (entries[key] as Entry).$unwatch!();
      }

      if (option.value.auto) {
        Object.setPrototypeOf(entries[key], {
          $unwatch: watch(() => data[key], (entries[key] as Entry).$test),
        });
      }
    }
  };

  const test = async (entryData: ArgsObject, key: string): Promise<void> => {
    const { data, rules, dirt, rawData, entries } = entryData;
    const { lazy, firstError, touchOnTest } = option.value;

    dirt[key] = touchOnTest || dirt[key] || data[key] !== rawData[key];

    if (lazy && !dirt[key]) return;

    let $errors: Array<Error> = [];
    let $messages: Array<string> = [];

    const ruleItem = rules[key] as Array<Rule>;

    if (!ruleItem) return;

    for (const rule of ruleItem) {
      const { $test, $message = null, $key } = rule;
      let testValue = $test(data[key]);

      if (testValue instanceof Promise) {
        entries[key].$pending = true;
        testValue = await testValue;
        entries[key].$pending = false;
      }

      if (!testValue) {
        const testMessage =
          typeof $message === 'function' ? $message(data[key]) : $message;
        $errors = [...$errors, { name: $key, message: testMessage }];

        if (testMessage) $messages.push(testMessage);

        if (firstError) break;
      }
    }

    entries[key] = {
      ...entries[key],
      $errors,
      $messages,
      $invalid: Boolean($errors.length),
    } as Entry;
  };

  const reset = (entryData: ArgsObject, key: string): void => {
    const { dirt, entries } = entryData;
    dirt[key] = false;
    entries[key] = { ...entries[key], ...ENTRY_PARAM } as Entry;
  };

  const touch = (entryData: ArgsObject, key: string): void => {
    const { dirt } = entryData;
    dirt[key] = true;
  };

  const initialize = () => {
    setDefaultValue(
      unwrap(_data) as Data,
      unwrap(_rules) as Rules,
      dirt,
      rawData,
      entries,
    );
  };

  initialize();

  watch(_data, initialize);

  watch(_rules, initialize);

  watch(_option, initialize);

  return { result, test: result.value.$test, reset: result.value.$reset };
};

export default useValidate;

export * from './types';
