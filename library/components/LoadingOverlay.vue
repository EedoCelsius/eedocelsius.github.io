<script lang="ts">
import { defaultProps as blurOverlayDefaults } from './BlurOverlay.vue'

export const defaultProps = {
  overlay: { ...blurOverlayDefaults },
  spinner: {
    diameter: 48,
    thickness: 4,
  },
} as const

export type props = {
  overlay?: {
    blurStrength?: number
    backgroundColor?: string
    centerVertical?: boolean
    centerHorizontal?: boolean
  }
  spinner?: {
    diameter?: number
    thickness?: number
    trackColor?: string
    indicatorColor?: string
  }
}
</script>

<script setup lang="ts">
import BlurOverlay from './BlurOverlay.vue'
import Spinner from './Spinner.vue'

const props = withDefaults(defineProps<props>(), {
  overlay: () => ({ ...defaultProps.overlay }),
  spinner: () => ({ ...defaultProps.spinner }),
})
</script>

<template>
  <BlurOverlay
    :blur-strength="props.overlay.blurStrength"
    :background-color="props.overlay.backgroundColor"
    :center-vertical="props.overlay.centerVertical"
    :center-horizontal="props.overlay.centerHorizontal"
  >
    <template #content>
      <div class="flex flex-col items-center gap-4 text-center text-surface-0" aria-live="polite">
        <Spinner
          :diameter="props.spinner.diameter"
          :thickness="props.spinner.thickness"
          :track-color="props.spinner.trackColor"
          :indicator-color="props.spinner.indicatorColor"
        >
          <slot name="spinner" />
        </Spinner>
        <slot />
      </div>
    </template>
  </BlurOverlay>
</template>
