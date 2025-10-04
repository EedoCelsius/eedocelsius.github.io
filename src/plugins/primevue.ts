import { App } from 'vue';
import PrimeVue from 'primevue/config';
import DialogService from 'primevue/dialogservice';
import ToastService from 'primevue/toastservice';
import Aura from '@primevue/themes/aura';

export default {
  install(app: App) {
    app.use(PrimeVue, {
      ripple: true,
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.p-dark'
        }
      }
    });
    app.use(DialogService);
    app.use(ToastService);
  }
};
