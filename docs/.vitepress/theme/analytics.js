import { initializeApp } from '@firebase/app'
import { getAnalytics } from '@firebase/analytics'

const config = {
  apiKey: "AIzaSyBY-7TmR3rfgye-KDG3QCx2F73tM4BQo-A",
  authDomain: "vue-tiny-validate.firebaseapp.com",
  projectId: "vue-tiny-validate",
  storageBucket: "vue-tiny-validate.appspot.com",
  messagingSenderId: "202088318374",
  appId: "1:202088318374:web:5a4d59d9b6d5f78bd83b67",
  measurementId: "G-G6Y36531LR"
}

const AnalyticsPlugin = {
  install(app, options) {
    const firebaseApp = initializeApp(config);
    const analytics = getAnalytics(firebaseApp);
  }
}

export default AnalyticsPlugin