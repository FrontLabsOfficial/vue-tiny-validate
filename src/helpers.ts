export const TEST_FUNCTION = (): boolean => true;

export const ERROR_MESSAGE: string = '';

export const RESULT = {
  $invalid: false,
  $errors: [],
  $messages: [],
  $test: () => {},
  $reset: () => {},
};

export const hasOwn = (obj: { [key: string]: any }, key: string): boolean =>
  typeof obj[key] !== 'undefined';

export const isObject = (obj: { [key: string]: any }): boolean =>
  Object.prototype.toString.call(obj) === '[object Object]';
