<script lang="ts">
export const defaultProps = {
  diameter: 96,
  thickness: 8,
} as const

export type props = {
  diameter?: number
  thickness?: number
  trackColor?: string
  indicatorColor?: string
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<props>(),
  defaultProps
)

const dimensions = computed(() => ({
  width: `${props.diameter}px`,
  height: `${props.diameter}px`,
}))

const fallbackTrackColor = 'color-mix(in srgb, currentColor 35%, transparent)'

const ringStyle = computed(() => ({
  borderWidth: `${props.thickness}px`,
  borderColor: props.trackColor ?? fallbackTrackColor,
  borderTopColor: props.indicatorColor ?? 'currentColor',
}))
</script>

<template>
  <div
    class="relative inline-flex items-center justify-center"
    :style="dimensions"
    aria-hidden="true"
  >
    <div class="h-full w-full animate-spin rounded-full border-solid border-current" :style="ringStyle" />
  </div>
</template>
