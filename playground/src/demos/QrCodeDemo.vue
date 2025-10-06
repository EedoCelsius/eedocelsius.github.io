<script lang="ts">
import { defaultProps as qrCodeDefaults } from '@library/components/QrCode.vue'
import type { ComponentDemoConfig } from '@/demos/types'

export const demoConfig: ComponentDemoConfig = {
  defaultProps: qrCodeDefaults,
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
      key: 'data',
      type: 'textarea',
      label: { en: 'Data', ko: '데이터' },
      helperText: {
        en: 'Text or URL that will be encoded inside the QR code.',
        ko: 'QR 코드에 담을 텍스트 또는 URL을 입력하세요.',
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
    <QrCode v-bind="$props" class="w-64 h-64">test</QrCode>
  </div>
</template>
