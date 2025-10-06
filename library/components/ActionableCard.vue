<script lang="ts">
export const defaultProps = {
  orientation: 'auto',
  minHorizontalWidth: 480,
} as const satisfies Record<string, unknown>

export type Orientation = 'vertical' | 'horizontal' | 'auto'

export type props = {
  orientation?: Orientation
  minHorizontalWidth?: number
}
</script>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<props>(), defaultProps)

const containerRef = ref<HTMLElement | null>(null)
const layout = ref<'vertical' | 'horizontal'>(props.orientation === 'vertical' ? 'vertical' : 'horizontal')
let resizeObserver: ResizeObserver | undefined

const isAuto = computed(() => props.orientation === 'auto')
const horizontalBreakpoint = computed(() => Math.max(0, props.minHorizontalWidth))

const applyLayout = (width?: number) => {
  if (props.orientation === 'vertical' || props.orientation === 'horizontal') {
    layout.value = props.orientation
    return
  }

  const effectiveWidth =
    width ?? containerRef.value?.offsetWidth ?? horizontalBreakpoint.value

  layout.value = effectiveWidth < horizontalBreakpoint.value ? 'vertical' : 'horizontal'
}

const ensureResizeObserver = () => {
  if (!isAuto.value || typeof ResizeObserver === 'undefined' || !containerRef.value) {
    return
  }

  if (!resizeObserver) {
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === containerRef.value) {
          applyLayout(entry.contentRect.width)
        }
      }
    })
  } else {
    resizeObserver.disconnect()
  }

  resizeObserver.observe(containerRef.value)
}

onMounted(() => {
  applyLayout()
  ensureResizeObserver()
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})

watch(
  () => [props.orientation, props.minHorizontalWidth],
  () => {
    applyLayout()

    if (!isAuto.value) {
      resizeObserver?.disconnect()
      resizeObserver = undefined
      return
    }

    ensureResizeObserver()
  },
  { flush: 'post' }
)

const containerClasses = computed(() => [
  'actionable-card relative inline-flex w-full overflow-hidden rounded-3xl border border-surface-200/70 bg-surface-0 text-left shadow-sm transition-colors dark:border-surface-800/60 dark:bg-surface-900',
  layout.value === 'horizontal' ? 'flex-row' : 'flex-col',
])

const bodyClasses = computed(() => [
  'actionable-card__body flex min-w-0 flex-1 flex-col gap-4 p-6 text-surface-900 dark:text-surface-0',
])

const actionClasses = computed(() => [
  'actionable-card__action flex items-center justify-center bg-surface-900 px-6 py-5 text-sm font-semibold text-surface-0 transition-colors dark:bg-surface-800',
  layout.value === 'horizontal' ? 'min-w-[112px]' : 'w-full',
])
</script>

<template>
  <section ref="containerRef" :class="containerClasses">
    <div :class="bodyClasses">
      <slot :orientation="layout" />
    </div>
    <div :class="actionClasses">
      <slot name="action" :orientation="layout" />
    </div>
  </section>
</template>

<style scoped>
.actionable-card {
  --actionable-card-radius: 1.75rem;
  border-radius: var(--actionable-card-radius);
}

.actionable-card__body,
.actionable-card__action {
  border-radius: 0;
}
</style>
