<template>
  <div class="p-4 space-y-4 md:px-5 md:py-10 md:container md:mx-auto">
    <div class="shadow overflow-hidden rounded">
      <div class="px-4 py-5 bg-white sm:p-6">
        <div class="grid grid-cols-6 gap-6">
          <div class="col-span-6 sm:col-span-3 form-item">
            <label
              for="first_name"
              class="block text-sm font-medium text-gray-700"
            >
              First name
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              autocomplete="given-name"
              v-model="info.firstName"
              :class="{
                'form-input__error': result.firstName.$invalid,
                'form-input__success':
                  !result.firstName.$invalid && result.firstName.$dirty,
              }"
            />
            <span v-if="result.firstName.$invalid" class="form-item--message">
              {{ result.firstName.$messages.join(' | ') }}
            </span>
          </div>

          <div class="col-span-6 sm:col-span-3 form-item">
            <label
              for="last_name"
              class="block text-sm font-medium text-gray-700"
            >
              Last name
            </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              autocomplete="family-name"
              v-model="info.lastName"
              :class="{
                'form-input__error': result.lastName.$invalid,
                'form-input__success':
                  !result.lastName.$invalid && result.lastName.$dirty,
              }"
            />
            <span v-if="result.lastName.$invalid" class="form-item--message">
              {{ result.lastName.$messages.join(' | ') }}
            </span>
          </div>

          <div class="col-span-6 sm:col-span-4 form-item">
            <label
              for="email_address"
              class="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="text"
              name="email_address"
              id="email_address"
              autocomplete="email"
              v-model="info.email"
              :class="{
                'form-input__error': result.email.$invalid,
                'form-input__success':
                  !result.email.$invalid && result.email.$dirty,
              }"
            />
            <span v-if="result.email.$invalid" class="form-item--message">
              {{ result.email.$messages.join(' | ') }}
            </span>
          </div>

          <div class="col-span-6 sm:col-span-3 form-item">
            <label
              for="country"
              class="block text-sm font-medium text-gray-700"
            >
              Country / Region
            </label>
            <select
              id="country"
              name="country"
              autocomplete="country"
              v-model="info.address.country"
              :class="{
                'form-input__error': result.address.country.$invalid,
                'form-input__success':
                  !result.address.country.$invalid &&
                  result.address.country.$dirty,
              }"
            >
              <option disabled value="">Please select one</option>
              <option value="usa">United States</option>
              <option value="cnd">Canada</option>
              <option value="mex">Mexico</option>
            </select>
            <span
              v-if="result.address.country.$invalid"
              class="form-item--message"
            >
              {{ result.address.country.$messages.join(' | ') }}
            </span>
          </div>

          <div class="col-span-6 form-item">
            <label
              for="street_address"
              class="block text-sm font-medium text-gray-700"
            >
              Street address
            </label>
            <input
              type="text"
              name="street_address"
              id="street_address"
              autocomplete="street-address"
              v-model="info.address.street"
              :class="{
                'form-input__error': result.address.street.$invalid,
                'form-input__success':
                  !result.address.street.$invalid &&
                  result.address.street.$dirty,
              }"
            />
            <span
              v-if="result.address.street.$invalid"
              class="form-item--message"
            >
              {{ result.address.street.$messages.join(' | ') }}
            </span>
          </div>

          <div class="col-span-6 sm:col-span-6 lg:col-span-2 form-item">
            <label for="city" class="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              v-model="info.address.city"
              :class="{
                'form-input__error': result.address.city.$invalid,
                'form-input__success':
                  !result.address.city.$invalid && result.address.city.$dirty,
              }"
            />
            <span
              v-if="result.address.city.$invalid"
              class="form-item--message"
            >
              {{ result.address.city.$messages.join(' | ') }}
            </span>
          </div>

          <div class="col-span-6 sm:col-span-3 lg:col-span-2 form-item">
            <label for="state" class="block text-sm font-medium text-gray-700">
              State / Province
            </label>
            <input
              type="text"
              name="state"
              id="state"
              v-model="info.address.state"
              :class="{
                'form-input__error': result.address.state.$invalid,
                'form-input__success':
                  !result.address.state.$invalid && result.address.state.$dirty,
              }"
            />
            <span
              v-if="result.address.state.$invalid"
              class="form-item--message"
            >
              {{ result.address.state.$messages.join(' | ') }}
            </span>
          </div>

          <div class="col-span-6 sm:col-span-3 lg:col-span-2 form-item">
            <label
              for="postal_code"
              class="block text-sm font-medium text-gray-700"
            >
              ZIP / Postal
            </label>
            <input
              type="text"
              name="postal_code"
              id="postal_code"
              autocomplete="postal-code"
              v-model="info.address.zip"
              :class="{
                'form-input__error': result.address.zip.$invalid,
                'form-input__success':
                  !result.address.zip.$invalid && result.address.zip.$dirty,
              }"
            />
            <span v-if="result.address.zip.$invalid" class="form-item--message">
              {{ result.address.zip.$messages.join(' | ') }}
            </span>
          </div>

          <div class="col-span-6 sm:col-span-3 form-item">
            <label
              for="password01"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="text"
              name="password01"
              id="password01"
              autocomplete="given-name"
              v-model="info.password.p1"
              :class="{
                'form-input__error': result.password.p1.$invalid,
                'form-input__success':
                  !result.password.p1.$invalid && result.password.p1.$dirty,
              }"
            />
            <span v-if="result.password.p1.$invalid" class="form-item--message">
              {{ result.password.p1.$messages.join(' | ') }}
            </span>
          </div>

          <div class="col-span-6 sm:col-span-3 form-item">
            <label
              for="password02"
              class="block text-sm font-medium text-gray-700"
            >
              Re-type your password
            </label>
            <input
              type="text"
              name="password02"
              id="password02"
              autocomplete="family-name"
              v-model="info.password.p2"
              :class="{
                'form-input__error': result.password.p2.$invalid,
                'form-input__success':
                  !result.password.p2.$invalid && result.password.p2.$dirty,
              }"
            />
            <span v-if="result.password.p2.$invalid" class="form-item--message">
              {{ result.password.p2.$messages.join(' | ') }}
            </span>
          </div>
        </div>
      </div>
      <div
        class="
          px-4
          py-3
          bg-gray-100
          form-item
          gap-4
          flex flex-col
          sm:px-6
          md:flex-row
          md:justify-between
          md:items-center
        "
      >
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="autoTest"
              class="mr-1"
              v-model="options.autoTest"
            />
            <label
              for="autoTest"
              class="block text-sm font-medium text-gray-700"
            >
              Auto test
            </label>
          </div>
          <div class="flex items-center">
            <input
              type="checkbox"
              id="autoTouch"
              class="mr-1"
              v-model="options.autoTouch"
            />
            <label
              for="autoTouch"
              class="block text-sm font-medium text-gray-700"
            >
              Auto touch
            </label>
          </div>
          <div class="flex items-center">
            <input
              type="checkbox"
              id="lazy"
              class="mr-1"
              v-model="options.lazy"
            />
            <label for="lazy" class="block text-sm font-medium text-gray-700">
              Lazy
            </label>
          </div>
          <div class="flex items-center">
            <input
              type="checkbox"
              id="firstError"
              class="mr-1"
              v-model="options.firstError"
            />
            <label
              for="firstError"
              class="block text-sm font-medium text-gray-700"
            >
              First error
            </label>
          </div>
          <div class="flex items-center">
            <input
              type="checkbox"
              id="touchOnTest"
              class="mr-1"
              v-model="options.touchOnTest"
            />
            <label
              for="touchOnTest"
              class="block text-sm font-medium text-gray-700"
            >
              Touch on test
            </label>
          </div>
        </div>
        <div class="text-right">
          <button class="base-button text-blue-600 !shadow-none" @click="reset">
            Reset
          </button>
          <button
            @click="validate"
            class="
              base-button
              text-white
              bg-blue-600
              hover:bg-blue-700
              focus:ring-blue-500
            "
          >
            Validate
          </button>
        </div>
      </div>
    </div>
    <div class="shadow bg-white rounded px-4 py-5">
      <JsonTreeView :data="JSON.stringify(result)" :maxDepth="0" class="tree" />
    </div>
    <div class="text-center text-light-500 md:mt-5">
      made with
      <span class="text-yellow-300">♥</span>
      using
      <a
        href="https://github.com/FrontLabsOfficial/vue-tiny-validate"
        target="_blank"
        class="text-yellow-300 font-semibold"
      >
        vue-tiny-validate
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, computed, watch } from 'vue';
import { JsonTreeView } from 'json-tree-view-vue3';
import useValidate from 'vue-tiny-validate';
import cloneDeep from 'lodash/cloneDeep';

