export const componentGroups = [
  {
    key: 'engagement',
    label: 'Engagement Experiences',
    items: [
      {
        key: 'deeplink-experience',
        name: 'Deeplink Experience',
        description:
          '모바일과 데스크탑 환경에서 딥링크 호출을 처리하고, QR 코드와 설치 유도 다이얼로그를 제공하는 컴포넌트입니다.',
        component: () => import('../components/library/DeeplinkExperience.vue'),
        previewProps: {
          appname: '카카오톡 송금',
          deeplinkURL: 'kakaotalk://transfer',
          icon:
            'https://raw.githubusercontent.com/primefaces/primevue/main/apps/showcase/public/images/primevue-logo.svg',
          timeout: 1500,
        },
        controls: [
          {
            type: 'text',
            prop: 'appname',
            label: 'App Name',
            placeholder: '카카오톡 송금',
          },
          {
            type: 'text',
            prop: 'deeplinkURL',
            label: 'Deeplink URL',
            placeholder: 'kakaotalk://transfer',
          },
          {
            type: 'text',
            prop: 'icon',
            label: 'Icon URL',
            placeholder: 'https://.../icon.png',
          },
          {
            type: 'number',
            prop: 'timeout',
            label: 'Timeout (ms)',
            min: 500,
            step: 100,
          },
        ],
      },
    ],
  },
];

export function findComponentByKey(key) {
  for (const group of componentGroups) {
    const match = group.items.find((item) => item.key === key);
    if (match) {
      return match;
    }
  }
  return undefined;
}
