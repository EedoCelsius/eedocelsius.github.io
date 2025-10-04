<script setup lang="ts">
import { computed } from 'vue'

type AriaLive = 'polite' | 'assertive' | 'off'

const props = withDefaults(
  defineProps<{
    size?: number
    thickness?: number
    trackColor?: string
    indicatorColor?: string
    label?: string
    ariaLive?: AriaLive
  }>(),
  {
    size: 48,
    thickness: 4,
    trackColor: 'rgba(148, 163, 184, 0.35)',
    indicatorColor: '#6366f1',
    label: '',
    ariaLive: 'polite' as AriaLive,
  }
)

const dimensions = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
}))

const ringStyle = computed(() => ({
  borderWidth: `${props.thickness}px`,
  borderColor: props.trackColor,
  borderTopColor: props.indicatorColor,
}))

const accessibleLabel = computed(() => props.label?.trim() || undefined)
const liveRegionRole = computed(() => (accessibleLabel.value ? 'status' : undefined))
const ariaLive = computed(() => (accessibleLabel.value ? props.ariaLive : undefined))
const isHiddenFromScreenReaders = computed(() => (!accessibleLabel.value ? true : undefined))
</script>

<template>
  <div
    class="relative inline-flex items-center justify-center"
    :style="dimensions"
    :role="liveRegionRole"
    :aria-label="accessibleLabel"
    :aria-live="ariaLive"
    :aria-hidden="isHiddenFromScreenReaders"
  >
    <div
      v-if="$slots.default"
      class="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <slot />
    </div>
    <div class="h-full w-full animate-spin rounded-full border-solid border-current" :style="ringStyle" />
  </div>
</template>
