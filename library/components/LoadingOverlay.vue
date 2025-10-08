<script lang="ts">
import BlurOverlay from './BlurOverlay.vue'
import Spinner from './Spinner.vue'
import { defineComponent, type PropType } from 'vue'

export const defaultProps = {
  overlay: undefined,
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

type OverlayConfig = NonNullable<props['overlay']>
type SpinnerConfig = NonNullable<props['spinner']>

export default defineComponent({
  name: 'LoadingOverlay',
  components: {
    BlurOverlay,
    Spinner,
  },
  props: {
    overlay: {
      type: Object as PropType<OverlayConfig>,
      default: () => ({ ...defaultProps.overlay }),
    },
    spinner: {
      type: Object as PropType<SpinnerConfig>,
      default: () => ({ ...defaultProps.spinner }),
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
