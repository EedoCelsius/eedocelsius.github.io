<script lang="ts">
import { defaultProps as spinnerDefaults } from '@library/components/Spinner.vue'
import type { ComponentDemoConfig } from '@/demos/types'

export const demoConfig: ComponentDemoConfig = {
  defaultProps: spinnerDefaults,
  properties: [
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
}
</script>

<script setup lang="ts">
import { Spinner, type SpinnerProps } from '@library/components'

defineProps<SpinnerProps>()
</script>

<template>
  <div class="flex justify-center">
    <Spinner v-bind="$props" />
  </div>
</template>
