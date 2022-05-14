import { getAnalytics, isSupported } from '@firebase/analytics';
import { initializeApp } from '@firebase/app';

const GOOGLE_ANALYTICS_CONFIG = {
  apiKey: 'AIzaSyBY-7TmR3rfgye-KDG3QCx2F73tM4BQo-A',
  authDomain: 'vue-tiny-validate.firebaseapp.com',
  projectId: 'vue-tiny-validate',
  storageBucket: 'vue-tiny-validate.appspot.com',
  messagingSenderId: '202088318374',
  appId: '1:202088318374:web:5a4d59d9b6d5f78bd83b67',
  measurementId: 'G-G6Y36531LR',
};

const SELF_DEPLOYED_ANALYTICS_CONFIG = {
  'data-website-id': 'e40a6e9f-6d6a-4f57-969b-085c8e22a276',
  src: 'https://analytics.duyanh.dev/umami.js',
  defer: '',
};

const setAttributes = (el, attrs) => {
  for (const key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};

const AnalyticsPlugin = {
  async install() {
    // google analytics
    const isEnvSupported = await isSupported();

    if (isEnvSupported) {
      const firebaseApp = initializeApp(GOOGLE_ANALYTICS_CONFIG);
      getAnalytics(firebaseApp);
      console.info('Init-ed FireBase analytics');
    }

    // self-deployed analytics
    const scriptElement = document.createElement('script');
    setAttributes(scriptElement, SELF_DEPLOYED_ANALYTICS_CONFIG);
    document.head.appendChild(scriptElement);
    console.info('Init-ed self-deployed analytics');
  },
};

export default AnalyticsPlugin;
