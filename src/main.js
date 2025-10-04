import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './i18n';
import PrimeVue from 'primevue/config';

import 'primeicons/primeicons.css';
import 'primevue/resources/themes/lara-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import './assets/main.css';

const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(PrimeVue, { ripple: true });

app.mount('#app');
