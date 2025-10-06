<script lang="ts">
import { defaultProps as actionableCardDefaults } from '@library/components/ActionableCard.vue'
import type { ComponentDemoConfig } from '@/demos/types'

export const demoConfig: ComponentDemoConfig = {
  defaultProps: actionableCardDefaults,
  properties: [
    {
      key: 'orientation',
      type: 'select',
      label: { en: 'Orientation', ko: '배치 방향' },
      options: [
        { value: 'auto', label: { en: 'Auto', ko: '자동' } },
        { value: 'horizontal', label: { en: 'Horizontal', ko: '가로' } },
        { value: 'vertical', label: { en: 'Vertical', ko: '세로' } },
      ],
      helperText: {
        en: 'Switch between horizontal, vertical, or automatic layout.',
        ko: '가로/세로 또는 자동 레이아웃을 선택하세요.',
      },
    },
    {
      key: 'breakpoint',
      type: 'slider',
      label: { en: 'Auto Breakpoint', ko: '자동 전환 너비' },
      min: 320,
      max: 960,
      step: 10,
      helperText: {
        en: 'When orientation is auto, the layout becomes vertical below this width (px).',
        ko: '방향이 자동일 때 이 너비(px) 이하에서 세로 레이아웃으로 전환됩니다.',
      },
    },
  ],
}
</script>

<script setup lang="ts">
import { ActionableCard, type ActionableCardProps } from '@library/components'

defineProps<ActionableCardProps>()
</script>

<template>
  <ActionableCard v-bind="$props">
    <div class="flex items-start gap-4">
      <div class="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-xl font-semibold text-amber-500">
        KB
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex flex-wrap items-baseline gap-x-2">
          <span class="text-lg font-semibold text-surface-900 dark:text-surface-50">KB국민</span>
          <span class="text-sm font-medium text-surface-500 dark:text-surface-400">강인준</span>
        </div>
        <div class="flex items-center gap-2 text-base font-medium text-primary-600 dark:text-primary-300">
          <span class="tracking-wide">9380020052361</span>
          <button
            type="button"
            class="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-500 transition hover:text-primary-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy
          </button>
        </div>
        <p class="text-sm text-surface-500 dark:text-surface-400">
          이 계좌로 입금되는 금액을 확인하고 바로 공유하세요.
        </p>
      </div>
    </div>
    <template #action>
      <button
        type="button"
        class="group inline-flex items-center gap-3 rounded-full bg-transparent px-4 py-2 text-base font-semibold text-white transition-colors hover:text-primary-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="h-6 w-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8 3h8a2 2 0 0 1 2 2v2H6V5a2 2 0 0 1 2-2Zm10 6H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9Zm-6 4v4"
          />
          <path stroke-linecap="round" d="M9.5 13.5h5" />
        </svg>
        이체 정보 복사
      </button>
    </template>
  </ActionableCard>
</template>
