<script lang="ts">
import { defaultProps as actionableCardDefaults } from '@library/components/ActionableCard.vue'
import type { ComponentDemoConfig } from '@/demos/types'

export const demoConfig: ComponentDemoConfig = {
  defaultProps: actionableCardDefaults,
  properties: [
    {
      key: 'actionLabel',
      type: 'text',
      label: { en: 'Action aria-label', ko: '액션 ARIA 레이블' },
      helperText: {
        en: 'Useful when the action content is icon-only on wide layouts.',
        ko: '와이드 레이아웃에서 아이콘만 표시할 때 사용하면 좋아요.',
      },
    },
    {
      key: 'disabled',
      type: 'boolean',
      label: { en: 'Disabled', ko: '비활성화' },
    },
    {
      key: 'actionType',
      type: 'text',
      label: { en: 'Button type', ko: '버튼 타입' },
      helperText: {
        en: 'button, submit, or reset',
        ko: 'button, submit, reset 중 하나',
      },
    },
  ],
}
</script>

<script setup lang="ts">
import { ActionableCard, type ActionableCardProps } from '@library/components'

const account = {
  bank: 'KB국민',
  owner: '강일준',
  number: '93800200532361',
}

const emitCopy = () => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(account.number).catch(() => {})
  }
}

defineProps<ActionableCardProps>()
</script>

<template>
  <div class="max-w-xl">
    <ActionableCard
      v-bind="$props"
      class="backdrop-blur-sm bg-white/95 shadow-lg ring-1 ring-slate-200/70"
      @action="emitCopy"
    >
      <div class="flex items-center gap-4">
        <span
          class="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-xl font-semibold text-amber-500"
        >
          KB
        </span>
        <div class="flex flex-col gap-1 text-slate-700">
          <p class="text-base font-semibold text-slate-900">
            {{ account.bank }}
            <span class="ml-2 text-sm font-medium text-slate-500">{{ account.owner }}</span>
          </p>
          <button
            type="button"
            class="group/number flex w-fit items-center gap-2 text-sm font-semibold text-slate-700 underline decoration-1 underline-offset-4"
            @click="emitCopy"
          >
            <span class="tabular-nums tracking-wide">{{ account.number }}</span>
            <svg
              class="h-4 w-4 text-slate-500 transition group-hover/number:text-slate-700"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9 9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5 15V6a2 2 0 0 1 2-2h7"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <template #action>
        <span class="flex items-center gap-2 sm:hidden">
          <span class="font-semibold text-white">이체 정보 복사</span>
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M9 9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5 15V6a2 2 0 0 1 2-2h7"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <svg class="hidden h-6 w-6 sm:block" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M9 9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5 15V6a2 2 0 0 1 2-2h7"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </template>
    </ActionableCard>
  </div>
</template>
