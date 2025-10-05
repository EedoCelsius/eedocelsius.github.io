<script lang="ts">
export const defaultProps = {
  blurStrength: 7,
  overlayColor: 'rgba(0, 0, 0, 0.25)',
} as const

export type props = {
  blurStrength?: number
  overlayColor?: string
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<props>(),
  defaultProps
)

const overlayStyle = computed(() => ({
  backdropFilter: `blur(${props.blurStrength}px)`,
  WebkitBackdropFilter: `blur(${props.blurStrength}px)`,
  background: props.overlayColor,
}))
</script>

<template>
  <transition name="fade-blur">
    <div
      class="pointer-events-none absolute inset-0 flex items-center justify-center rounded-inherit border border-surface-0/10 text-surface-0 backdrop-blur"
      :style="overlayStyle"
    >
      <div class="pointer-events-auto">
        <slot name="overlay" />
      </div>
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
