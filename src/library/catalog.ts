import type { AsyncComponentLoader } from 'vue'

export type LocaleCopy = {
  en: string
  ko: string
}

export type PlaygroundPropValue = string | number | boolean | null | undefined

export type ControlType = 'text' | 'textarea' | 'color' | 'slider' | 'boolean'

export interface ControlDefinition {
  key: string
  type: ControlType
  label: LocaleCopy
  helperText?: LocaleCopy
  min?: number
  max?: number
  step?: number
}

export type ComponentLoader = AsyncComponentLoader<unknown>

export interface LabComponentDefinition {
  id: string
  name: LocaleCopy
  description: LocaleCopy
  component: ComponentLoader
  preview?: ComponentLoader
  defaultProps: Record<string, PlaygroundPropValue>
  controls: ControlDefinition[]
}

export const componentCatalog: LabComponentDefinition[] = [
  {
    id: 'qr-code-card',
    name: {
      en: 'QR Code Card',
      ko: 'QR 코드 카드',
    },
    description: {
      en: 'Generate a branded QR card with custom colors and a centered logo.',
      ko: '사용자 지정 색상과 중앙 로고를 포함한 QR 카드입니다.',
    },
    component: () => import('@/components/library/QrCodeCard.vue'),
    preview: () => import('@/demos/QrCodeCardDemo.vue'),
    defaultProps: {
      content: 'https://component-lab.dev/welcome',
      lightColor: '#ffffff',
      darkColor: '#0f172a',
      icon: '/component-lab-mark.svg',
    },
    controls: [
      {
        key: 'content',
        type: 'textarea',
        label: { en: 'Content', ko: '콘텐츠' },
        helperText: {
          en: 'Text or URL that will be encoded inside the QR code.',
          ko: 'QR 코드에 담을 텍스트 또는 URL을 입력하세요.',
        },
      },
      {
        key: 'lightColor',
        type: 'color',
        label: { en: 'Light Color', ko: '밝은 색상' },
      },
      {
        key: 'darkColor',
        type: 'color',
        label: { en: 'Dark Color', ko: '어두운 색상' },
      },
      {
        key: 'icon',
        type: 'text',
        label: { en: 'Icon URL', ko: '아이콘 주소' },
        helperText: {
          en: 'Center image URL. Leave empty to hide the icon.',
          ko: '중앙에 표시할 이미지 주소입니다. 비워두면 아이콘이 숨겨집니다.',
        },
      },
    ],
  },
  {
    id: 'blur-overlay',
    name: {
      en: 'Blur Overlay',
      ko: '블러 오버레이',
    },
    description: {
      en: 'Applies a configurable blur glass effect on top of any content.',
      ko: '어떤 콘텐츠든 부드러운 블러 글래스 효과로 감쌉니다.',
    },
    component: () => import('@/components/library/BlurOverlay.vue'),
    preview: () => import('@/demos/BlurOverlayDemo.vue'),
    defaultProps: {
      visible: true,
      blur: 14,
      overlayColor: 'rgba(15, 23, 42, 0.45)',
    },
    controls: [
      {
        key: 'visible',
        type: 'boolean',
        label: { en: 'Visible', ko: '표시' },
      },
      {
        key: 'blur',
        type: 'slider',
        label: { en: 'Blur Strength', ko: '블러 강도' },
        min: 0,
        max: 30,
        step: 1,
      },
      {
        key: 'overlayColor',
        type: 'text',
        label: { en: 'Overlay Color', ko: '오버레이 색상' },
        helperText: {
          en: 'Accepts hex or rgba values. Transparency is recommended.',
          ko: 'HEX 또는 RGBA 값을 사용할 수 있습니다. 투명도를 권장합니다.',
        },
      },
    ],
  },
  {
    id: 'loading-overlay',
    name: {
      en: 'Loading Overlay',
      ko: '로딩 오버레이',
    },
    description: {
      en: 'Displays a PrimeVue spinner with optional description over blurred content.',
      ko: '블러 처리된 콘텐츠 위에 설명이 포함된 PrimeVue 스피너를 표시합니다.',
    },
    component: () => import('@/components/library/LoadingOverlay.vue'),
    preview: () => import('@/demos/LoadingOverlayDemo.vue'),
    defaultProps: {
      visible: true,
      blur: 18,
      description: 'Fetching your dashboard data...',
      overlayColor: 'rgba(15, 23, 42, 0.55)',
    },
    controls: [
      {
        key: 'visible',
        type: 'boolean',
        label: { en: 'Visible', ko: '표시' },
      },
      {
        key: 'blur',
        type: 'slider',
        label: { en: 'Blur Strength', ko: '블러 강도' },
        min: 0,
        max: 30,
        step: 1,
      },
      {
        key: 'description',
        type: 'text',
        label: { en: 'Description', ko: '설명' },
        helperText: {
          en: 'Text shown under the spinner. Leave empty to hide.',
          ko: '스피너 아래에 표시되는 문구입니다. 비워두면 숨겨집니다.',
        },
      },
      {
        key: 'overlayColor',
        type: 'text',
        label: { en: 'Overlay Color', ko: '오버레이 색상' },
        helperText: {
          en: 'Accepts hex or rgba values. Transparency is recommended.',
          ko: 'HEX 또는 RGBA 값을 사용할 수 있습니다. 투명도를 권장합니다.',
        },
      },
    ],
  },
]

export const componentMap = new Map(componentCatalog.map((item) => [item.id, item]))

export const getComponentDefinition = (id: string) => componentMap.get(id)
