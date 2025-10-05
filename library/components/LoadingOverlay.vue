<script lang="ts">
export const defaultProps = {
  spinnerDiameter: 48,
  spinnerThickness: 4,
} as const

export type props = {
  blurStrength?: number
  overlayColor?: string
  spinnerDiameter?: number
  spinnerThickness?: number
  spinnerTrackColor?: string
  spinnerIndicatorColor?: string
  spinnerText?: string | number
  spinnerTextSize?: number
  spinnerTextColor?: string
  description?: string
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import BlurOverlay from './BlurOverlay.vue'
import Spinner from './Spinner.vue'

const props = withDefaults(
  defineProps<props>(),
  defaultProps
)

const hasDescription = computed(() => Boolean(props.description?.trim()))
</script>

<template>
  <div class="relative isolate">
    <slot />
    <BlurOverlay :blur-strength="props.blurStrength" :overlay-color="props.overlayColor">
      <template #overlay>
        <div class="flex flex-col items-center gap-4 text-center text-surface-0" aria-live="polite">
          <Spinner
            :diameter="props.spinnerDiameter"
            :thickness="props.spinnerThickness"
            :track-color="props.spinnerTrackColor"
            :indicator-color="props.spinnerIndicatorColor"
            :text="props.spinnerText"
            :text-size="props.spinnerTextSize"
            :text-color="props.spinnerTextColor"
          />
          <p v-if="hasDescription" class="max-w-xs text-sm text-surface-0/80">{{ props.description }}</p>
        </div>
      </template>
    </BlurOverlay>
  </div>
</template>
