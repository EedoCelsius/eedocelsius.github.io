import { createI18n } from 'vue-i18n'
import en from './messages/en'
import ko from './messages/ko'

export const SUPPORTED_LOCALES = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'English' },
] as const

type LocaleCode = (typeof SUPPORTED_LOCALES)[number]['code']

const isSupportedLocale = (value: string | null): value is LocaleCode =>
  SUPPORTED_LOCALES.some((locale) => locale.code === value)

const getBrowserLocale = (): LocaleCode => {
  if (typeof navigator === 'undefined') {
    return 'ko'
  }

  const [language] = navigator.language.split('-')
  return isSupportedLocale(language) ? language : 'ko'
}

const storedLocale =
  typeof window !== 'undefined' ? window.localStorage.getItem('locale') : null

const initialLocale: LocaleCode = isSupportedLocale(storedLocale)
  ? storedLocale
  : getBrowserLocale()

const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: 'ko',
  messages: {
    en,
    ko,
  },
})

export default i18n

export type { LocaleCode }
