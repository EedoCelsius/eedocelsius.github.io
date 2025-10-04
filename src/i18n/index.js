import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    app: {
      title: 'Component Playground',
      tagline: 'Preview, iterate, and share Vue components in isolation.',
      theme: {
        label: 'Theme',
        light: 'Light',
        dark: 'Dark'
      },
      language: 'Language'
    },
    navigation: {
      overview: 'Overview',
      components: 'Components',
      deeplinkPlayground: 'Deep Link Experience'
    },
    routes: {
      home: {
        title: 'Component Playground'
      },
      deeplinkExperience: {
        title: 'Deep Link Experience Playground'
      }
    },
    home: {
      hero: {
        title: 'Component Playground',
        subtitle: 'Preview and fine-tune reusable UI blocks with live props and contextual docs.'
      },
      componentsTitle: 'Available components',
      openPlayground: 'Open playground',
      comingSoon: 'More components will appear here as they are added.'
    },
    components: {
      deeplink: {
        name: 'Deep Link Experience',
        description: 'Simulate deep link flows and fallback behaviours for mobile and desktop users.'
      }
    },
    playground: {
      common: {
        back: 'Back to overview'
      },
      deeplink: {
        formTitle: 'Configure props',
        previewTitle: 'Live preview',
        mobileOnlyHint: 'Tip: Use the trigger button to emulate the deep link flow.',
        labels: {
          appName: 'App name',
          deeplinkUrl: 'Deep link URL',
          icon: 'Icon URL',
          timeout: 'Timeout (seconds)'
        },
        helper: {
          deeplinkUrl: 'Use your custom scheme or universal link that should be opened.',
          timeout: 'How long to wait before showing the install prompt on mobile.'
        },
        actions: {
          trigger: 'Trigger experience',
          reset: 'Reset to defaults'
        }
      }
    },
    deeplinkComponent: {
      desktop: {
        title: 'Available on mobile only',
        description: '{appName} links open on mobile devices. Scan this QR code with your phone to continue.',
        hint: 'Scan with your camera or QR app to launch {appName}.',
        confirm: 'Close'
      },
      mobile: {
        loading: 'Opening {appName}...',
        installTitle: 'Install required',
        installMessage: 'We could not open {appName}. Install the app and try again.',
        confirm: 'Understood'
      }
    }
  },
  ko: {
    app: {
      title: 'Component Playground',
      tagline: 'Vue 컴포넌트를 분리된 공간에서 미리 보고 빠르게 개선하세요.',
      theme: {
        label: '테마',
        light: '라이트',
        dark: '다크'
      },
      language: '언어'
    },
    navigation: {
      overview: '소개',
      components: '컴포넌트',
      deeplinkPlayground: '딥링크 경험'
    },
    routes: {
      home: {
        title: 'Component Playground'
      },
      deeplinkExperience: {
        title: '딥링크 경험 플레이그라운드'
      }
    },
    home: {
      hero: {
        title: 'Component Playground',
        subtitle: '재사용 가능한 UI 조각을 실시간으로 테스트하고 문서화하세요.'
      },
      componentsTitle: '사용 가능한 컴포넌트',
      openPlayground: '플레이그라운드 열기',
      comingSoon: '추가 컴포넌트가 곧 여기에 추가될 예정입니다.'
    },
    components: {
      deeplink: {
        name: '딥링크 경험',
        description: '모바일과 데스크톱 환경에서의 딥링크 흐름과 폴백을 시뮬레이션합니다.'
      }
    },
    playground: {
      common: {
        back: '목록으로 돌아가기'
      },
      deeplink: {
        formTitle: 'Props 설정',
        previewTitle: '라이브 미리보기',
        mobileOnlyHint: '버튼을 눌러 딥링크 동작을 에뮬레이션해 보세요.',
        labels: {
          appName: '앱 이름',
          deeplinkUrl: '딥링크 URL',
          icon: '아이콘 URL',
          timeout: '대기 시간(초)'
        },
        helper: {
          deeplinkUrl: '열고 싶은 커스텀 스킴 또는 유니버설 링크를 입력하세요.',
          timeout: '모바일에서 설치 안내를 띄우기까지 기다리는 시간입니다.'
        },
        actions: {
          trigger: '경험 실행',
          reset: '기본값으로 초기화'
        }
      }
    },
    deeplinkComponent: {
      desktop: {
        title: '모바일에서만 이용 가능',
        description: '{appName} 링크는 모바일에서 열립니다. 아래 QR 코드를 휴대폰으로 스캔해 주세요.',
        hint: '카메라 또는 QR 앱으로 스캔하면 {appName}이 실행됩니다.',
        confirm: '닫기'
      },
      mobile: {
        loading: '{appName}을(를) 여는 중...',
        installTitle: '설치가 필요해요',
        installMessage: '{appName}을(를) 열 수 없었습니다. 앱을 설치한 뒤 다시 시도해 주세요.',
        confirm: '확인'
      }
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
