import { createI18n } from 'vue-i18n';
import en from '../locales/en.json';
import ko from '../locales/ko.json';

const defaultLocale = 'en';
const supportedLocales = ['en', 'ko'] as const;

const localeFromStorage = localStorage.getItem('component-lab-locale');
const initialLocale = supportedLocales.includes((localeFromStorage as any) ?? '')
  ? (localeFromStorage as (typeof supportedLocales)[number])
  : defaultLocale;

export const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: defaultLocale,
  messages: {
    en,
    ko
  }
});

export type SupportedLocale = (typeof supportedLocales)[number];

export function setLocale(locale: SupportedLocale) {
  i18n.global.locale.value = locale;
  localStorage.setItem('component-lab-locale', locale);
}
