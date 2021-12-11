import { createApp } from 'vue';
import App from './App.vue';
import { store } from './store/store';
import router from './router';
import { QuillEditor } from '@vueup/vue-quill';
import Donut from 'vue-css-donut-chart';

import './registerServiceWorker';
import './firebase';
import './assets/css/tailwind.css';
import './assets/css/global.scss';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import 'vue-css-donut-chart/dist/vcdonut.css';

createApp(App)
  .use(router)
  .use(store)
  .use(Donut)
  .component('QuillEditor', QuillEditor)
  .mount('#app');
