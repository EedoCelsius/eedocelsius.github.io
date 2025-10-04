const messages = {
  app: {
    title: 'Experience Design 라이브러리',
    description: '딥링크와 채널 여정을 매끄럽게 연결하는 고객 경험 컴포넌트를 제공합니다.',
  },
  navigation: {
    home: '홈',
    components: '컴포넌트',
    language: '언어',
    switchToDark: '다크 모드로 전환',
    switchToLight: '라이트 모드로 전환',
  },
  home: {
    heroTitle: '멋진 딥링크 경험을 설계하세요',
    heroSubtitle:
      '인터랙티브 플레이그라운드에서 동작을 검증하고 문구를 확인하여 팀과 명세를 공유할 수 있습니다.',
    exploreButton: '컴포넌트 살펴보기',
    previewSectionTitle: '미리보기',
    previewSectionSubtitle: '브랜드에 맞는 기본 값을 제공하여 빠르게 조정할 수 있습니다.',
  },
  componentsPage: {
    title: '컴포넌트 라이브러리',
    subtitle: '컴포넌트를 선택하면 인터랙티브 플레이그라운드가 열립니다.',
  },
  component: {
    tagsLabel: '태그',
    goBack: '컴포넌트로 돌아가기',
    previewTitle: '라이브 미리보기',
    playgroundTitle: '인터랙티브 플레이그라운드',
    reset: '기본값으로 초기화',
  },
  components: {
    deeplinkExperience: {
      name: '딥링크 경험',
      shortDescription: '웹 터치포인트에서 모바일 앱으로 부드럽게 이동하도록 돕습니다.',
      description:
        '다양한 디바이스에서 딥링크가 어떻게 동작하는지 테스트하고, 팀과 공유할 문구와 폴백 전략을 정리하세요.',
      tags: ['모바일', 'QR 코드', '전환'],
      desktopDialogTitle: '모바일에서만 이용할 수 있어요',
      desktopDialogDescription:
        '{appName} 링크는 모바일에서만 열립니다. 휴대폰으로 이동하려면 QR 코드를 스캔하세요.',
      desktopDialogHint: '{appName} 앱에서 열어보세요.',
      desktopDialogAction: '확인',
      mobileLoadingTitle: '{appName} 여는 중...',
      mobileLoadingDescription: '앱을 실행하는 동안 잠시만 기다려 주세요.',
      mobileInstallTitle: '{appName} 실행이 어려워요',
      mobileInstallDescription:
        '앱이 자동으로 실행되지 않았습니다. 설치 후 모바일에서 다시 시도해 주세요.',
      mobileInstallAction: '닫기',
      playground: {
        title: '경험을 조율해 보세요',
        description: '브랜드와 상호작용 타이밍에 맞춰 prop을 수정할 수 있습니다.',
        controls: {
          appName: {
            label: '앱 이름',
            helper: '문구와 폴백 메시지에 사용됩니다.',
          },
          deeplinkUrl: {
            label: '딥링크 URL',
            helper: '모바일 앱을 실행할 네이티브 스킴 또는 유니버설 링크입니다.',
          },
          icon: {
            label: '아이콘 URL',
            helper: 'QR 코드 중앙에 표시됩니다. 투명 PNG를 권장합니다.',
          },
          timeout: {
            label: '타임아웃 (초)',
            helper: '이 시간이 지나면 모바일에서 설치 안내를 보여줍니다.',
          },
        },
        trigger: '딥링크 실행하기',
      },
    },
  },
  messages: {
    notFoundTitle: '페이지를 찾을 수 없습니다',
    notFoundDescription: '요청한 페이지가 존재하지 않습니다. 컴포넌트 목록으로 돌아가세요.',
    goHome: '홈으로 가기',
  },
}

export default messages
