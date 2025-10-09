<script lang="ts">
import { defaultProps as liquidGlassDefaults } from '@library/components/LiquidGlass.vue'
import type { ComponentDemoConfig } from '@/demos/types'

export const demoConfig: ComponentDemoConfig = {
  defaultProps: liquidGlassDefaults,
  properties: [],
}
</script>

<script setup lang="ts">
import { LiquidGlass } from '@library/components'
</script>

<template>
  <div
    class="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-surface-900 via-indigo-900 to-black p-10"
  >
    <div class="pointer-events-none absolute -left-12 top-10 size-72 rounded-full bg-cyan-400/40 blur-3xl" />
    <div class="pointer-events-none absolute -bottom-16 right-0 size-64 rounded-full bg-purple-500/40 blur-3xl" />
    <LiquidGlass class="relative w-full max-w-md rounded-3xl border border-white/25 bg-white/10 p-6 text-white shadow-2xl">
      <div class="flex flex-col gap-3">
        <h2 class="text-2xl font-semibold tracking-wide">Liquid glass surface</h2>
        <p class="text-sm text-white/80">
          Layer your content on top of vibrant imagery while keeping it legible and tactile.
        </p>
        <button
          type="button"
          class="self-start rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/30"
        >
          Explore now
        </button>
      </div>
    </LiquidGlass>
  </div>
</template>
