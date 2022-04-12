import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: [resolve(__dirname, '../test/setup.ts')],
    environment: 'happy-dom',
    reporters: 'verbose',
    deps: {
      inline: ['vue2', '@vue/composition-api', 'vue-demi'],
    },
    coverage: {
      include: ['src/*'],
      clean: true,
      lines: 99,
      statements: 99,
    },
  },
});
