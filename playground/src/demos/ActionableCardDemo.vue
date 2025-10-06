<script lang="ts">
import { defaultProps as actionableCardDefaults } from '@library/components/ActionableCard.vue'
import type { ComponentDemoConfig } from '@/demos/types'

export const demoConfig: ComponentDemoConfig = {
  defaultProps: actionableCardDefaults,
  properties: [
    {
      id: 'layout',
      label: { en: 'Layout', ko: '레이아웃' },
      controls: [
        {
          key: 'orientation',
          type: 'text',
          label: { en: 'Orientation', ko: '방향' },
          helperText: {
            en: "Use 'vertical', 'horizontal', or 'auto'.",
            ko: "vertical, horizontal, auto 중 하나를 입력하세요.",
          },
        },
        {
          key: 'minHorizontalWidth',
          type: 'slider',
          label: { en: 'Auto Switch Width', ko: '자동 전환 너비' },
          min: 320,
          max: 960,
          step: 20,
        },
      ],
    },
  ],
}
</script>

<script setup lang="ts">
import { ActionableCard, type ActionableCardProps } from '@library/components'

defineProps<ActionableCardProps>()
</script>

<template>
  <div class="mx-auto flex max-w-3xl flex-col gap-6">
    <ActionableCard v-bind="$props">
      <div class="flex flex-col gap-6">
        <header class="flex items-center gap-4">
          <div class="grid h-16 w-16 place-items-center rounded-full bg-[#fff5d6] text-3xl font-semibold text-[#f5a300]">
            KB
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-surface-500 dark:text-surface-300">
              <span class="text-lg font-semibold text-surface-900 dark:text-surface-0">KB국민</span>
              <span class="text-sm font-medium">강인준</span>
            </div>
            <div class="flex flex-wrap items-center gap-2 text-sm font-medium text-primary-500">
              <span class="text-lg tracking-[0.08em]">93800200352361</span>
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-full border border-primary-100 px-3 py-1 text-xs font-semibold text-primary-500 transition hover:border-primary-200 hover:text-primary-400 dark:border-primary-400/30 dark:text-primary-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="h-4 w-4">
                  <rect x="9" y="9" width="11" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                복사
              </button>
            </div>
          </div>
        </header>
        <p class="text-sm leading-relaxed text-surface-500 dark:text-surface-300">
          간편 송금 계좌 정보입니다. 자동 전환 모드를 사용하면 가로 폭에 따라 카드 레이아웃이 자연스럽게 바뀝니다.
        </p>
      </div>
      <template #action>
        <button
          type="button"
          class="flex w-full items-center justify-center gap-2 rounded-none text-base font-semibold tracking-tight text-surface-0"
        >
          이체 정보 복사
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-5 w-5">
            <path d="M8 17h8" stroke-linecap="round" />
            <path d="M12 3v14" stroke-linecap="round" />
            <rect x="4" y="3" width="16" height="18" rx="4" ry="4" />
          </svg>
        </button>
      </template>
    </ActionableCard>
  </div>
</template>
