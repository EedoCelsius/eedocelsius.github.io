<script lang="ts">
export const loadingOverlayDefaultProps = {
  visible: false,
  blur: 7,
  description: '',
  overlayColor: 'color-mix(in srgb, var(--p-surface-900) 55%, transparent)',
  spinnerSize: 48,
  spinnerThickness: 4,
  spinnerTrackColor: 'color-mix(in srgb, var(--p-surface-0) 25%, transparent)',
  spinnerIndicatorColor: 'var(--p-primary-contrast-color)',
  spinnerText: '',
} as const
</script>

<script setup lang="ts">
import { computed } from 'vue'
import BlurOverlay from './BlurOverlay.vue'
import Spinner from './Spinner.vue'

const props = withDefaults(
  defineProps<{
    visible?: boolean
    blur?: number
    description?: string
    overlayColor?: string
    spinnerSize?: number
    spinnerThickness?: number
    spinnerTrackColor?: string
    spinnerIndicatorColor?: string
    spinnerText?: string | number
  }>(),
  loadingOverlayDefaultProps
)

const hasDescription = computed(() => Boolean(props.description?.trim()))
</script>

<template>
  <BlurOverlay :visible="props.visible" :blur="props.blur" :overlay-color="props.overlayColor">
    <template #default>
      <slot />
    </template>
    <template #overlay>
      <div class="flex flex-col items-center gap-4 text-center text-surface-0" aria-live="polite">
        <Spinner
          :size="props.spinnerSize"
          :thickness="props.spinnerThickness"
          :track-color="props.spinnerTrackColor"
          :indicator-color="props.spinnerIndicatorColor"
          :text="props.spinnerText"
          :text-size="18"
        />
        <p v-if="hasDescription" class="max-w-xs text-sm text-surface-0/80">{{ props.description }}</p>
      </div>
    </template>
  </BlurOverlay>
</template>
