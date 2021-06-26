import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  extract: {
    include: ['example/**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git', 'src'],
  },
  plugins: [
    require('@windicss/plugin-scrollbar'),
    require('windicss/plugin/forms'),
  ],
});
