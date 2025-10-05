import { createI18n } from 'vue-i18n'

export const localeStorageKey = 'component-lab-locale'

const messages = {
  en: {
    app: {
      title: 'Component Lab',
      themeToggle: 'Toggle theme',
      language: 'Language',
    },
    home: {
      title: 'Component Library',
      description: 'Pick a component and adjust its props in real-time.',
      openPlayground: 'Open playground',
    },
    playground: {
      heading: 'Component Playground',
      preview: 'Preview',
      controls: 'Props',
      reset: 'Reset to defaults',
      optionalToggle: 'Enable override',
      helper: 'Tweak the props to immediately see the rendered result.',
      notFoundTitle: 'Component not found',
      notFoundDescription: 'The component you are looking for does not exist or is not yet available.',
      backHome: 'Back to home',
    },
  },
  ko: {
    app: {
      title: 'Component Lab',
      themeToggle: '테마 전환',
      language: '언어',
    },
    home: {
      title: '컴포넌트 라이브러리',
      description: '컴포넌트를 선택하고 속성값을 실시간으로 조정해 보세요.',
      openPlayground: '플레이그라운드 열기',
    },
    playground: {
      heading: '컴포넌트 플레이그라운드',
      preview: '미리보기',
      controls: '속성값',
      reset: '기본값으로 재설정',
      optionalToggle: '값 수정',
      helper: '속성값을 조정하면 즉시 렌더링 결과를 확인할 수 있습니다.',
      notFoundTitle: '컴포넌트를 찾을 수 없습니다',
      notFoundDescription: '요청한 컴포넌트가 존재하지 않거나 아직 준비되지 않았습니다.',
      backHome: '홈으로 돌아가기',
    },
  },
}

export type MessageSchema = typeof messages.en
export type SupportedLocale = keyof typeof messages

const resolveInitialLocale = (): SupportedLocale => {
  if (typeof window === 'undefined') {
    return 'en'
  }

  const stored = window.localStorage.getItem(localeStorageKey) as SupportedLocale | null
  if (stored && stored in messages) {
    return stored
  }

  const language = window.navigator.language.toLowerCase()
  if (language.startsWith('ko')) {
    return 'ko'
  }

  return 'en'
}

const i18n = createI18n<[MessageSchema], SupportedLocale>({
  legacy: false,
  locale: resolveInitialLocale(),
  fallbackLocale: 'en',
  messages,
})

export default i18n
