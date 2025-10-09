<script lang="ts">
import { defaultProps as overlayContainerDefaults } from '@library/components/OverlayContainer.vue'
import type { ComponentDemoConfig } from '@/demos/types'

export const demoConfig: ComponentDemoConfig = {
  defaultProps: overlayContainerDefaults,
  properties: [
    {
      key: 'overlay',
      type: 'boolean',
      label: { en: 'Enable Overlay', ko: '오버레이 사용' },
    },
    {
      key: 'backdropFilter',
      type: 'text',
      label: { en: 'Backdrop Filter', ko: '백드롭 필터' },
    },
  ],
}
</script>

<script setup lang="ts">
import { ElText } from 'element-plus'
import { OverlayContainer, type OverlayContainerProps } from '@library/components'

defineProps<OverlayContainerProps>()
</script>

<template>
  <OverlayContainer v-bind="$props">
    <div
      class="relative flex h-80 items-center justify-center overflow-hidden rounded-3xl border border-surface-200 bg-surface-0 p-10 text-center shadow-inner dark:border-surface-800 dark:bg-surface-900"
    >
      <img
        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80"
        alt="Developer workspace"
        class="absolute inset-0 size-full object-cover"
      />
    </div>
    <template #overlay>
      <div
        class="flex size-full items-center justify-center rounded-inherit bg-black/25 p-10 text-left text-white"
      >
        <div class="flex max-w-md flex-col gap-4">
          <ElText tag="span" class="font-semibold uppercase tracking-[0.4em]" size="small" type="primary">
            Focus Mode
          </ElText>
          <ElText tag="h2" size="large" class="font-semibold">
            Shipping polished experiences
          </ElText>
          <ElText tag="p" size="small">
            Blur surrounding distractions while presenting a focused call-to-action for your customers.
          </ElText>
        </div>
      </div>
    </template>
  </OverlayContainer>
</template>
