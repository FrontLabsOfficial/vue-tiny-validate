import { computed, reactive, ref } from 'vue-demi';
import useValidate from '../src';
import { baseState, initialExpect, valueExpect } from './shared';

describe('data and rules', () => {
  it.concurrent('should together work with ref and reactive', () => {
    const data = ref({ country: '' });
    const rules = reactive({
      country: { name: 'required', test: (v: any) => Boolean(v) },
    });

    const { result } = useValidate(data, rules);

    initialExpect(result.value.country);

    result.value.$test();

    valueExpect(result.value.country, {
      ...baseState,
      $invalid: true,
      $errors: [{ name: 'required', message: null }],
    });

    data.value.country = 'Vietnam';
    result.value.$test();

    valueExpect(result.value.country, {
      ...baseState,
      $dirty: true,
    });
  });

  it.concurrent('should together work with reactive and computed', () => {
    const data = reactive({ country: '' });
    const rules = computed(() => ({
      country: { name: 'required', test: (v: any) => Boolean(v) },
    }));

    const { result } = useValidate(data, rules);

    initialExpect(result.value.country);

    result.value.$test();

    valueExpect(result.value.country, {
      ...baseState,
      $invalid: true,
      $errors: [{ name: 'required', message: null }],
    });

    data.country = 'Vietnam';
    result.value.$test();

    valueExpect(result.value.country, {
      ...baseState,
      $dirty: true,
    });
  });

  it.concurrent('should together work with and computed and ref', () => {
    const origin = ref('');

    const data = computed(() => ({ country: origin.value }));
    const rules = ref({
      country: { name: 'required', test: (v: any) => Boolean(v) },
    });

    const { result } = useValidate(data, rules);

    initialExpect(result.value.country);

    result.value.$test();

    valueExpect(result.value.country, {
      ...baseState,
      $invalid: true,
      $errors: [{ name: 'required', message: null }],
    });

    origin.value = 'Vietnam';
    result.value.$test();

    valueExpect(result.value.country, {
      ...baseState,
      $dirty: true,
    });
  });
});
