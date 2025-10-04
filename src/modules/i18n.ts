import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    app: {
      title: 'Component Lab',
      description: 'Test and iterate on reusable interface components with live playgrounds.'
    },
    navigation: {
      home: 'Overview',
      components: 'Components'
    },
    controls: {
      darkMode: 'Dark mode',
      lightMode: 'Light mode',
      language: 'Language',
      copyLink: 'Copy link',
      launch: 'Launch',
      reset: 'Reset'
    },
    home: {
      heroTitle: 'Design. Prototype. Iterate.',
      heroSubtitle: 'Bring deeplinks and future experiences to life with instant feedback and built-in tooling.',
      componentCount: '{count} components'
    },
    playground: {
      header: '{name} playground',
      description: 'Adjust props and interact with the component in real time.',
      propsTitle: 'Props',
      previewTitle: 'Preview',
      usageTitle: 'Usage'
    },
    deeplink: {
      desktopTitle: 'Available on mobile only',
      desktopBody: 'Use your phone to scan the QR code and open {app}.',
      mobileTitle: 'Opening {app}...',
      mobileBody: 'If the app does not open automatically, install it below.',
      installCta: 'Install {app}',
      confirm: 'Close',
      scanningHint: 'Scan to continue on {app}.',
      mobileOnly: 'This action works on mobile devices only.',
      loading: 'Launching {app}...'
    }
  },
  ko: {
    app: {
      title: 'Component Lab',
      description: '실시간 플레이그라운드에서 재사용 가능한 컴포넌트를 테스트하고 다듬어 보세요.'
    },
    navigation: {
      home: '개요',
      components: '컴포넌트'
    },
    controls: {
      darkMode: '다크 모드',
      lightMode: '라이트 모드',
      language: '언어',
      copyLink: '링크 복사',
      launch: '실행',
      reset: '초기화'
    },
    home: {
      heroTitle: '디자인, 프로토타입, 반복',
      heroSubtitle: '딥링크와 다양한 경험을 즉시 확인하고 피드백 받을 수 있는 도구입니다.',
      componentCount: '{count}개의 컴포넌트'
    },
    playground: {
      header: '{name} 플레이그라운드',
      description: 'Props를 조정하면서 컴포넌트와 실시간으로 상호작용하세요.',
      propsTitle: 'Props',
      previewTitle: '미리보기',
      usageTitle: '사용 예시'
    },
    deeplink: {
      desktopTitle: '모바일에서만 이용할 수 있어요',
      desktopBody: '{app}을(를) 열려면 휴대폰으로 QR코드를 스캔해 주세요.',
      mobileTitle: '{app} 열기...',
      mobileBody: '앱이 자동으로 실행되지 않으면 아래에서 설치해 주세요.',
      installCta: '{app} 설치하기',
      confirm: '확인',
      scanningHint: '{app}으로 이동하려면 스캔하세요.',
      mobileOnly: '이 기능은 모바일 환경에서만 동작해요.',
      loading: '{app} 실행 중...'
    }
  }
};

export const i18n = createI18n({
  legacy: false,
  locale: 'ko',
  fallbackLocale: 'en',
  messages
});
