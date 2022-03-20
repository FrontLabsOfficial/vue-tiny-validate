import type { ComputedRef } from 'vue-demi';

export type UnknownObject = Record<string, any>;

export type Fns = Record<string, Array<Function>>;

export interface Option {
  autoTouch?: boolean;
  autoTest?: boolean;
  lazy?: boolean;
  firstError?: boolean;
  touchOnTest?: boolean;
  transform?:
    | ((
        value: any,
        data?: Data,
        rules?: Rules,
        option?: Option,
      ) => Result | any)
    | ((
        value: any,
        data?: Data,
        rules?: Rules,
        option?: Option,
      ) => Promise<Result | any>);
}

export type Data = UnknownObject;

export interface Rule {
  test:
    | ((value: any, data?: Data, rules?: Rules, option?: Option) => boolean)
    | ((
        value: any,
        data?: Data,
        rules?: Rules,
        option?: Option,
      ) => Promise<boolean>);
  message?: string | ((value: any) => string);
  name: string;
}

export interface Rules {
  [key: string]: Array<Rule> | Rule | Rules;
}

export interface Dirt {
  [key: string]: boolean | Dirt;
}

export type FnsMapItem = Record<string, Array<Function>>;

export type FnsMap = Array<FnsMapItem>;

export interface Error {
  name: string;
  message?: string | null;
}

export interface Entry {
  $invalid: boolean;
  $errors: Array<Error>;
  $messages: Array<string>;
  $pending: boolean;
  $test: (() => void) | (() => Promise<void>);
  $reset: () => void;
  $touch: () => void;
  $uw?: () => void;
}

export interface Entries {
  [key: string]: Entry | Entries;
}

export type GetDataFn = () => Data;

export type Args = [GetDataFn, Rules, Dirt, UnknownObject, Entries];

export interface ArgsObject {
  data: GetDataFn;
  rules: Rules;
  dirt: Dirt;
  rawData: UnknownObject;
  entries: Entries;
}

export interface Result {
  $invalid: boolean;
  $errors: Array<Error>;
  $messages: Array<string>;
  $test: (() => void) | (() => Promise<void>);
  $reset: () => void;
  $touch: () => void;
  $dirty: boolean;

  // currently there's no good implementation to well support circular reference, so left it any
  [key: string]: any;
}

export interface UseValidate {
  result: ComputedRef<Result | any>;
}
