export type ControlType = 'text' | 'textarea' | 'number' | 'url';

export interface PropControl {
  name: string;
  labelKey: string;
  type: ControlType;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface LocalizedCopy {
  ko: string;
  en: string;
}

export interface ComponentPlaygroundConfig {
  defaultProps: Record<string, unknown>;
  controls: PropControl[];
}

export interface ComponentDefinition {
  slug: string;
  name: LocalizedCopy;
  tagline: LocalizedCopy;
  descriptionKey: string;
  tags: string[];
  component: () => Promise<any>;
  playground: ComponentPlaygroundConfig;
}

export const componentRegistry: ComponentDefinition[] = [
  {
    slug: 'deeplink-experience',
    name: {
      ko: '딥링크 경험',
      en: 'Deeplink Experience',
    },
    tagline: {
      ko: '모바일 딥링크 전환을 부드럽게 안내합니다',
      en: 'Guides seamless deeplink transitions across devices',
    },
    descriptionKey: 'deeplink.overview',
    tags: ['deeplink', 'mobile', 'qr', 'handoff'],
    component: () => import('../components/DeeplinkExperience.vue'),
    playground: {
      defaultProps: {
        appName: '카카오톡 송금',
        deeplinkUrl: 'kakaotalk://sendmoney/home',
        icon: 'https://static.kakaocdn.net/oneweb/static/oss/img/emoticon/icon_kakao.png',
        timeout: 1.5,
      },
      controls: [
        {
          name: 'appName',
          labelKey: 'deeplink.props.appName',
          type: 'text',
          placeholder: '카카오톡 송금',
        },
        {
          name: 'deeplinkUrl',
          labelKey: 'deeplink.props.deeplinkUrl',
          type: 'url',
          placeholder: 'kakaotalk://sendmoney/home',
        },
        {
          name: 'icon',
          labelKey: 'deeplink.props.icon',
          type: 'url',
          placeholder: 'https://example.com/icon.png',
        },
        {
          name: 'timeout',
          labelKey: 'deeplink.props.timeout',
          type: 'number',
          min: 0.5,
          max: 10,
          step: 0.5,
        },
      ],
    },
  },
];

export function getComponentDefinition(slug: string) {
  return componentRegistry.find((entry) => entry.slug === slug);
}
