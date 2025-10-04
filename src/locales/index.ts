import { createI18n } from 'vue-i18n';

import en from './en.json';
import ko from './ko.json';

export const messages = {
  en,
  ko
};

type LocaleKey = keyof typeof messages;

function getDefaultLocale(): LocaleKey {
  if (typeof navigator === 'undefined') {
    return 'en';
  }

  const language = navigator.language.toLowerCase();
  if (language.startsWith('ko')) {
    return 'ko';
  }

  return 'en';
}

const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  messages
});

export default i18n;
