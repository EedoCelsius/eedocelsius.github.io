<script lang="ts">
export const defaultProps = {
  blurStrength: 7,
  backgroundColor: 'rgba(0, 0, 0, 0.25)',
} as const

export type props = {
  blurStrength?: number
  backgroundColor?: string
}
</script>

<script setup lang="ts">
import Card from 'primevue/card'
import { computed, useSlots } from 'vue'

const props = withDefaults(
  defineProps<props>(),
  defaultProps
)

const overlayStyle = computed(() => ({
  backdropFilter: `blur(${props.blurStrength}px)`,
  WebkitBackdropFilter: `blur(${props.blurStrength}px)`,
  background: props.backgroundColor,
}))

const $scopedSlots = useSlots()
</script>

<template>
  <transition name="fade-blur">
    <Card
      class="absolute inset-0 h-full w-full rounded-inherit border-none shadow-none"
      :style="overlayStyle"
      v-slots="$scopedSlots"
    />
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
