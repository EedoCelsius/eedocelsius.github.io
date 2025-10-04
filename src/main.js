import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import App from './App.vue';
import router from './router';
import i18n from './i18n';

import '@primevue/core/base/style';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './style.css';

const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: '.dark-theme'
    }
  }
});

app.mount('#app');
