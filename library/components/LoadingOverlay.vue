<script lang="ts">
export const defaultProps = {
  overlay: {},
  spinner: {
    diameter: 48,
    thickness: 4,
  },
} as const

export type props = {
  overlay?: {
    blurStrength?: number
    backgroundColor?: string
  }
  spinner?: {
    text?: string | number
    diameter?: number
    thickness?: number
    textSize?: number
    textColor?: string
    trackColor?: string
    indicatorColor?: string
  }
  description?: string
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import BlurOverlay from './BlurOverlay.vue'
import Spinner from './Spinner.vue'

const props = withDefaults(defineProps<props>(), {
  overlay: () => ({ ...defaultProps.overlay }),
  spinner: () => ({ ...defaultProps.spinner }),
})

const hasDescription = computed(() => Boolean(props.description?.trim()))
</script>

<template>
  <BlurOverlay :blur-strength="props.overlay.blurStrength" :background-color="props.overlay.backgroundColor">
    <div class="flex flex-col items-center gap-4 text-center text-surface-0" aria-live="polite">
      <Spinner
        :diameter="props.spinner.diameter"
        :thickness="props.spinner.thickness"
        :track-color="props.spinner.trackColor"
        :indicator-color="props.spinner.indicatorColor"
        :text="props.spinner.text"
        :text-size="props.spinner.textSize"
        :text-color="props.spinner.textColor"
      />
      <p v-if="hasDescription" class="max-w-xs text-sm text-surface-0/80">{{ props.description }}</p>
    </div>
  </BlurOverlay>
</template>
