<script lang="ts">
import { defineComponent } from 'vue'
import { LiquidGlass as LiquidGlassBase } from 'liquid-glass-vue'

export const defaultProps = {} as Record<string, unknown>

export type props = {}

export default defineComponent({
  name: 'LiquidGlass',
  components: {
    LiquidGlassBase,
  },
})
</script>

<template>
  <LiquidGlassBase v-bind="$attrs">
    <slot />
  </LiquidGlassBase>
</template>
