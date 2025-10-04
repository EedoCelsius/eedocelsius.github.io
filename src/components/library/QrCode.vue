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

const hasIcon = computed(() => Boolean(props.icon?.trim()))
</script>

<template>
  <section class="inline-flex flex-col items-center gap-3 text-center">
    <div class="relative">
      <QrcodeVue
        :value="props.content"
        :size="220"
        :foreground="props.darkColor"
        :background="props.lightColor"
        level="H"
        class="rounded-2xl shadow-lg shadow-slate-900/10 dark:shadow-slate-900/30"
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
    <p class="max-w-xs text-sm text-slate-600 dark:text-slate-300">
      {{ props.content }}
    </p>
  </section>
</template>
