<script setup lang="ts">
import { BlurOverlay, type BlurOverlayProps } from '@library/components'

defineProps<BlurOverlayProps>()
</script>

<template>
  <div class="relative block overflow-hidden rounded-3xl shadow-soft">
    <div class="h-64 w-full bg-gradient-to-br from-primary-500 via-surface-900 to-surface-800">
      <div class="flex h-full flex-col justify-between p-8 text-surface-0">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.4em] text-surface-0/60">Creative focus</p>
          <h3 class="mt-4 text-3xl font-semibold">Aurora Session</h3>
        </div>
        <p class="max-w-sm text-sm text-surface-0/70">
          Overlay sections help draw attention while keeping the page context visible beneath.
        </p>
      </div>
    </div>
    <BlurOverlay v-bind="$props">
      <template #overlay>
        <div class="rounded-full bg-surface-0/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-surface-0/90">
          Overlay Active
        </div>
      </template>
    </BlurOverlay>
  </div>
</template>
