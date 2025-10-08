<script lang="ts">
import { defineComponent } from 'vue'

export const defaultProps = {
  blurStrength: 7,
  backgroundColor: 'rgba(0, 0, 0, 0.25)',
  centerVertical: true,
  centerHorizontal: true,
} as const

export type props = {
  blurStrength?: number
  backgroundColor?: string
  centerVertical?: boolean
  centerHorizontal?: boolean
}

export default defineComponent({
  name: 'BlurOverlay',
  props: {
    blurStrength: {
      type: Number,
      default: defaultProps.blurStrength,
    },
    backgroundColor: {
      type: String,
      default: defaultProps.backgroundColor,
    },
    centerVertical: {
      type: Boolean,
      default: defaultProps.centerVertical,
    },
    centerHorizontal: {
      type: Boolean,
      default: defaultProps.centerHorizontal,
    },
  },
  computed: {
    overlayStyle(): Record<string, string> {
      const blur = `blur(${this.blurStrength}px)`

      return {
        backdropFilter: blur,
        WebkitBackdropFilter: blur,
        background: this.backgroundColor,
        alignItems: this.centerVertical ? 'center' : 'flex-start',
        justifyContent:  this.centerHorizontal ? 'center' : 'flex-start',
      }
    },
  },
})
</script>

<template>
  <transition name="fade-blur">
    <div class="blur-overlay flex absolute inset-0 h-full w-full rounded-inherit" :style="overlayStyle">
      <slot />
    </div>
  </transition>
</template>

<style scoped>
.fade-blur-enter-active,
.fade-blur-leave-active {
  transition: opacity 200ms ease;
}

.fade-blur-enter-from,
.fade-blur-leave-to {
  opacity: 0;
}

.rounded-inherit {
  border-radius: inherit;
}
</style>
