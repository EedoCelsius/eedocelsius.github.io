import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import App from './App.vue';
import router from './router';
import i18n from './locales';

import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './assets/styles/theme.css';
import './assets/styles/base.css';

const app = createApp(App);

app.use(PrimeVue, {
  ripple: true,
  inputStyle: 'filled',
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '[data-theme="dark"]'
    }
  }
});

app.use(router);
app.use(i18n);

app.mount('#app');
