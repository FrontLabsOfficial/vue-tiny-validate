import { computed, reactive, watch, UnwrapRef, Ref, ComputedRef } from 'vue';
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
  _data: UnwrapRef<Data> | Ref<Data> | ComputedRef<Data>,
  _rules: UnwrapRef<Rules> | Ref<Rules> | ComputedRef<Rules>,
  _option: UnwrapRef<Option> | Ref<Option> | ComputedRef<Option> = OPTION,
): UseValidate => {
  const dirt = reactive<Dirt>({});
  const rawData = reactive<UnknownObject>({});
  const entries = reactive<Entries>({});

  const result = computed<Result>(() => getResult(entries, dirt));
  const option = computed<Option>(() => ({ ...OPTION, ...unwrap(_option) }));

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
    const fnsKeys: Array<string> = Object.keys(fns);

    const setOverallResult = (result: Result, childResult: Result): void => {
      const fields: Array<string> = [...Object.keys(ENTRY_PARAM), '$dirty'];

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
        if (key === '$test')
          return Promise.all(fns[key].map((fn: Function) => fn()));

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
    const keys: Array<string> = Object.keys(rules);

    for (const key of keys) {
      if (isObject(rules[key]) && !hasOwn(rules[key], 'test')) {
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

        setDefaultValue(...args);
      } else {
        dirt[key] = false;
        rawData[key] = data[key];

        const entryData: ArgsObject = { data, rules, dirt, rawData, entries };

        entries[key] = {
          ...ENTRY_PARAM,
          $reset: () => reset(entryData, key),
          $test: async () => await test(entryData, key),
          $touch: () => touch(entryData, key),
        };

        Object.setPrototypeOf(entries[key], {
          $uw: watch(
            () => data[key],
            () => {
              if (option.value.autoTest) (entries[key] as Entry).$test();
              if (option.value.autoTouch) (entries[key] as Entry).$touch();
            },
          ),
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

    let ruleItem = rules[key] as Rule | Array<Rule>;

    if (!ruleItem) return;

    if (!Array.isArray(ruleItem)) ruleItem = [ruleItem];

    for (const rule of ruleItem) {
      const { test, message = null, name } = rule;
      let testValue: boolean | Promise<boolean> = test(
        data[key],
        unwrap(_data),
      );

      if (testValue instanceof Promise) {
        entries[key].$pending = true;
        try {
          testValue = await testValue;
        } catch (e) {
          testValue = false;
        }
        entries[key].$pending = false;
      }

      if (!testValue) {
        const testMessage =
          typeof message === 'function'
            ? message(data[key])
            : (message as string);
        $errors = [...$errors, { name, message: testMessage }];

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
    entryData.dirt[key] = false;
    entryData.entries[key] = {
      ...entryData.entries[key],
      ...ENTRY_PARAM,
    } as Entry;
  };

  const touch = (entryData: ArgsObject, key: string): void => {
    entryData.dirt[key] = true;
  };

  const initialize = (): void => {
    setDefaultValue(
      unwrap(_data) as Data,
      unwrap(_rules) as Rules,
      dirt,
      rawData,
      entries,
    );
  };

  initialize();

  watch(_rules, initialize);

  watch(_option, initialize);

  return { result };
};

export default useValidate;

export * from './types';
