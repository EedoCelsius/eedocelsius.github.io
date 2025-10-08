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
  <Group class="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto]">
    <Card class="h-full">
      <template v-for="(_, name) in $slots" :key="name" v-slot:[name]="data">
        <slot :name="name" v-bind="data" />
      </template>
    </Card>
    <Button
      class="flex h-full min-h-md w-full items-center justify-center sm:min-h-full sm:min-w-lg"
      :class="actionClass"
    >
      <span class="flex h-full w-full items-center justify-center">
        <slot name="action" />
      </span>
    </Button>
  </Group>
</template>
