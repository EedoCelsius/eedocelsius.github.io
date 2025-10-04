import { createI18n } from 'vue-i18n';
import en from '../locales/en.json';
import ko from '../locales/ko.json';

const resolveDefaultLocale = () => {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem('component-lab-locale');
    if (stored) {
      return stored;
    }
    const navigatorLocale = window.navigator.language.split('-')[0];
    if (navigatorLocale) {
      return navigatorLocale;
    }
  }
  return 'en';
};

const defaultLocale = resolveDefaultLocale();

const i18n = createI18n({
  legacy: false,
  locale: ['en', 'ko'].includes(defaultLocale) ? defaultLocale : 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    ko
  }
});

export default i18n;
