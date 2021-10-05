import { createApp } from 'vue';
import App from './App.vue';
import { store } from './store/store';
import './firebase';

import './assets/css/tailwind.css';

createApp(App)
  .use(store)
  .mount('#app');
