import type { LocaleCopy } from './types'

export interface LabComponentSummary {
  id: string
  name: LocaleCopy
  description: LocaleCopy
}

export const componentCatalog: LabComponentSummary[] = [
  {
    id: 'actionable-card',
    name: {
      en: 'Actionable Card',
      ko: '액션 카드',
    },
    description: {
      en: 'Combine rich content with a responsive action that adapts between stacked and compact layouts.',
      ko: '리치 콘텐츠와 반응형 액션 버튼을 결합해 폭에 따라 세로와 컴팩트 레이아웃을 전환합니다.',
    },
  },
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
      en: 'Animated circular spinner with configurable size and colors.',
      ko: '크기와 색상을 조절할 수 있는 회전형 스피너입니다.',
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
      en: 'Displays the loading spinner over blurred content.',
      ko: '블러 처리된 콘텐츠 위에 로딩 스피너를 표시합니다.',
    },
  },
]

export const componentMap = new Map(componentCatalog.map((item) => [item.id, item]))

export const getComponentSummary = (id: string) => componentMap.get(id)
