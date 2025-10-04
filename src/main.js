import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import App from './App.vue';
import router from './router';
import i18n from './i18n';

import 'primeicons/primeicons.css';
import './assets/styles/main.css';

const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.component-lab-dark',
      cssLayer: true,
    },
  },
});

app.mount('#app');
