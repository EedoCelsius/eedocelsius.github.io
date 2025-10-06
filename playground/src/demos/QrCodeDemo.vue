<script lang="ts">
import type { PlaygroundDemoConfig } from '@/library/types'

export const playgroundDemo: PlaygroundDemoConfig = {
  component: () => import('@library/components/QrCode.vue'),
  properties: [
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
}
</script>

<script setup lang="ts">
import { QrCode, type QrCodeProps } from '@library/components'

defineProps<QrCodeProps>()
</script>

<template>
  <div class="flex justify-center">
    <QrCode v-bind="$props" class="w-64 h-64" />
  </div>
</template>
