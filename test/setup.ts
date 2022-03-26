import isEqual from 'lodash/isEqual';
import { expect } from 'vitest';
import { Vue2, install, isVue2 } from 'vue-demi';

const setup = () => {
  if (isVue2) {
    Vue2.config.productionTip = false;
    Vue2.config.devtools = false;
    install(Vue2);
  }
};

expect.extend({
  deepEqual(received, value) {
    const pass = isEqual(received, value);

    return {
      pass,
      message: () =>
        pass
          ? 'Passed'
          : `Expected ${JSON.stringify(
              received,
              null,
              2,
            )} to be ${JSON.stringify(value, null, 2)}`,
    };
  },
});

setup();
