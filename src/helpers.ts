import { reactive, isRef } from 'vue-demi';
import { UnknownObject } from './types';

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
});
