import { createI18n } from 'vue-i18n';
import en from './en';
import ko from './ko';

export const messages = {
  en,
  ko,
};

export type LocaleKey = keyof typeof messages;

function resolveLocale(): LocaleKey {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const saved = window.localStorage.getItem('component-lab-locale') as LocaleKey | null;
  if (saved && Object.prototype.hasOwnProperty.call(messages, saved)) {
    return saved;
  }

  const navigatorLang = typeof window.navigator !== 'undefined'
    ? window.navigator.language.slice(0, 2).toLowerCase()
    : 'en';

  return (Object.prototype.hasOwnProperty.call(messages, navigatorLang) ? navigatorLang : 'en') as LocaleKey;
}

export const i18n = createI18n({
  legacy: false,
  locale: resolveLocale(),
  fallbackLocale: 'en',
  messages,
});

export function setLocale(locale: LocaleKey) {
  if (!Object.prototype.hasOwnProperty.call(messages, locale)) {
    return;
  }

  i18n.global.locale.value = locale;
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('component-lab-locale', locale);
  }
}

export const availableLocales: Array<{ value: LocaleKey; label: string }> = [
  { value: 'en', label: 'English' },
  { value: 'ko', label: '한국어' },
];
