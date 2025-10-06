<script lang="ts">
import type { PlaygroundDemoConfig } from '@/library/types'

export const playgroundDemo: PlaygroundDemoConfig = {
  component: () => import('@library/components/LoadingOverlay.vue'),
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
  <LoadingOverlay v-bind="$props" class="block overflow-hidden rounded-3xl shadow-soft">
    <div class="grid h-64 w-full gap-6 bg-surface-0 p-8 text-surface-800 dark:bg-surface-900 dark:text-surface-0 md:grid-cols-2">
      <section class="flex flex-col justify-between rounded-2xl border border-surface-200/70 bg-surface-50/70 p-5 dark:border-surface-800/70 dark:bg-surface-800/50">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.4em] text-primary-500">Sprint focus</p>
          <h3 class="mt-3 text-2xl font-semibold">Dashboard revamp</h3>
        </div>
        <p class="text-sm text-surface-600 dark:text-surface-300">
          Current iteration tackles responsive layouts and loading experiences for the analytics hub.
        </p>
      </section>
      <section class="flex flex-col justify-between rounded-2xl border border-surface-200/70 bg-surface-50/70 p-5 dark:border-surface-800/70 dark:bg-surface-800/50">
        <div class="flex items-center justify-between text-sm font-medium">
          <span>Wireframes</span>
          <span class="text-primary-500">100%</span>
        </div>
        <div class="flex items-center justify-between text-sm font-medium">
          <span>API integration</span>
          <span class="text-primary-500">70%</span>
        </div>
        <div class="flex items-center justify-between text-sm font-medium">
          <span>QA checklist</span>
          <span class="text-primary-500">45%</span>
        </div>
      </section>
    </div>
  </LoadingOverlay>
</template>
