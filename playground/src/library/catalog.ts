import type { CatalogComponent } from './types'

export const componentCatalog: CatalogComponent[] = [
  {
    id: 'qr-code',
    name: {
      en: 'QR Code',
      ko: 'QR 코드',
    },
    description: {
      en: 'Display a clean QR code with optional brand colors and a center icon.',
      ko: '브랜드 색상과 중앙 아이콘을 선택해 깔끔한 QR 코드를 보여줍니다.',
    },
  },
  {
    id: 'spinner',
    name: {
      en: 'Spinner',
      ko: '스피너',
    },
    description: {
      en: 'Animated circular spinner with optional centered text sizing.',
      ko: '중앙 텍스트 크기를 조절할 수 있는 회전형 스피너입니다.',
    },
  },
  {
    id: 'blur-overlay',
    name: {
      en: 'Blur Overlay',
      ko: '블러 오버레이',
    },
    description: {
      en: 'Applies a configurable blur glass effect on top of any content.',
      ko: '어떤 콘텐츠든 부드러운 블러 글래스 효과로 가려줍니다.',
    },
  },
  {
    id: 'loading-overlay',
    name: {
      en: 'Loading Overlay',
      ko: '로딩 오버레이',
    },
    description: {
      en: 'Displays the loading spinner with optional text and description over blurred content.',
      ko: '블러 처리된 콘텐츠 위에 로딩 스피너와 선택적인 텍스트·설명을 표시합니다.',
    },
  },
]

const catalogIndex = new Map(componentCatalog.map((component) => [component.id, component]))

export const findCatalogComponent = (id: string) => catalogIndex.get(id)
