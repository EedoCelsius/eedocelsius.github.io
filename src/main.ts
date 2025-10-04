import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { i18n } from './plugins/i18n';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import ColorPicker from 'primevue/colorpicker';
import InputSwitch from 'primevue/inputswitch';
import Dropdown from 'primevue/dropdown';
import Divider from 'primevue/divider';

import 'primeicons/primeicons.css';
import './assets/styles/base.css';

const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.theme-dark',
      cssLayer: {
        name: 'primevue',
        priority: 1
      }
    }
  },
  ripple: true
});

app.component('Button', Button);
app.component('InputText', InputText);
app.component('Textarea', Textarea);
app.component('ColorPicker', ColorPicker);
app.component('InputSwitch', InputSwitch);
app.component('Dropdown', Dropdown);
app.component('Divider', Divider);

app.mount('#app');
