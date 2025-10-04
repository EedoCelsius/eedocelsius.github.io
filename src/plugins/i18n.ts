import { createI18n } from 'vue-i18n';

type LibraryCopy = {
  name: string;
  description: string;
  notes: string[];
};

type BaseMessageSchema = {
  app: {
    title: string;
    tagline: string;
    themeLight: string;
    themeDark: string;
  };
  nav: {
    home: string;
    components: string;
  };
  actions: {
    viewDetails: string;
    back: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    componentsTitle: string;
    componentsSubtitle: string;
  };
  library: {
    qrCodeCard: LibraryCopy;
    blurOverlay: LibraryCopy;
    loadingOverlay: LibraryCopy;
  };
  component: {
    previewTitle: string;
    controlsTitle: string;
    documentationTitle: string;
    emptySlotInfo: string;
    samples: {
      focus: string;
      notFound: string;
    };
    props: {
      content: string;
      lightColor: string;
      darkColor: string;
      icon: string;
      blurLevel: string;
      description: string;
    };
  };
};

const messages: Record<'en' | 'ko', BaseMessageSchema> = {
  en: {
    app: {
      title: 'Component Lab',
      tagline: 'PrimeVue powered component playground',
      themeLight: 'Light',
      themeDark: 'Dark'
    },
    nav: {
      home: 'Home',
      components: 'Components'
    },
    actions: {
      viewDetails: 'Open preview',
      back: 'Back to list'
    },
    home: {
      heroTitle: 'Experiment with reusable UI pieces',
      heroSubtitle: 'A personal catalogue of Vue components styled with PrimeVue and Tailwind. Adjust props and see how each block behaves instantly.',
      componentsTitle: 'Available components',
      componentsSubtitle: 'Each component includes interactive controls so you can validate props quickly.'
    },
    library: {
      qrCodeCard: {
        name: 'QR Code Card',
        description: 'Display a shareable QR code with optional accent colors and a centered icon.',
        notes: [
          'Icon images are rendered at 20% of the QR size to avoid obstructing scanning.',
          'Use transparent PNG or SVG icons for the cleanest result.'
        ]
      },
      blurOverlay: {
        name: 'Blur Overlay',
        description: 'A lightweight backdrop overlay with configurable blur intensity.',
        notes: [
          'Wrap it in a relative container to overlay specific content areas.',
          'The blur level is applied via backdrop-filter and supports decimal values.'
        ]
      },
      loadingOverlay: {
        name: 'Loading Overlay',
        description: 'Extends the blur overlay with a centered PrimeVue spinner and optional text.',
        notes: [
          'Best suited for blocking interactions during data fetches.',
          'Customize the description to communicate the current step.'
        ]
      }
    },
    component: {
      previewTitle: 'Live preview',
      controlsTitle: 'Controls',
      documentationTitle: 'Component notes',
      emptySlotInfo: 'Content rendered underneath the overlay',
      samples: {
        focus: 'Focus mode enabled',
        notFound: 'Component not found.'
      },
      props: {
        content: 'Content',
        lightColor: 'Light color',
        darkColor: 'Dark color',
        icon: 'Icon URL',
        blurLevel: 'Blur level',
        description: 'Description'
      }
    }
  },
  ko: {
    app: {
      title: 'Component Lab',
      tagline: 'PrimeVue 기반 컴포넌트 실험실',
      themeLight: '라이트',
      themeDark: '다크'
    },
    nav: {
      home: '홈',
      components: '컴포넌트'
    },
    actions: {
      viewDetails: '미리보기 열기',
      back: '목록으로'
    },
    home: {
      heroTitle: '재사용 가능한 UI 조각 실험하기',
      heroSubtitle: 'PrimeVue와 Tailwind로 스타일링된 개인용 Vue 컴포넌트 모음입니다. 속성을 조절하고 즉시 변화를 확인하세요.',
      componentsTitle: '사용 가능한 컴포넌트',
      componentsSubtitle: '각 컴포넌트는 인터랙티브 컨트롤을 제공하여 빠르게 속성을 검증할 수 있습니다.'
    },
    library: {
      qrCodeCard: {
        name: 'QR 코드 카드',
        description: '강조 색상과 중앙 아이콘을 선택할 수 있는 공유용 QR 코드를 보여줍니다.',
        notes: [
          '아이콘 이미지는 QR 크기의 20%로 렌더링되어 스캔을 방해하지 않습니다.',
          '투명한 PNG 또는 SVG 아이콘을 사용하면 가장 깔끔합니다.'
        ]
      },
      blurOverlay: {
        name: '블러 오버레이',
        description: '블러 강도를 조절할 수 있는 가벼운 배경 오버레이입니다.',
        notes: [
          '특정 영역 위에 덮어씌우려면 상대 위치 컨테이너 내부에 배치하세요.',
          '블러 강도는 backdrop-filter를 통해 적용되며 소수 값도 지원합니다.'
        ]
      },
      loadingOverlay: {
        name: '로딩 오버레이',
        description: '블러 오버레이에 PrimeVue 스피너와 설명 문구를 더했습니다.',
        notes: [
          '데이터 로딩 동안 상호작용을 차단하는 용도로 적합합니다.',
          '현재 진행 상황을 설명하는 문구로 사용자에게 상황을 알리세요.'
        ]
      }
    },
    component: {
      previewTitle: '라이브 프리뷰',
      controlsTitle: '컨트롤',
      documentationTitle: '컴포넌트 노트',
      emptySlotInfo: '오버레이 아래에 렌더링되는 콘텐츠',
      samples: {
        focus: '포커스 모드가 활성화되었습니다',
        notFound: '컴포넌트를 찾을 수 없습니다.'
      },
      props: {
        content: '콘텐츠',
        lightColor: '밝은 색상',
        darkColor: '어두운 색상',
        icon: '아이콘 URL',
        blurLevel: '블러 강도',
        description: '설명'
      }
    }
  }
};

export type MessageSchema = BaseMessageSchema;

const i18n = createI18n<[MessageSchema], 'en' | 'ko'>({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
});

export default i18n;
