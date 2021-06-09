import { DEFAULT_TEST_FUNCTION, DEFAULT_ERROR_MESSAGE, DEFAULT_ITEM_VALUE, hasOwn } from './utils'

let _dirt = {}

let _data = {}

const staticValue = { data: _data, dirt: _dirt }

const setObjectValue = (root, key, value) => {
  if (!hasOwn(root, key)) root[key] = value
}

export const validateItem = (value, rules, staticValues, key) => {
  const { data, dirt } = staticValues
  if (!Array.isArray(rules)) {
    setObjectValue(dirt, key, {})
    setObjectValue(data, key, {})

    const newStaticValue = { dirt: dirt[key], data: data[key] }
    return validate(value, rules, newStaticValue)
  }

  setObjectValue(dirt, key, false)
  setObjectValue(data, key, value)

  const isDirty = dirt[key] || data[key] !== value || false
  dirt[key] = isDirty && !dirt[key] ? true : dirt[key]

  let result = { ...DEFAULT_ITEM_VALUE, dirty: isDirty }

  rules.forEach((rule, index) => {
    const { $test = DEFAULT_TEST_FUNCTION, $message = DEFAULT_ERROR_MESSAGE } = rule
    let { errors, messages } = result

    const testValue = $test(value)

    if (!testValue) {
      const testMessage = typeof $message === 'function' ? $message(value) : $message
      messages = [...messages, testMessage]
      errors = [...errors, { name: $test.name, index }]
    }

    result = { ...result, errors, messages, invalid: Boolean(errors.length) }
  })

  return result
}

const resetItem = () => {}

export const validate = (value, rules, staticValues = staticValue) => {
  const keys = Object.keys(value)
  const validations = {}

  keys.forEach(key => {
    validations[key] = validateItem(value[key], rules[key], staticValues, key)
  })

  return validations
}
