<script lang="ts">
export const defaultProps = {
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

const props = withDefaults(defineProps<props>(), defaultProps)
</script>

<template>
  <Group class="grid w-full grid-cols-1 rounded-md shadow-soft transition-colors sm:grid-cols-[minmax(0,1fr)_auto]">
    <Card class="h-full">
      <template #content>
        <div class="flex h-full flex-col justify-center gap-4" :class="props.cardClass">
          <slot />
        </div>
      </template>
    </Card>
    <Button
      type="button"
      class="flex h-full min-h-[60px] w-full items-center justify-center sm:min-h-full sm:min-w-[112px]"
      :class="props.actionClass"
    >
      <span class="flex h-full w-full items-center justify-center">
        <slot name="action" />
      </span>
    </Button>
  </Group>
</template>
