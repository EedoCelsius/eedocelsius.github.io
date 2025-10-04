import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import router from './router';
import { i18n } from './locales';
import './styles/main.css';
import 'primevue/resources/themes/aura-light-noir/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(PrimeVue);

app.mount('#app');
