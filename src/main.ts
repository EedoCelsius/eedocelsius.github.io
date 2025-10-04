import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { i18n } from './modules/i18n';
import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './assets/main.scss';

const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(PrimeVue, { ripple: true });

app.mount('#app');
