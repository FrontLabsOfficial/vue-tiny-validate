import vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';

import { resolve } from 'path';

const libraryName = 'vue-tiny-validate';

const example = resolve(__dirname, 'example');
const exampleOutDir = resolve(__dirname, 'dist-example');
const library = resolve(__dirname, 'src');
const libraryEntry = resolve(__dirname, `src/${libraryName}.ts`);
const libraryOutDir = resolve(__dirname, 'dist');

export default ({ command, mode }) => {
  const exampleOption = {
    plugins: [vue(), WindiCSS()],
    root: example,
  };

  // dev mode
  if (command === 'serve') {
    return {
      ...exampleOption,
      server: {
        port: 3111,
      },
    };
  }

  // otherwise, build mode

  // build example
  if (mode === 'example') {
    return {
      ...exampleOption,
      build: {
        outDir: exampleOutDir,
      },
    };
  }

  // build library
  if (mode === 'library') {
    return {
      plugin: [vue()],
      build: {
        lib: {
          entry: libraryEntry,
          name: libraryName,
          formats: ['es', 'cjs', 'umd'],
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue',
            },
          },
        },
        outDir: libraryOutDir,
      },
    };
  }

  return {};
};
