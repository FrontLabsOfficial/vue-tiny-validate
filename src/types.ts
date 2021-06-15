import { ComputedRef } from 'vue';

export type UnknownObject = { [key: string]: any };

export type Data = UnknownObject;
export type Rule = {
  $test: (value: any) => boolean;
  $message: string | ((value: any) => string);
};

export type Rules = {
  [key: string]: Array<Rule> | Rules;
};

export type Dirt = {
  [key: string]: boolean | Dirt;
};

export type Error = {
  name: string;
  index: number;
};

export type Entry = {
  $invalid: boolean;
  $errors: Array<Error>;
  $messages: Array<string>;
  $test: () => void;
  $reset: () => void;
};

export type Entries = {
  [key: string]: Entry | Entries;
};

export type Args = [Data, Rules, Dirt, UnknownObject, Entries];

export type EntryData = {
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
  $dirty: boolean;

  [key: string]: any;
};

export type UseValidate = {
  result: ComputedRef<Result>;
  test: () => void;
  reset: () => void;
};
