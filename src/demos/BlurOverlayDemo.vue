<script setup lang="ts">
import BlurOverlay from '@/components/library/BlurOverlay.vue'

defineProps<{
  visible: boolean
  blur: number
  overlayColor: string
}>()
</script>

<template>
  <BlurOverlay v-bind="$props" class="block overflow-hidden rounded-3xl shadow-soft">
    <template #default>
      <div class="relative h-64 w-full bg-gradient-to-br from-primary-500 via-slate-900 to-slate-800">
        <div class="flex h-full flex-col justify-between p-8 text-white">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">Creative focus</p>
            <h3 class="mt-4 text-3xl font-semibold">Aurora Session</h3>
          </div>
          <p class="max-w-sm text-sm text-white/70">
            Overlay sections help draw attention while keeping the page context visible beneath.
          </p>
        </div>
      </div>
    </template>
    <template #overlay>
      <div class="rounded-full bg-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white/90">
        Overlay Active
      </div>
    </template>
  </BlurOverlay>
</template>
