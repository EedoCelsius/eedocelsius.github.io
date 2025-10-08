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
import { ElText } from 'element-plus'
import { ActionableCard, type ActionableCardProps } from '@library/components'

const props = defineProps<ActionableCardProps>()
</script>

<template>
  <div class="flex justify-center">
    <ActionableCard v-bind="props" class="max-w-2xl">
      <div class="flex items-start gap-4">
        <div class="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-2xl font-semibold text-amber-500">
          <ElText tag="span" class="font-semibold">KB</ElText>
        </div>
        <div class="space-y-3">
          <div class="flex flex-wrap items-center gap-2">
            <ElText tag="span" size="large" class="font-semibold">KB국민</ElText>
            <ElText tag="span" size="small" class="font-medium" type="info">강일준</ElText>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <ElText tag="span" size="large" class="font-semibold tracking-wide">93800200352361</ElText>
            <i class="pi pi-clipboard text-base text-primary-500" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <template #action>
        <ElText tag="span" size="small" class="flex items-center gap-2 px-6 font-semibold">
          <ElText tag="span" size="small" class="sm:hidden">이체 정보 복사</ElText>
          <i class="pi pi-clipboard text-lg" aria-hidden="true"></i>
          <ElText tag="span" size="small" class="sr-only sm:not-sr-only sm:hidden">이체 정보 복사</ElText>
        </ElText>
      </template>
    </ActionableCard>
  </div>
</template>
