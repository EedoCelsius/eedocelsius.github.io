<script lang="ts">
import { defineComponent } from 'vue'

export const defaultProps = {
  overlay: true,
} as const

export type props = {
  overlay?: boolean
}

export default defineComponent({
  name: 'OverlayContainer',
  props: {
    overlay: {
      type: Boolean,
      default: defaultProps.overlay,
    },
  },
})
</script>

<template>
  <div class="relative">
    <slot />
    <transition name="fade-blur">
      <div v-if="overlay" class="absolute inset-0 size-full rounded-inherit">
        <slot name="overlay" />
      </div>
    </transition>
  </div>
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
