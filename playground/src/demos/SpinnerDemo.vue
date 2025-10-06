<script setup lang="ts">
import { Spinner, type SpinnerProps } from '@library/components'

defineProps<SpinnerProps>()
</script>

<template>
  <div class="grid gap-6 rounded-3xl bg-surface-0 p-8 text-surface-800 shadow-soft dark:bg-surface-900 dark:text-surface-0">
    <div class="flex flex-col items-center gap-4 text-center">
      <Spinner v-bind="$props" />
      <p class="text-sm text-surface-600 dark:text-surface-300">
        Tune the animated spinner to match your loading experience.
      </p>
    </div>
  </div>
</template>
