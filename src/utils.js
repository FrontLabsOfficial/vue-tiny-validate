export const NOOP = () => false

export const hasOwn = (obj, key) => typeof obj[key] !== 'undefined'

export const DEFAULT_ERROR_MESSAGE = 'Value is incorrect'

export const DEFAULT_OPTION = {
  lazy: false,
}

export const DEFAULT_ITEM_VALUE = {
  invalid: false,
  dirty: false,
  errors: [],
  messages: [],
}
