<script lang="ts">
export const defaultProps = {
  cardClass: 'p-6 sm:p-8',
  actionClass: 'bg-surface-950 text-surface-0',
} as const

export type props = {
  cardClass?: string
  actionClass?: string
}
</script>

<script setup lang="ts">
defineOptions({
  name: 'ActionableCard',
})

defineSlots<{
  default: () => unknown
  action: () => unknown
}>()

const props = withDefaults(defineProps<props>(), defaultProps)
</script>

<template>
  <section
    class="actionable-card grid w-full grid-cols-1 overflow-hidden rounded-3xl border border-surface-200 bg-surface-0 text-surface-900 shadow-soft transition-colors sm:grid-cols-[minmax(0,1fr)_auto]"
  >
    <div class="card-area flex flex-col justify-center gap-4" :class="props.cardClass">
      <slot />
    </div>
    <div
      class="action-area flex min-h-[60px] items-stretch justify-center sm:min-h-full sm:min-w-[112px]"
      :class="props.actionClass"
    >
      <slot name="action" />
    </div>
  </section>
</template>

<style scoped>
.action-area ::v-slotted(*) {
  width: 100%;
  height: 100%;
}
</style>
