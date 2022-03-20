import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import { LIBRARY_NAME } from './shared';

const config = {
  plugin: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, '../src/index.ts'),
      name: LIBRARY_NAME,
      fileName: 'index',
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      external: ['vue', 'vue-demi'],
      output: {
        globals: {
          vue: 'Vue',
          'vue-demi': 'VueDemi',
        },
      },
    },
    outDir: resolve(__dirname, '../dist'),
  },
};

export default config;
