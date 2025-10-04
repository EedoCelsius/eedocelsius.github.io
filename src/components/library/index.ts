export { default as DeeplinkExperience } from './DeeplinkExperience.vue';

export interface ComponentMetadata {
  name: string;
  slug: string;
  description: string;
  i18nKey: string;
  previewProps: Record<string, unknown>;
  component: () => Promise<unknown>;
}

export const componentCatalog: ComponentMetadata[] = [
  {
    name: 'DeeplinkExperience',
    slug: 'deeplink-experience',
    description:
      'Adaptive deeplink workflow that handles desktop QR fallback, mobile loading states, and installation prompts.',
    i18nKey: 'deeplink',
    previewProps: {
      appName: '카카오송금',
      deeplinkUrl: 'kakaotalk://sendmoney',
      icon: 'https://static.kakaocdn.net/hubble/alimtalk/talk-icon.png',
      timeout: 1500
    },
    component: () => import('./DeeplinkExperience.vue')
  }
];
