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
const slots = useSlots()
</script>

<template>
  <transition name="fade-blur">
    <Card class="absolute inset-0 h-full w-full rounded-inherit border-none shadow-none" :style="overlayStyle">
      <template v-if="slots.header" #header>
        <slot name="header" />
      </template>
      <template v-if="slots.title" #title>
        <slot name="title" />
      </template>
      <template v-if="slots.subtitle" #subtitle>
        <slot name="subtitle" />
      </template>
      <template v-if="slots.content || slots.default" #content>
        <slot name="content">
          <slot />
        </slot>
      </template>
      <template v-if="slots.footer" #footer>
        <slot name="footer" />
      </template>
    </Card>
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
