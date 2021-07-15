import { ComputedRef } from 'vue';

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
};

export type Data = UnknownObject;

export type Rule = {
  $test:
    | ((value: any, data: Data) => boolean)
    | ((value: any, data: Data) => Promise<boolean>);
  $message?: string | ((value: any) => string);
  $key: string;
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
  $test: () => void;
  $reset: () => void;
  $touch: () => void;
  $uw?: () => void;
};

export type Entries = {
  [key: string]: Entry | Entries;
};

export type Args = [Data, Rules, Dirt, UnknownObject, Entries];

export type ArgsObject = {
  data: Data;
  rules: Rules;
  dirt: Dirt;
  rawData: UnknownObject;
  entries: Entries;
};

export type Result = {
  $invalid: boolean;
  $errors: Array<Error>;
  $messages: Array<string>;
  $test: () => void;
  $reset: () => void;
  $touch: () => void;
  $dirty: boolean;

  // currently there's no good implementation to well support circular reference, so left it any
  [key: string]: any;
};

export type UseValidate = {
  result: ComputedRef<Result>;
};
