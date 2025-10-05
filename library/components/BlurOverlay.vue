<script lang="ts">
export const defaultProps = {
  visible: true,
  blur: 7,
  overlayColor: 'rgba(0, 0, 0, 0.25)',
} as const
</script>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    visible?: boolean
    blur?: number
    overlayColor?: string
  }>(),
  defaultProps
)

const overlayStyle = computed(() => ({
  backdropFilter: `blur(${props.blur}px)`,
  WebkitBackdropFilter: `blur(${props.blur}px)`,
  background: props.overlayColor,
}))
</script>

<template>
  <div class="relative isolate">
    <div class="relative z-0">
      <slot />
    </div>
    <transition name="fade-blur">
      <div
        v-if="props.visible"
        class="absolute inset-0 flex items-center justify-center rounded-inherit border border-surface-0/10 text-surface-0 backdrop-blur"
        :style="overlayStyle"
      >
        <div class="pointer-events-auto">
          <slot name="overlay" />
        </div>
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
