import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import ko from './locales/ko.json';

const SUPPORTED_LOCALES = ['en', 'ko'];

function detectLocale() {
  const saved = localStorage.getItem('component-lab-locale');
  if (saved && SUPPORTED_LOCALES.includes(saved)) {
    return saved;
  }

  const browser = navigator.language?.split('-')[0];
  if (browser && SUPPORTED_LOCALES.includes(browser)) {
    return browser;
  }

  return 'en';
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: detectLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    ko,
  },
});

i18n.global.watchLocale((newLocale) => {
  localStorage.setItem('component-lab-locale', newLocale);
});

export default i18n;