export default defineComponent({
  name: 'App',
  components: {
    JsonTreeView,
  },
  setup() {
    const defaultInfo = {
      firstName: '',
      lastName: '',
      email: '',
      address: {
        country: '',
        street: '',
        city: '',
        state: '',
        zip: '',
      },
      password: {
        p1: '',
        p2: '',
      },
    };

    const info = ref(cloneDeep(defaultInfo));

    const options = reactive({
      autoTest: false,
      autoTouch: false,
      lazy: false,
      firstError: false,
      touchOnTest: false,
    });

    const rules = computed(() => {
      const requiredCheck = (value: string): boolean => value !== '';

      const rgxCheck =
        (rgx: RegExp) =>
        (value: string): boolean =>
          rgx.test(value);

      const cityCheck = (value: string): Promise<boolean> => {
        return new Promise(resolve => {
          return setTimeout(() => {
            resolve(/[a-z]/.test(value));
          }, 2000);
        });
      };

      const stateCheck = async (value: string): Promise<boolean> => {
        const result: boolean = await new Promise(resolve =>
          setTimeout(() => {
            resolve(/[a-z]/.test(value));
          }, 2000),
        );

        return result;
      };

      const required = {
        test: requiredCheck,
        message: 'Field is required',
        name: 'required',
      };

      const email = {
        test: rgxCheck(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        ),
        message: (value: string) => `Your email "${value}" is not correct`,
        name: 'email',
      };

      const city = {
        test: cityCheck,
        message: 'City must be a string',
        name: 'city',
      };

      const state = {
        test: stateCheck,
        message: 'State must be a string',
        name: 'state',
      };

      const zip = {
        test: rgxCheck(/^[0-9]{5}(?:-[0-9]{4})?$/),
        message: 'ZIP code is not correct',
        name: 'zip',
      };

      const same = {
        test: (value: any, globalValue: any) =>
          value === globalValue.password.p1,
        message: 'Password is not the same',
        name: 'same',
      };

      return {
        firstName: [required],
        lastName: required,
        email: [required, email],
        address: {
          country: required,
          street: required,
          city: [required, city],
          state: [required, state],
          zip: [required, zip],
        },
        password: {
          p1: required,
          p2: [required, same],
        },
      };
    });

    const { result } = useValidate(info, rules, options);

    const validate = async () => {
      await result.value.$test();
      console.log('Validated!');
    };

    const reset = () => {
      info.value = cloneDeep(defaultInfo);
      result.value.$reset();
      console.log('Resetted!');
    };

    watch(options, () => {
      info.value = cloneDeep(defaultInfo);
    });

    return { info, options, result, validate, reset };
  },
});
</script>
