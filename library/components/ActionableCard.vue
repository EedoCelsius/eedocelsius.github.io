<script lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'
import Group from './Group.vue'
import { defineComponent, type PropType } from 'vue'

export const defaultProps = {
  card: {} as Record<string, unknown>,
  button: {} as Record<string, unknown>,
} as const

export type props = {
  card?: Record<string, unknown>
  button?: Record<string, unknown>
}

export default defineComponent({
  name: 'ActionableCard',
  components: {
    Button,
    Card,
    Group,
  },
  props: {
    card: {
      type: Object as PropType<Record<string, unknown>>,
      default: defaultProps.card,
    },
    button: {
      type: Object as PropType<Record<string, unknown>>,
      default: defaultProps.button,
    },
  },
  setup() {
    return { defaultProps }
  },
})
</script>

<template>
  <Group class="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto]">
    <Card class="h-full" v-bind="{ ...defaultProps.card, ...card }">
      <template v-for="(_, name) in $slots" :key="name" v-slot:[name]="data">
        <slot :name="name" v-bind="data" />
      </template>
    </Card>
    <Button
      class="h-full min-h-12 min-w-16"
      style="width: 100%;"
      v-bind="{ ...defaultProps.button, ...button }"
    >
      <template v-for="(_, name) in $slots" :key="name" v-slot:[name]="data">
        <slot :name="name" v-bind="data" />
      </template>
    </Button>
  </Group>
</template>
