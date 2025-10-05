<script lang="ts">
export const defaultProps = {
  text: '',
  size: 96,
  thickness: 8,
  textSize: 22,
  textColor: undefined as string | undefined,
  trackColor: 'color-mix(in srgb, var(--p-surface-400) 35%, transparent)',
  indicatorColor: 'var(--p-primary-color)',
} as const

export type props = {
  text?: string | number
  size?: number
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
    fontSize: `${props.textSize}px`,
    lineHeight: '1',
  }

  if (props.textColor) {
    style.color = props.textColor
  }

  return style
})

const dimensions = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
}))

const ringStyle = computed(() => ({
  borderWidth: `${props.thickness}px`,
  borderColor: props.trackColor,
  borderTopColor: props.indicatorColor,
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
      class="pointer-events-none absolute inset-0 flex items-center justify-center font-semibold text-surface-700 dark:text-surface-0"
      :style="textStyle"
      aria-hidden="true"
    >
      {{ displayText }}
    </div>
    <div class="h-full w-full animate-spin rounded-full border-solid border-current" :style="ringStyle" />
  </div>
</template>
