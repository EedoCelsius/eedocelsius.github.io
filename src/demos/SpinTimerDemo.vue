<script setup lang="ts">
import SpinTimer from '@/components/library/SpinTimer.vue'

defineProps<{
  value: string | number
  size: number
  thickness: number
  textSize: number
  trackColor: string
  indicatorColor: string
  label?: string
}>()
</script>

<template>
  <div class="grid gap-6 rounded-3xl bg-white p-8 text-slate-800 shadow-soft dark:bg-slate-900 dark:text-slate-100">
    <div class="flex flex-col items-center gap-4 text-center">
      <SpinTimer v-bind="$props" />
      <p class="text-sm text-slate-600 dark:text-slate-300">
        Adjust the timer value, text size, and ring colors to match your countdown experience.
      </p>
    </div>
  </div>
</template>
