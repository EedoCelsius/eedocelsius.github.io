import type { AsyncComponentLoader } from 'vue'

export type LocaleCopy = {
  en: string
  ko: string
}

export type PlaygroundPropValue = string | number | boolean | null | undefined

export type ControlType = 'boolean' | 'slider' | 'color' | 'text' | 'textarea'

export interface ControlGroupDefinition {
  id: string
  label: LocaleCopy
}

export interface ControlDefinition {
  key: string
  type: ControlType
  label: LocaleCopy
  group?: ControlGroupDefinition
  helperText?: LocaleCopy
  min?: number
  max?: number
  step?: number
}

const spinnerControlGroup: ControlGroupDefinition = {
  id: 'spinner',
  label: { en: 'Spinner', ko: '스피너' },
}

const overlayControlGroup: ControlGroupDefinition = {
  id: 'overlay',
  label: { en: 'Overlay', ko: '오버레이' },
}

export type ComponentLoader = AsyncComponentLoader<unknown>

export interface LabComponentDefinition {
  id: string
  name: LocaleCopy
  description: LocaleCopy
  component: ComponentLoader
  preview?: ComponentLoader
  controls: ControlDefinition[]
}

export const componentCatalog: LabComponentDefinition[] = [
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
    component: () => import('@library/components/QrCode.vue'),
    preview: () => import('@/demos/QrCodeDemo.vue'),
    controls: [
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
        key: 'content',
        type: 'textarea',
        label: { en: 'Content', ko: '콘텐츠' },
        helperText: {
          en: 'Text or URL that will be encoded inside the QR code.',
          ko: 'QR 코드에 담을 텍스트 또는 URL을 입력하세요.',
        },
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
    id: 'spinner',
    name: {
      en: 'Spinner',
      ko: '스피너',
    },
    description: {
      en: 'Animated circular spinner with optional centered text sizing.',
      ko: '중앙 텍스트 크기를 조절할 수 있는 회전형 스피너입니다.',
    },
    component: () => import('@library/components/Spinner.vue'),
    preview: () => import('@/demos/SpinnerDemo.vue'),
    controls: [
      {
        key: 'diameter',
        type: 'slider',
        label: { en: 'Diameter', ko: '지름' },
        min: 48,
        max: 192,
        step: 4,
      },
      {
        key: 'thickness',
        type: 'slider',
        label: { en: 'Ring Thickness', ko: '테두리 두께' },
        min: 2,
        max: 20,
        step: 1,
      },
      {
        key: 'textSize',
        type: 'slider',
        label: { en: 'Text Size', ko: '텍스트 크기' },
        min: 12,
        max: 48,
        step: 1,
      },
      {
        key: 'indicatorColor',
        type: 'color',
        label: { en: 'Indicator Color', ko: '인디케이터 색상' },
      },
      {
        key: 'trackColor',
        type: 'color',
        label: { en: 'Track Color', ko: '트랙 색상' },
      },
      {
        key: 'text',
        type: 'text',
        label: { en: 'Text', ko: '텍스트' },
        helperText: {
          en: 'Content displayed at the center of the spinner.',
          ko: '스피너 중앙에 표시할 텍스트입니다.',
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
      ko: '어떤 콘텐츠든 부드러운 블러 글래스 효과로 가려줍니다.',
    },
    component: () => import('@library/components/BlurOverlay.vue'),
    preview: () => import('@/demos/BlurOverlayDemo.vue'),
    controls: [
      {
        key: 'blurStrength',
        type: 'slider',
        label: { en: 'Blur Strength', ko: '블러 강도' },
        min: 0,
        max: 30,
        step: 1,
      },
      {
        key: 'backgroundColor',
        type: 'color',
        label: { en: 'Background Color', ko: '배경 색상' },
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
      en: 'Displays the loading spinner with optional text and description over blurred content.',
      ko: '블러 처리된 콘텐츠 위에 로딩 스피너와 선택적인 텍스트·설명을 표시합니다.',
    },
    component: () => import('@library/components/LoadingOverlay.vue'),
    preview: () => import('@/demos/LoadingOverlayDemo.vue'),
    controls: [
      {
        key: 'spinner.diameter',
        type: 'slider',
        label: { en: 'Diameter', ko: '지름' },
        group: spinnerControlGroup,
        min: 32,
        max: 160,
        step: 4,
      },
      {
        key: 'spinner.thickness',
        type: 'slider',
        label: { en: 'Ring Thickness', ko: '테두리 두께' },
        group: spinnerControlGroup,
        min: 2,
        max: 16,
        step: 1,
      },
      {
        key: 'spinner.textSize',
        type: 'slider',
        label: { en: 'Text Size', ko: '텍스트 크기' },
        group: spinnerControlGroup,
        min: 12,
        max: 64,
        step: 1,
      },
      {
        key: 'overlay.blurStrength',
        type: 'slider',
        label: { en: 'Blur Strength', ko: '블러 강도' },
        group: overlayControlGroup,
        min: 0,
        max: 30,
        step: 1,
      },
      {
        key: 'spinner.indicatorColor',
        type: 'color',
        label: { en: 'Indicator Color', ko: '인디케이터 색상' },
        group: spinnerControlGroup,
      },
      {
        key: 'spinner.trackColor',
        type: 'color',
        label: { en: 'Track Color', ko: '트랙 색상' },
        group: spinnerControlGroup,
      },
      {
        key: 'spinner.textColor',
        type: 'color',
        label: { en: 'Text Color', ko: '텍스트 색상' },
        group: spinnerControlGroup,
      },
      {
        key: 'overlay.backgroundColor',
        type: 'color',
        label: { en: 'Background Color', ko: '배경 색상' },
        group: overlayControlGroup,
      },
      {
        key: 'spinner.text',
        type: 'text',
        label: { en: 'Text', ko: '텍스트' },
        group: spinnerControlGroup,
        helperText: {
          en: 'Optional center text inside the spinner. Supports numbers or short phrases.',
          ko: '스피너 중앙에 표시할 선택적 텍스트입니다. 숫자나 짧은 문구를 사용할 수 있습니다.',
        },
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
    ],
  },
]

export const componentMap = new Map(componentCatalog.map((item) => [item.id, item]))

export const getComponentDefinition = (id: string) => componentMap.get(id)
