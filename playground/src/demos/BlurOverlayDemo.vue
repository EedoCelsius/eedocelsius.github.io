<script lang="ts">
import { defaultProps as blurOverlayDefaults } from '@library/components/BlurOverlay.vue'
import type { ComponentDemoConfig } from '@/demos/types'

export const demoConfig: ComponentDemoConfig = {
  defaultProps: blurOverlayDefaults,
  properties: [
    {
      key: 'blurStrength',
      type: 'slider',
      label: { en: 'Blur Strength', ko: '블러 강도' },
      min: 0,
      max: 30,
      step: 1,
    },
    {
      key: 'backgroundColor',
      type: 'color',
      label: { en: 'Background Color', ko: '배경 색상' },
    },
    {
      key: 'centerVertical',
      type: 'boolean',
      label: { en: 'Center Vertically', ko: '세로 중앙 정렬' },
    },
    {
      key: 'centerHorizontal',
      type: 'boolean',
      label: { en: 'Center Horizontally', ko: '가로 중앙 정렬' },
    },
  ],
}
</script>

<script setup lang="ts">
import { ElText } from 'element-plus'
import { BlurOverlay, type BlurOverlayProps } from '@library/components'

defineProps<BlurOverlayProps>()
</script>

<template>
  <div class="relative flex h-80 items-center justify-center overflow-hidden rounded-3xl border border-surface-200 bg-surface-0 p-10 text-center shadow-inner dark:border-surface-800 dark:bg-surface-900">
    <img
      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80"
      alt="Developer workspace"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <BlurOverlay v-bind="$props">
      <div class="flex flex-col gap-4">
        <ElText
          tag="span"
          class="font-semibold uppercase tracking-[0.4em]"
          size="small"
          type="primary"
        >
          Focus Mode
        </ElText>
        <ElText tag="h2" size="large" class="font-semibold">
          Shipping polished experiences
        </ElText>
        <ElText tag="p" size="small">
          Blur surrounding distractions while presenting a focused call-to-action for your customers.
        </ElText>
      </div>
    </BlurOverlay>
  </div>
</template>
