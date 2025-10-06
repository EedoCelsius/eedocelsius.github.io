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
          key: 'spinner.textSize',
          type: 'slider',
          label: { en: 'Text Size', ko: '텍스트 크기' },
          min: 12,
          max: 64,
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
        {
          key: 'spinner.textColor',
          type: 'color',
          label: { en: 'Text Color', ko: '텍스트 색상' },
        },
        {
          key: 'spinner.text',
          type: 'text',
          label: { en: 'Text', ko: '텍스트' },
          helperText: {
            en: 'Optional center text inside the spinner. Supports numbers or short phrases.',
            ko: '스피너 중앙에 표시할 선택적 텍스트입니다. 숫자나 짧은 문구를 사용할 수 있습니다.',
          },
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
    {
      key: 'description',
      type: 'text',
      label: { en: 'Description', ko: '설명' },
      helperText: {
        en: 'Text shown under the spinner. Leave empty to hide.',
        ko: '스피너 아래에 표시되는 문구입니다. 비워두면 숨겨집니다.',
      },
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
      class="inset-0 object-cover"
    />
    <LoadingOverlay v-bind="$props" />
  </div>
</template>
