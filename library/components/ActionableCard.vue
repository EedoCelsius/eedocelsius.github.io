<script lang="ts">
export const defaultProps = {
  actionLabel: '',
  actionType: 'button',
  disabled: false,
} as const

export type props = {
  actionLabel?: string
  actionType?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<props>(), defaultProps)

const emit = defineEmits<{
  (event: 'action', nativeEvent: MouseEvent): void
}>()

const buttonClasses = computed(() => [
  'flex h-full min-h-[56px] w-full items-center justify-center gap-2 bg-slate-900 px-6 py-4 text-sm font-semibold text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 sm:w-auto sm:min-h-0 sm:px-6 sm:py-0',
  props.disabled
    ? 'cursor-not-allowed opacity-60 hover:bg-slate-900 focus-visible:outline-none'
    : 'hover:bg-slate-800',
])

const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault()
    return
  }

  emit('action', event)
}
</script>

<template>
  <section
    class="flex w-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-sm sm:flex-row dark:border-slate-800 dark:bg-slate-900 dark:text-white"
  >
    <div class="flex flex-1 flex-col gap-3 p-6 sm:p-8">
      <slot />
    </div>
    <button
      :class="buttonClasses"
      :type="props.actionType"
      :aria-label="props.actionLabel || undefined"
      :disabled="props.disabled"
      @click="handleClick"
    >
      <slot name="action" />
    </button>
  </section>
</template>
