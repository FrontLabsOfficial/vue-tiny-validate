export const DEFAULT_TEST_FUNCTION = () => true

export const DEFAULT_ERROR_MESSAGE = ''

export const DEFAULT_ITEM_VALUE = {
  invalid: false,
  dirty: false,
  errors: [],
  messages: [],
}

export const hasOwn = (obj, key) => typeof obj[key] !== 'undefined'
