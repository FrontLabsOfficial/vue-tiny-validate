import { UnwrapRef } from 'vue'

export type UnknownObject = { [key: string]: any }

export type Data = UnwrapRef<UnknownObject>

export type Rule = {
  $test: (value: any) => boolean
  $message: string | ((value: any) => string)
}

export type Rules = {
  [key: string]: Array<Rule> | Rules
}

export type Dirt = {
  [key: string]: boolean | Dirt
}

export type Error = {
  name: string
  index: number
}

export type EntryItem = {
  $invalid: boolean
  $errors: Array<Error>
  $messages: Array<string>
  $test: () => void
  $reset: () => void
}

export type Entry = {
  [key: string]: EntryItem | Entry
}

export type InitializeArgs = [Data, Rules, Dirt, UnknownObject, Entry]

export type EntryData = {
  data: Data
  rules: Rules
  dirt: Dirt
  rawData: UnknownObject
  entry: Entry
}

export type Result = {
  $invalid: boolean
  $errors: Array<Error>
  $messages: Array<string>
  $test: () => void
  $reset: () => void
  $dirty: boolean

  [key: string]: any
}