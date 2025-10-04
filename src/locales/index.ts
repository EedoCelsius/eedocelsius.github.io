import { createI18n } from 'vue-i18n';
import en from './en.json';
import ko from './ko.json';

type LocaleKey = 'en' | 'ko';

const STORAGE_KEY = 'component-lab-locale';

function resolveInitialLocale(): LocaleKey {
  if (typeof window === 'undefined') {
    return 'ko';
  }

  const stored = window.localStorage.getItem(STORAGE_KEY) as LocaleKey | null;
  if (stored === 'en' || stored === 'ko') {
    return stored;
  }

  const navigatorLanguage = window.navigator.language.toLowerCase();
  if (navigatorLanguage.startsWith('ko')) {
    return 'ko';
  }

  const matched = window.navigator.languages?.find((lang) => lang.toLowerCase().startsWith('ko'));
  return matched ? 'ko' : 'en';
}

export const i18n = createI18n({
  legacy: false,
  locale: resolveInitialLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    ko,
  },
});

export function setLocale(locale: LocaleKey) {
  i18n.global.locale.value = locale;
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, locale);
  }
}

export function getLocale(): LocaleKey {
  return i18n.global.locale.value as LocaleKey;
}

export default i18n;
