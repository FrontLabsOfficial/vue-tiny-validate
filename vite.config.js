import vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';
import { resolve } from 'path';

const LIBRARY_NAME = 'vue-tiny-validate';

const settings = {
  plugins: [vue(), WindiCSS()],
  root: resolve(__dirname, 'example'),
  resolve: {
    alias: {
      [LIBRARY_NAME]: resolve(__dirname, 'src'),
    },
  },
};

// dev
const dev = {
  ...settings,
  server: {
    port: 3456,
  },
};

// build: example
const buildExample = {
  ...settings,
  build: {
    outDir: resolve(__dirname, 'dist-example'),
  },
};

// build: lib
const buildLib = {
  plugin: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, `src/index.ts`),
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
    outDir: resolve(__dirname, 'dist'),
  },
};

export default ({ command, mode }) => {
  switch (true) {
    case command === 'serve':
      return dev;
    case command === 'build' && mode === 'example':
      return buildExample;
    case command === 'build' && mode === 'lib':
      return buildLib;
    default:
      return {};
  }
};
