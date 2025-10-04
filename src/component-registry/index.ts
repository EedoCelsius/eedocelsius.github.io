import type { LibraryComponentDefinition } from './types'

export const libraryComponents: LibraryComponentDefinition[] = [
  {
    slug: 'deeplink-experience',
    i18nKey: 'components.deeplinkExperience',
    tags: ['mobile', 'qr'],
    component: () => import('@/components/library/deeplink/DeeplinkExperience.vue'),
    playground: () => import('@/components/playgrounds/DeeplinkExperiencePlayground.vue'),
    defaultProps: {
      appName: '카카오송금',
      deeplinkUrl: 'kakaotalk://bizmsg?url=https%3A%2F%2Fkakaopay.com',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/3/36/KakaoTalk_logo.svg',
      timeout: 1.5,
    },
    previewHeight: 420,
  },
]

export const libraryComponentMap = new Map(
  libraryComponents.map((component) => [component.slug, component] as const),
)

export const getComponentDefinition = (slug: string) => libraryComponentMap.get(slug)
