<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    text?: string | number
    size?: number
    thickness?: number
    textSize?: number
    trackColor?: string
    indicatorColor?: string
  }>(),
  {
    text: '',
    size: 96,
    thickness: 8,
    textSize: 22,
    trackColor: 'rgba(148, 163, 184, 0.35)',
    indicatorColor: '#6366f1',
  }
)

const displayText = computed(() => `${props.text ?? ''}`)
const trimmedText = computed(() => displayText.value.trim())
const hasText = computed(() => trimmedText.value.length > 0)

const textStyle = computed(() => ({
  fontSize: `${props.textSize}px`,
  lineHeight: '1',
}))

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
      class="pointer-events-none absolute inset-0 flex items-center justify-center font-semibold text-slate-700 dark:text-slate-100"
      :style="textStyle"
      aria-hidden="true"
    >
      {{ displayText }}
    </div>
    <div class="h-full w-full animate-spin rounded-full border-solid border-current" :style="ringStyle" />
  </div>
</template>
