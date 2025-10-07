<script lang="ts">
export const defaultProps = {
  overlay: {
    blurStrength: 7,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    centerVertical: true,
    centerHorizontal: true,
  },
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
  <BlurOverlay v-bind="props.overlay">
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
