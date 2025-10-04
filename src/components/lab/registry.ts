import type { Component } from 'vue';

export type ControlType = 'text' | 'number' | 'textarea' | 'image';

export interface PropControl {
  key: string;
  label: {
    en: string;
    ko: string;
  };
  type: ControlType;
  default: string | number;
  helper?: {
    en: string;
    ko: string;
  };
  min?: number;
  max?: number;
}

export interface LabComponentDefinition {
  id: string;
  name: {
    en: string;
    ko: string;
  };
  description: {
    en: string;
    ko: string;
  };
  component: () => Promise<{ default: Component }>;
  props: PropControl[];
  usage: string;
}

export const components: LabComponentDefinition[] = [
  {
    id: 'deeplink-experience',
    name: {
      en: 'Deeplink Experience',
      ko: '딥링크 경험'
    },
    description: {
      en: 'Handle deeplink launches gracefully across desktop and mobile contexts.',
      ko: '데스크톱과 모바일 환경에서 딥링크 실행 경험을 자연스럽게 처리합니다.'
    },
    component: () => import('../playground/DeeplinkExperienceDemo.vue'),
    props: [
      {
        key: 'appName',
        label: { en: 'App name', ko: '앱 이름' },
        type: 'text',
        default: 'KakaoPay',
        helper: {
          en: 'Shown inside dialogs and descriptions.',
          ko: '다이얼로그와 설명에 표시되는 이름입니다.'
        }
      },
      {
        key: 'deeplinkUrl',
        label: { en: 'Deeplink URL', ko: '딥링크 URL' },
        type: 'text',
        default: 'kakaopay://pay/transfer',
        helper: {
          en: 'The deeplink to launch when the trigger is called.',
          ko: 'trigger 실행 시 열릴 딥링크 주소입니다.'
        }
      },
      {
        key: 'icon',
        label: { en: 'Icon URL', ko: '아이콘 URL' },
        type: 'image',
        default: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/KakaoTalk_logo.svg',
        helper: {
          en: 'Displayed inside the QR code and mobile dialogs.',
          ko: 'QR 코드와 모바일 다이얼로그에 표시됩니다.'
        }
      },
      {
        key: 'timeout',
        label: { en: 'Timeout (seconds)', ko: '타임아웃 (초)' },
        type: 'number',
        default: 1.5,
        min: 0.5,
        max: 10,
        helper: {
          en: 'After this time the install dialog is shown on mobile.',
          ko: '이 시간이 지나면 모바일에서 설치 안내가 표시됩니다.'
        }
      }
    ],
    usage: `\
<template>\n  <DeeplinkExperience\n    ref=\"deeplink\"\n    :app-name=\"'KakaoPay'\"\n    :deeplink-url=\"'kakaopay://pay/transfer'\"\n    :icon=\"icon\"\n    :timeout=\"1.5\"\n  />\n  <Button label=\"Launch\" @click=\"deeplink?.trigger()\" />\n</template>\n` }
];

export const componentMap = new Map(components.map((entry) => [entry.id, entry]));
