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
import Button from 'primevue/button'
import Card from 'primevue/card'

import Group from './Group.vue'

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
  <Group
    as="section"
    corner-radius="1.5rem"
    class="actionable-card grid w-full grid-cols-1 rounded-3xl border border-surface-200 bg-surface-0 text-surface-900 shadow-soft transition-colors sm:grid-cols-[minmax(0,1fr)_auto]"
  >
    <Card
      class="card-area h-full"
      :pt="{ content: { class: 'p-0' } }"
    >
      <template #content>
        <div class="flex h-full flex-col justify-center gap-4" :class="props.cardClass">
          <slot />
        </div>
      </template>
    </Card>
    <Button
      unstyled
      type="button"
      class="action-area flex h-full min-h-[60px] w-full items-center justify-center sm:min-h-full sm:min-w-[112px]"
      :class="props.actionClass"
    >
      <span class="flex h-full w-full items-center justify-center">
        <slot name="action" />
      </span>
    </Button>
  </Group>
</template>
