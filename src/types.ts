import { ComputedRef } from 'vue-demi';

export type UnknownObject = { [key: string]: any };

export type Fns = {
  [key: string]: Array<Function>;
};

export type Option = {
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
};

export type Data = UnknownObject;

export type Rule = {
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
};

export type Rules = {
  [key: string]: Array<Rule> | Rule | Rules;
};

export type Dirt = {
  [key: string]: boolean | Dirt;
};

export type FnsMapItem = {
  [key: string]: Array<Function>;
};

export type FnsMap = Array<FnsMapItem>;

export type Error = {
  name: string;
  message?: string | null;
};

export type Entry = {
  $invalid: boolean;
  $errors: Array<Error>;
  $messages: Array<string>;
  $pending: boolean;
  $test: (() => void) | (() => Promise<void>);
  $reset: () => void;
  $touch: () => void;
  $uw?: () => void;
};

export type Entries = {
  [key: string]: Entry | Entries;
};

export type GetDataFn = () => Data;

export type Args = [GetDataFn, Rules, Dirt, UnknownObject, Entries];

export type ArgsObject = {
  data: GetDataFn;
  rules: Rules;
  dirt: Dirt;
  rawData: UnknownObject;
  entries: Entries;
};

export type Result = {
  $invalid: boolean;
  $errors: Array<Error>;
  $messages: Array<string>;
  $test: (() => void) | (() => Promise<void>);
  $reset: () => void;
  $touch: () => void;
  $dirty: boolean;

  // currently there's no good implementation to well support circular reference, so left it any
  [key: string]: any;
};

export type UseValidate = {
  result: ComputedRef<Result | any>;
};
