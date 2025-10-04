import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';
import Tooltip from 'primevue/tooltip';
import App from './App.vue';
import router from './router';
import i18n from './plugins/i18n';

import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './styles/main.scss';

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(ToastService);
app.use(DialogService);
app.directive('tooltip', Tooltip);
app.use(router);
app.use(i18n);

app.mount('#app');
