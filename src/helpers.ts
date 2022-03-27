import { Vue2, isRef, isVue2, reactive } from 'vue-demi';
import type { UnknownObject } from './types';

export const setReactiveValue = (obj: any, key: string, value: any) => {
  if (isVue2) {
    Vue2.set(obj, key, value);
  } else {
    obj[key] = value;
  }
};

export const hasOwn = (obj: UnknownObject, key: string): boolean =>
  typeof obj[key] !== 'undefined';

export const isObject = (obj: UnknownObject): boolean =>
  Object.prototype.toString.call(obj) === '[object Object]';

export const unwrap = (obj: UnknownObject): UnknownObject =>
  (isRef(obj) ? obj.value : obj) as UnknownObject;

export const NOOP = () => {};

export const ENTRY_PARAM = {
  $invalid: false,
  $errors: [],
  $messages: [],
  $pending: false,
};

export const OPTION = reactive({
  autoTest: false,
  autoTouch: false,
  lazy: false,
  firstError: false,
  touchOnTest: false,
  transform: (value: any) => value,
});
