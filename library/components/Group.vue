<script lang="ts">
export const defaultProps = {
  as: 'div',
} as const

export type props = {
  as?: keyof HTMLElementTagNameMap
}
</script>

<script setup lang="ts">
defineOptions({
  name: 'Group',
})

defineSlots<{
  default: () => unknown
}>()

const props = withDefaults(defineProps<props>(), defaultProps)
</script>

<template>
  <component :is="props.as" class="group-root overflow-hidden">
    <slot />
  </component>
</template>

<style scoped>
.group-root ::v-slotted(*) {
  border-radius: 0 !important;
}
</style>
