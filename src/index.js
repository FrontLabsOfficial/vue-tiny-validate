import { ref, computed, onBeforeMount } from 'vue'
import { hasOwn } from './utils'
import { validate } from './validate'

const useValidate = (data, rules) => {
  const itemResults = ref({})

  const result = computed(() => {
    let rootInvalid = false
    let rootDirty = false

    const loopOverResult = result => {
      Object.keys(result).forEach(key => {
        const { invalid, dirty } = result[key]

        if (!hasOwn(result[key], 'invalid')) return loopOverResult(result[key])
        if (invalid) rootInvalid = true
        if (dirty) rootDirty = true
      })
    }

    loopOverResult(itemResults.value)

    return {
      invalid: rootInvalid,
      dirty: rootDirty,
      ...itemResults.value,
    }
  })

  const test = () => {
    itemResults.value = validate(data, rules)
  }

  onBeforeMount(test)

  return { result, test }
}

export default useValidate
