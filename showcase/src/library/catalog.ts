import type { LocaleCopy } from './types'

export interface LabComponentSummary {
  id: string
  name: LocaleCopy
  description: LocaleCopy
}

export const componentCatalog: LabComponentSummary[] = [
  {
    id: 'group',
    name: {
      en: 'Group',
      ko: '그룹',
    },
    description: {
      en: 'Wrap adjacent elements so they behave like a single surface.',
      ko: '인접한 요소들을 하나의 표면처럼 묶습니다.',
    },
  },
  {
    id: 'actionable-card',
    name: {
      en: 'Actionable Card',
      ko: '액셔너블 카드',
    },
    description: {
      en: 'Combine rich account or product details with an always-visible action.',
      ko: '계좌나 상품 정보를 액션과 함께 매끄럽게 배치합니다.',
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
    id: 'liquid-glass',
    name: {
      en: 'Liquid Glass',
      ko: '리퀴드 글래스',
    },
    description: {
      en: 'Apply a tactile frosted glass effect to highlight layered content.',
      ko: '겹쳐진 콘텐츠를 돋보이게 하는 서리 낀 유리 효과를 제공합니다.',
    },
  },
  {
    id: 'overlay-container',
    name: {
      en: 'Overlay Container',
      ko: '오버레이 컨테이너',
    },
    description: {
      en: 'Stack interactive content with an optional blurred overlay surface.',
      ko: '필요에 따라 블러 오버레이를 더해 콘텐츠를 겹쳐 배치합니다.',
    },
  },
]

export const componentMap = new Map(componentCatalog.map((item) => [item.id, item]))

export const getComponentSummary = (id: string) => componentMap.get(id)
