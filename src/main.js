import { createApp } from 'vue';
import App from './App.vue';
import { store } from './store/store';
import './firebase';

import './assets/css/tailwind.css';
import FontAwesomeIcon from './utilities/fontawesome-icons';

createApp(App)
  .component('fontAwesomeIcon', FontAwesomeIcon)
  .use(store)
  .mount('#app');
