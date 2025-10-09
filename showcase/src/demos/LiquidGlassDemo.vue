<script lang="ts">
import { defaultProps as liquidGlassDefaults } from '@library/components/LiquidGlass.vue'
import type { ComponentDemoConfig } from '@/demos/types'

export const demoConfig: ComponentDemoConfig = {
  defaultProps: liquidGlassDefaults,
  properties: [],
}
</script>

<script setup lang="ts">
import { LiquidGlass, type LiquidGlassProps } from '@library/components'

defineProps<LiquidGlassProps>()
</script>

<template>
  <LiquidGlass v-bind="$props">
    <div class="space-y-2 rounded-xl bg-white/10 p-6 text-white">
      <h2 class="text-lg font-semibold">Your content here</h2>
      <p class="text-sm text-white/80">This will have the liquid glass effect</p>
    </div>
  </LiquidGlass>
</template>
