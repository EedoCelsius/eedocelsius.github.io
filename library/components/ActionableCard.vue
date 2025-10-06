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
import { computed } from 'vue'
import Card from 'primevue/card'

defineOptions({
  name: 'ActionableCard',
})

const props = withDefaults(
  defineProps<props>(),
  defaultProps
)

const cardPt = computed(() => ({
  root: {
    class:
      'actionable-card w-full overflow-hidden rounded-3xl border border-surface-200 bg-surface-0 text-surface-900 shadow-soft transition-colors',
  },
  body: {
    class: 'p-0',
  },
  content: {
    class: 'p-0',
  },
}))
</script>

<template>
  <Card :pt="cardPt">
    <template #content>
      <div class="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div class="card-area flex flex-col justify-center gap-4" :class="props.cardClass">
          <slot />
        </div>
        <div
          class="flex min-h-[60px] items-stretch justify-center sm:min-h-full sm:min-w-[112px]"
          :class="props.actionClass"
        >
          <slot name="action" />
        </div>
      </div>
    </template>
  </Card>
</template>
