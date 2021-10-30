import { createApp } from 'vue';
import App from './App.vue';
import { store } from './store/store';
import router from './router';

import './firebase';
import './assets/css/tailwind.css';
import './registerServiceWorker';

createApp(App)
  .use(router)
  .use(store)
  .mount('#app');
