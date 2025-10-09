<script lang="ts">
import { defineComponent } from 'vue'

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

const FALLBACK_TRACK_COLOR = 'color-mix(in srgb, currentColor 35%, transparent)'

export default defineComponent({
  name: 'Spinner',
  props: {
    diameter: {
      type: Number,
      default: defaultProps.diameter,
    },
    thickness: {
      type: Number,
      default: defaultProps.thickness,
    },
    trackColor: String,
    indicatorColor: String,
  },
  computed: {
    dimensions(): Record<string, string> {
      const diameter = `${this.diameter}px`

      return {
        width: diameter,
        height: diameter,
      }
    },
    ringStyle(): Record<string, string> {
      return {
        borderWidth: `${this.thickness}px`,
        borderColor: this.trackColor ?? FALLBACK_TRACK_COLOR,
        borderTopColor: this.indicatorColor ?? 'currentColor',
      }
    },
  },
})
</script>

<template>
  <div
    class="relative inline-flex items-center justify-center"
    :style="dimensions"
    aria-hidden="true"
  >
    <div class="size-full animate-spin rounded-full border-solid border-current" :style="ringStyle" />
    <div class="absolute size-full inset-0 flex items-center justify-center">
      <slot />
    </div>
  </div>
</template>
