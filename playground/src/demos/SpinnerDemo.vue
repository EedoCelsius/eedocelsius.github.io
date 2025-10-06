<script lang="ts">
import type { PlaygroundDemoConfig } from '@/library/types'

export const playgroundDemo: PlaygroundDemoConfig = {
  component: () => import('@library/components/Spinner.vue'),
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
  <div class="grid gap-6 rounded-3xl bg-surface-0 p-8 text-surface-800 shadow-soft dark:bg-surface-900 dark:text-surface-0">
    <div class="flex flex-col items-center gap-4 text-center">
      <Spinner v-bind="$props" />
      <p class="text-sm text-surface-600 dark:text-surface-300">
        Tune the animated spinner to match your loading experience.
      </p>
    </div>
  </div>
</template>
