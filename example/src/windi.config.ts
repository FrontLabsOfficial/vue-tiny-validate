import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  extract: {
    include: ['example/**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git', 'src'],
  },
});
