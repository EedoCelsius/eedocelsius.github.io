import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    locales: {
      en: 'English',
      ko: '한국어'
    },
    navigation: {
      home: 'Overview',
      preview: 'Preview'
    },
    home: {
      title: 'Component Library Playground',
      description:
        'Preview and quality-check reusable UX building blocks. Each component includes a live playground and localized guidance.',
      previewCta: 'Open preview',
      propsTitle: 'Common props',
      deeplink: {
        title: 'Deeplink Experience',
        summary:
          'Guides users through deep-link activation, handling desktop vs. mobile with QR codes, loading states, and fallback dialogs.'
      }
    },
    preview: {
      title: '{component} preview',
      description: 'Adjust props on the left to test different scenarios instantly.',
      trigger: 'Trigger deeplink',
      reset: 'Reset to defaults',
      desktopOnlyTitle: 'Available on mobile only',
      desktopOnlyMessage:
        'The {app} link opens only on mobile devices. Scan the QR code with your phone to continue.',
      desktopOnlyCta: 'Understood',
      installPromptTitle: 'Having trouble opening {app}?',
      installPromptDescription:
        'We could not detect the app within {seconds} seconds. Please ensure it is installed or install it now.',
      installPromptCta: 'Try again',
      loadingMessage: 'Opening {app}...'
    }
  },
  ko: {
    locales: {
      en: 'English',
      ko: '한국어'
    },
    navigation: {
      home: '소개',
      preview: '미리보기'
    },
    home: {
      title: '컴포넌트 라이브러리 플레이그라운드',
      description:
        '재사용 가능한 UX 컴포넌트를 미리 보고 품질을 확인하세요. 각 컴포넌트는 라이브 미리보기와 다국어 안내를 제공합니다.',
      previewCta: '미리보기 열기',
      propsTitle: '공통 속성',
      deeplink: {
        title: '딥링크 경험',
        summary:
          '데스크톱과 모바일을 구분하여 QR 코드, 로딩 상태, 대체 다이얼로그를 제공하는 딥링크 플로우입니다.'
      }
    },
    preview: {
      title: '{component} 미리보기',
      description: '왼쪽 속성을 조정해 다양한 시나리오를 즉시 테스트하세요.',
      trigger: '딥링크 실행',
      reset: '기본값으로 초기화',
      desktopOnlyTitle: '모바일에서만 이용 가능',
      desktopOnlyMessage:
        '{app} 링크는 모바일 기기에서만 열 수 있습니다. 휴대폰으로 QR 코드를 스캔해 계속 진행하세요.',
      desktopOnlyCta: '확인',
      installPromptTitle: '{app}이(가) 열리지 않나요?',
      installPromptDescription:
        '{seconds}초 안에 앱 실행을 감지하지 못했습니다. 설치되어 있는지 확인하거나 설치 후 다시 시도하세요.',
      installPromptCta: '다시 시도',
      loadingMessage: '{app} 열기 중...'
    }
  }
};

const i18n = createI18n({
  legacy: false,
  locale: 'ko',
  fallbackLocale: 'en',
  messages
});

export default i18n;
