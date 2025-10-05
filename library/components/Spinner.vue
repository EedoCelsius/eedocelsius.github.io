<script lang="ts">
export const defaultProps = {
  diameter: 96,
  thickness: 8,
} as const

export type props = {
  text?: string | number
  diameter?: number
  thickness?: number
  textSize?: number
  textColor?: string
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

const displayText = computed(() => `${props.text ?? ''}`)
const trimmedText = computed(() => displayText.value.trim())
const hasText = computed(() => trimmedText.value.length > 0)

const textStyle = computed(() => {
  const style: Record<string, string> = {
    lineHeight: '1',
  }

  if (typeof props.textSize === 'number') {
    style.fontSize = `${props.textSize}px`
  }

  if (props.textColor) {
    style.color = props.textColor
  }

  return style
})

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

const accessibleLabel = computed(() => (trimmedText.value ? trimmedText.value : undefined))
const ariaLive = computed(() => (accessibleLabel.value ? 'polite' : undefined))
const ariaHidden = computed(() => (!accessibleLabel.value ? true : undefined))
const liveRegionRole = computed(() => (accessibleLabel.value ? 'status' : undefined))
</script>

<template>
  <div
    class="relative inline-flex items-center justify-center"
    :style="dimensions"
    :role="liveRegionRole"
    :aria-label="accessibleLabel"
    :aria-live="ariaLive"
    :aria-hidden="ariaHidden"
  >
    <div
      v-if="hasText"
      class="pointer-events-none absolute inset-0 flex items-center justify-center font-semibold text-current"
      :style="textStyle"
      aria-hidden="true"
    >
      {{ displayText }}
    </div>
    <div class="h-full w-full animate-spin rounded-full border-solid border-current" :style="ringStyle" />
  </div>
</template>
