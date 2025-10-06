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
  ],
}
</script>

<script setup lang="ts">
import { BlurOverlay, type BlurOverlayProps } from '@library/components'

defineProps<BlurOverlayProps>()
</script>

<template>
  <div class="relative isolate flex h-80 items-center justify-center overflow-hidden rounded-3xl border border-surface-200 bg-surface-0 p-10 text-center shadow-inner dark:border-surface-800 dark:bg-surface-900">
    <img
      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80"
      alt="Developer workspace"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <BlurOverlay v-bind="$props">
      <template #overlay>
        <div class="flex max-w-sm flex-col items-center gap-3 text-surface-0">
          <span class="text-xs font-semibold uppercase tracking-[0.4em] text-primary-300">Focus Mode</span>
          <h2 class="text-2xl font-semibold">Shipping polished experiences</h2>
          <p class="text-sm text-surface-0/80">
            Blur surrounding distractions while presenting a focused call-to-action for your customers.
          </p>
        </div>
      </template>
    </BlurOverlay>
  </div>
</template>
