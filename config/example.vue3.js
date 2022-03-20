import { resolve } from 'path';
import {
  presetAttributify,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import Unocss from 'unocss/vite';
import vue from '@vitejs/plugin-vue';
import { LIBRARY_NAME } from './shared';

const settings = {
  plugins: [
    vue(),
    Unocss({
      presets: [presetAttributify({ strict: true }), presetUno()],
      transformers: [transformerVariantGroup(), transformerDirectives()],
    }),
  ],
  root: resolve(__dirname, '../example/vue3'),
  resolve: {
    alias: {
      [LIBRARY_NAME]: resolve(__dirname, '../src'),
    },
  },
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
};

const dev = {
  ...settings,
  server: {
    port: 3456,
  },
};

const build = {
  ...settings,
  build: {
    outDir: resolve(__dirname, '../dist-example-vue3'),
  },
};

export default ({ command }) => (command === 'serve' ? dev : build);
