import DefaultTheme from 'vitepress/theme';
import Analytics from './analytics';
import './style.css';

const Theme = {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(Analytics);
  },
};

export default Theme;
