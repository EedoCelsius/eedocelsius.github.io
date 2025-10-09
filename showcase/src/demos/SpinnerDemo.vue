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
      key: 'indicatorColor',
      type: 'color',
      label: { en: 'Indicator Color', ko: '인디케이터 색상' },
    },
    {
      key: 'trackColor',
      type: 'color',
      label: { en: 'Track Color', ko: '트랙 색상' },
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
