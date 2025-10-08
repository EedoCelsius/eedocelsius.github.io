<script lang="ts">
import { default as BlurOverlay, type props as BlurOverlayProps } from './BlurOverlay.vue'
import { default as Spinner, type props as SpinnerProps } from './Spinner.vue'
import { defineComponent, type PropType } from 'vue'

export const defaultProps = {
  overlay: undefined,
  spinner: {
    diameter: 48,
    thickness: 4,
  },
} as const

export type props = {
  overlay?: BlurOverlayProps
  spinner?: SpinnerProps
}

export default defineComponent({
  name: 'LoadingOverlay',
  components: {
    BlurOverlay,
    Spinner,
  },
  props: {
    overlay: {
      type: Object as PropType<BlurOverlayProps>,
      default: () => defaultProps.overlay,
    },
    spinner: {
      type: Object as PropType<SpinnerProps>,
      default: () => defaultProps.spinner,
    },
  },
})
</script>

<template>
  <BlurOverlay v-bind="overlay">
    <template #content>
      <div class="flex flex-col items-center gap-4 text-center text-surface-0" aria-live="polite">
        <Spinner
          :diameter="spinner?.diameter"
          :thickness="spinner?.thickness"
          :track-color="spinner?.trackColor"
          :indicator-color="spinner?.indicatorColor"
        >
          <slot name="spinner" />
        </Spinner>
        <slot />
      </div>
    </template>
  </BlurOverlay>
</template>
