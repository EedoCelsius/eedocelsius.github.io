<script lang="ts">
export const defaultProps = {} as Record<string, unknown>

export type props = Record<string, never>
</script>

<script setup lang="ts">
import { LiquidGlass as LiquidGlassBase } from 'liquid-glass-vue'

defineOptions({
  name: 'LiquidGlass',
})
</script>

<template>
  <LiquidGlassBase v-bind="$attrs">
    <slot />
  </LiquidGlassBase>
</template>
