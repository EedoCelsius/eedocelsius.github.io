<script setup lang="ts">
import { LoadingOverlay, type LoadingOverlayProps } from '@library/components'

defineProps<LoadingOverlayProps>()
</script>

<template>
  <LoadingOverlay v-bind="$props" class="block overflow-hidden rounded-3xl shadow-soft">
    <template #default>
      <div class="grid h-64 w-full gap-6 bg-surface-0 p-8 text-surface-800 dark:bg-surface-900 dark:text-surface-0 md:grid-cols-2">
        <section class="flex flex-col justify-between rounded-2xl border border-surface-200/70 bg-surface-50/70 p-5 dark:border-surface-800/70 dark:bg-surface-800/50">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.4em] text-primary-500">Sprint focus</p>
            <h3 class="mt-3 text-2xl font-semibold">Dashboard revamp</h3>
          </div>
          <p class="text-sm text-surface-600 dark:text-surface-300">
            Current iteration tackles responsive layouts and loading experiences for the analytics hub.
          </p>
        </section>
        <section class="flex flex-col justify-between rounded-2xl border border-surface-200/70 bg-surface-50/70 p-5 dark:border-surface-800/70 dark:bg-surface-800/50">
          <div class="flex items-center justify-between text-sm font-medium">
            <span>Wireframes</span>
            <span class="text-primary-500">100%</span>
          </div>
          <div class="flex items-center justify-between text-sm font-medium">
            <span>API integration</span>
            <span class="text-primary-500">70%</span>
          </div>
          <div class="flex items-center justify-between text-sm font-medium">
            <span>QA checklist</span>
            <span class="text-primary-500">45%</span>
          </div>
        </section>
      </div>
    </template>
  </LoadingOverlay>
</template>
