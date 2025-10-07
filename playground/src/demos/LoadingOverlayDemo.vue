<script lang="ts">
import { defaultProps as loadingOverlayDefaults } from '@library/components/LoadingOverlay.vue'
import type { ComponentDemoConfig } from '@/demos/types'

export const demoConfig: ComponentDemoConfig = {
  defaultProps: loadingOverlayDefaults,
  properties: [
    {
      id: 'spinner',
      label: { en: 'Spinner', ko: '스피너' },
      controls: [
        {
          key: 'spinner.diameter',
          type: 'slider',
          label: { en: 'Diameter', ko: '지름' },
          min: 32,
          max: 160,
          step: 4,
        },
        {
          key: 'spinner.thickness',
          type: 'slider',
          label: { en: 'Ring Thickness', ko: '테두리 두께' },
          min: 2,
          max: 16,
          step: 1,
        },
        {
          key: 'spinner.indicatorColor',
          type: 'color',
          label: { en: 'Indicator Color', ko: '인디케이터 색상' },
        },
        {
          key: 'spinner.trackColor',
          type: 'color',
          label: { en: 'Track Color', ko: '트랙 색상' },
        },
      ],
    },
    {
      id: 'overlay',
      label: { en: 'Overlay', ko: '오버레이' },
      controls: [
        {
          key: 'overlay.blurStrength',
          type: 'slider',
          label: { en: 'Blur Strength', ko: '블러 강도' },
          min: 0,
          max: 30,
          step: 1,
        },
        {
          key: 'overlay.backgroundColor',
          type: 'color',
          label: { en: 'Background Color', ko: '배경 색상' },
        },
      ],
    },
  ],
}
</script>

<script setup lang="ts">
import { LoadingOverlay, type LoadingOverlayProps } from '@library/components'

defineProps<LoadingOverlayProps>()
</script>

<template>
  <div class="h-80 overflow-hidden rounded-3xl border border-surface-200 bg-surface-0 shadow-inner dark:border-surface-800 dark:bg-surface-900">
    <img
      src="https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1000&q=80"
      alt="Project dashboard"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <LoadingOverlay v-bind="$props" />
  </div>
</template>
