<script setup lang="ts">
import { computed } from 'vue'
import QrcodeVue from 'qrcode.vue'

const props = withDefaults(
  defineProps<{
    content: string
    lightColor?: string
    darkColor?: string
    icon?: string
  }>(),
  {
    lightColor: '#ffffff',
    darkColor: '#0f172a',
    icon: '',
  }
)

const accentGradient = computed(() => `linear-gradient(135deg, ${props.lightColor}, ${props.darkColor})`)
const hasIcon = computed(() => Boolean(props.icon?.trim()))
</script>

<template>
  <article
    class="card-surface relative overflow-hidden p-8"
    :style="{ '--accent-gradient': accentGradient }"
  >
    <div class="absolute inset-x-0 top-0 h-1" :style="{ background: accentGradient }"></div>
    <div class="flex flex-col items-center gap-6">
      <header class="text-center">
        <p class="text-xs font-semibold uppercase tracking-[0.4em] text-primary-500">Component Lab</p>
        <h2 class="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">Personal QR Pass</h2>
      </header>
      <div class="relative">
        <QrcodeVue
          :value="props.content"
          :size="220"
          :foreground="props.darkColor"
          :background="props.lightColor"
          level="H"
          class="rounded-3xl shadow-lg shadow-primary-500/15"
        />
        <div
          v-if="hasIcon"
          class="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <span
            class="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white/80 bg-white/90 shadow-lg backdrop-blur dark:border-slate-900/70 dark:bg-slate-900/80"
          >
            <img :src="props.icon" alt="" class="h-10 w-10 object-contain" />
          </span>
        </div>
      </div>
      <footer class="w-full rounded-xl bg-slate-50/70 px-5 py-4 text-center text-sm leading-relaxed text-slate-600 backdrop-blur dark:bg-slate-800/70 dark:text-slate-300">
        <p class="font-medium text-slate-800 dark:text-slate-100">{{ props.content }}</p>
        <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Scan to open instantly.
        </p>
      </footer>
    </div>
  </article>
</template>
