import { createApp } from 'vue';
import App from './App.vue';
import { store } from './store/store';
import router from './router';
import { QuillEditor } from '@vueup/vue-quill';

import './registerServiceWorker';
import './firebase';
import './assets/css/tailwind.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

createApp(App)
  .use(router)
  .use(store)
  .component('QuillEditor', QuillEditor)
  .mount('#app');
