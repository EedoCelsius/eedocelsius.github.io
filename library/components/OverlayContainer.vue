<script lang="ts">
import { defineComponent } from 'vue'

export const defaultProps = {
  overlay: true,
  backdropFilter: 'blur(7px)',
} as const

export type props = {
  overlay?: boolean
  backdropFilter?: string
}

export default defineComponent({
  name: 'OverlayContainer',
  props: {
    overlay: {
      type: Boolean,
      default: defaultProps.overlay,
    },
    backdropFilter: {
      type: String,
      default: defaultProps.backdropFilter,
    },
  },
})
</script>

<template>
  <div class="relative">
    <slot />
    <transition name="fade">
      <div
        v-if="overlay"
        class="absolute inset-0 size-full rounded-inherit"
        :style="{ backdropFilter }"
      >
        <slot name="overlay" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.rounded-inherit {
  border-radius: inherit;
}
</style>
