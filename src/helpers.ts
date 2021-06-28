export const RESULT = {
  $invalid: false,
  $errors: [],
  $messages: [],
  $pending: false,
};

export const NOOP = () => {};

export const hasOwn = (obj: { [key: string]: any }, key: string): boolean =>
  typeof obj[key] !== 'undefined';

export const isObject = (obj: { [key: string]: any }): boolean =>
  Object.prototype.toString.call(obj) === '[object Object]';
