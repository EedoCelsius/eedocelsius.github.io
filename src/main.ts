import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './plugins/i18n';
import primevue from './plugins/primevue';

import '@/styles/main.scss';

const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(primevue);

app.mount('#app');
