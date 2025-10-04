import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import router from './router';
import i18n from './locales';

import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './styles/main.css';

const app = createApp(App);

app.use(PrimeVue, { ripple: true });
app.use(router);
app.use(i18n);

app.mount('#app');
