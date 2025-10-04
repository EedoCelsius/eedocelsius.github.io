<script setup lang="ts">
import Spinner from '@/components/library/Spinner.vue'

defineProps<{
  text?: string | number
  size: number
  thickness: number
  textSize: number
  trackColor: string
  indicatorColor: string
}>()
</script>

<template>
  <div class="grid gap-6 rounded-3xl bg-white p-8 text-slate-800 shadow-soft dark:bg-slate-900 dark:text-slate-100">
    <div class="flex flex-col items-center gap-4 text-center">
      <Spinner v-bind="$props" />
      <p class="text-sm text-slate-600 dark:text-slate-300">
        Tune the animated spinner to match your loading experience.
      </p>
    </div>
  </div>
</template>
