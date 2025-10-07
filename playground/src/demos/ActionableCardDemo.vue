<script lang="ts">
import { defaultProps as actionableCardDefaults } from '@library/components/ActionableCard.vue'
import type { ComponentDemoConfig } from '@/demos/types'

export const demoConfig: ComponentDemoConfig = {
  defaultProps: actionableCardDefaults,
  properties: [
    {
      key: 'cardClass',
      type: 'text',
      label: { en: 'Card classes', ko: '카드 클래스' },
      helperText: {
        en: 'Utility classes applied to the content area wrapper.',
        ko: '콘텐츠 영역 래퍼에 적용할 Tailwind 클래스입니다.',
      },
    },
    {
      key: 'actionClass',
      type: 'text',
      label: { en: 'Action classes', ko: '액션 클래스' },
      helperText: {
        en: 'Utility classes applied to the action slot wrapper.',
        ko: '액션 슬롯 래퍼에 적용할 Tailwind 클래스입니다.',
      },
    },
  ],
}
</script>

<script setup lang="ts">
import { ActionableCard, type ActionableCardProps } from '@library/components'

const props = defineProps<ActionableCardProps>()
</script>

<template>
  <div class="flex justify-center">
    <ActionableCard v-bind="props" class="max-w-2xl">
      <div class="flex items-start gap-4">
        <div class="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-2xl font-semibold text-amber-500">
          KB
        </div>
        <div class="space-y-3">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-lg font-semibold text-surface-900">KB국민</span>
            <span class="text-sm font-medium text-surface-500">강일준</span>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-lg font-semibold tracking-wide text-surface-900">93800200352361</span>
            <i class="pi pi-clipboard text-base text-primary-500" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <template #action>
        <span class="flex items-center gap-2 px-6 text-sm font-semibold">
          <span class="sm:hidden">이체 정보 복사</span>
          <i class="pi pi-clipboard text-lg" aria-hidden="true"></i>
          <span class="sr-only sm:not-sr-only sm:hidden">이체 정보 복사</span>
        </span>
      </template>
    </ActionableCard>
  </div>
</template>
