<script lang="ts">
export const defaultProps = {
  orientation: 'auto',
  breakpoint: 640,
} as const satisfies {
  orientation: Orientation
  breakpoint: number
}

export type Orientation = 'vertical' | 'horizontal' | 'auto'

export type props = {
  orientation?: Orientation
  /**
   * Width (in pixels) used when orientation is set to `auto`.
   * When the card becomes narrower than this value it will switch to the vertical layout.
   */
  breakpoint?: number
}
</script>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<props>(), defaultProps)

const rootRef = ref<HTMLElement | null>(null)
const containerWidth = ref<number>(0)
let resizeObserver: ResizeObserver | null = null

const effectiveOrientation = computed(() => {
  if (props.orientation === 'auto') {
    if (containerWidth.value > 0 && containerWidth.value < props.breakpoint) {
      return 'vertical' as const
    }
    return 'horizontal' as const
  }

  return props.orientation
})

const containerClasses = computed(() => [
  'actionable-card',
  'flex overflow-hidden rounded-3xl border border-surface-200/70 bg-white text-surface-900 shadow-soft transition-colors duration-200 dark:border-surface-700/60 dark:bg-surface-900/80 dark:text-surface-100',
  effectiveOrientation.value === 'vertical' ? 'flex-col' : 'flex-row',
])

const cardSectionClasses = computed(() => [
  'actionable-card__content flex flex-1 flex-col justify-center gap-4 p-6',
  effectiveOrientation.value === 'horizontal' ? 'min-h-[144px]' : 'min-h-[120px]'
])

const actionSectionClasses = computed(() => [
  'actionable-card__action flex items-center justify-center bg-surface-900 text-white transition-colors duration-200 dark:bg-surface-50 dark:text-surface-900',
  effectiveOrientation.value === 'horizontal'
    ? 'min-h-[120px] min-w-[160px] px-6'
    : 'w-full px-6 py-4'
])

onMounted(() => {
  if (!rootRef.value) {
    return
  }

  const updateWidth = (width: number) => {
    containerWidth.value = Math.max(0, Math.round(width))
  }

  if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
    resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        updateWidth(entry.contentRect.width)
      }
    })

    resizeObserver.observe(rootRef.value)
    updateWidth(rootRef.value.getBoundingClientRect().width)
  } else {
    updateWidth(rootRef.value.getBoundingClientRect().width)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
})
</script>

<template>
  <section ref="rootRef" :class="containerClasses">
    <div :class="cardSectionClasses">
      <slot />
    </div>
    <div :class="actionSectionClasses">
      <slot name="action" />
    </div>
  </section>
</template>

<style scoped>
.actionable-card {
  --actionable-card-bg: theme('colors.white');
  --actionable-card-action-bg: theme('colors.slate.900');
  --actionable-card-action-text: theme('colors.white');
}

:global(.dark) .actionable-card {
  --actionable-card-bg: rgba(15, 23, 42, 0.75);
  --actionable-card-action-bg: theme('colors.slate.100');
  --actionable-card-action-text: theme('colors.slate.900');
}

.actionable-card__content {
  background: var(--actionable-card-bg);
}

.actionable-card__action {
  background: var(--actionable-card-action-bg);
  color: var(--actionable-card-action-text);
}
</style>
