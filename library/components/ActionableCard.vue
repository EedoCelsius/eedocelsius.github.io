<script lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'
import Group from './Group.vue'
import { defineComponent } from 'vue'

export const defaultProps = {
  cardClass: undefined,
  actionClass: undefined,
} as const

export type props = {
  cardClass?: string
  actionClass?: string
}

export default defineComponent({
  name: 'ActionableCard',
  components: {
    Button,
    Card,
    Group,
  },
  props: {
    cardClass: {
      type: String,
      default: defaultProps.cardClass,
    },
    actionClass: {
      type: String,
      default: defaultProps.actionClass,
    },
  },
})
</script>

<template>
  <Group class="grid w-full grid-cols-1 rounded-md shadow-soft transition-colors sm:grid-cols-[minmax(0,1fr)_auto]">
    <Card class="h-full">
      <template #content>
        <div class="flex h-full flex-col justify-center gap-4" :class="cardClass">
          <slot />
        </div>
      </template>
    </Card>
    <Button
      type="button"
      class="flex h-full min-h-[60px] w-full items-center justify-center sm:min-h-full sm:min-w-[112px]"
      :class="actionClass"
    >
      <span class="flex h-full w-full items-center justify-center">
        <slot name="action" />
      </span>
    </Button>
  </Group>
</template>
