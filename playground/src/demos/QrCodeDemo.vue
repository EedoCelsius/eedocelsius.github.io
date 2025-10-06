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

const props = defineProps<QrCodeProps & { icon?: string }>()
</script>

<template>
  <div class="flex justify-center">
    <QrCode
      :data="props.data"
      :light-color="props.lightColor"
      :dark-color="props.darkColor"
      class="h-64 w-64"
    >
      <img
        v-if="props.icon"
        :src="props.icon"
        alt="QR code center icon"
        class="h-full w-full rounded-xl object-cover"
      />
      <span v-else class="text-base font-medium text-surface-900">QR</span>
    </QrCode>
  </div>
</template>
