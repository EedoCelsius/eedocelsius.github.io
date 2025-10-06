import type { LabDemoDefinition, CatalogComponent, LabComponentDefinition, ComponentLoader } from './types'

export type {
  LocaleCopy,
  PlaygroundPropValue,
  ControlDefinition,
  GroupDefinition,
  PropertyDefinition,
  ComponentLoader,
  CatalogComponent,
  LabDemoDefinition,
  LabComponentDefinition,
} from './types'

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

type DemoModule = {
  default: unknown
  labDefinition?: LabDemoDefinition
}

const toAsyncComponent = (component: unknown): ComponentLoader => async () => component

const demoModules = import.meta.glob('../demos/*Demo.vue', { eager: true }) as Record<string, DemoModule>

const demoDefinitions = new Map<string, LabDemoDefinition & { preview: ComponentLoader }>()

Object.entries(demoModules).forEach(([path, module]) => {
  const definition = module.labDefinition
  if (!definition) {
    throw new Error(`Demo module at "${path}" must export labDefinition`)
  }

  const previewLoader = definition.preview ?? toAsyncComponent(module.default)

  demoDefinitions.set(definition.id, {
    ...definition,
    preview: previewLoader,
  })
})

const componentDefinitions: LabComponentDefinition[] = componentCatalog.map((component) => {
  const demoDefinition = demoDefinitions.get(component.id)

  if (!demoDefinition) {
    throw new Error(`Missing demo definition for component id: ${component.id}`)
  }

  return {
    ...component,
    component: demoDefinition.component,
    preview: demoDefinition.preview,
    properties: demoDefinition.properties,
  }
})

const componentMap = new Map(componentDefinitions.map((definition) => [definition.id, definition] as const))

export const getComponentDefinition = (id: string) => componentMap.get(id)

export { componentDefinitions }
