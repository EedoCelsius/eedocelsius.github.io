<template>
  <div class="grid gap-4 rounded-2xl bg-white/90 p-6 shadow-lg shadow-primary-900/5 ring-1 ring-primary-100 transition-colors dark:bg-slate-900/90 dark:ring-primary-900/30">
    <div class="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
      <QrcodeVue
        :value="content"
        :size="size"
        :level="'H'"
        :margin="2"
        :background="lightColor"
        :foreground="darkColor"
        class="h-full w-full"
      />
      <div
        v-if="icon"
        class="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <img :src="icon" alt="QR icon" class="h-1/5 w-1/5 object-contain drop-shadow" />
      </div>
    </div>
    <div class="text-center text-sm text-slate-600 dark:text-slate-300">
      <slot>
        {{ content }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import QrcodeVue from 'qrcode.vue';

interface Props {
  content: string;
  lightColor?: string;
  darkColor?: string;
  icon?: string;
  size?: number;
}

const props = defineProps<Props>();

const size = computed(() => props.size ?? 240);
const lightColor = computed(() => props.lightColor ?? '#ffffff');
const darkColor = computed(() => props.darkColor ?? '#2f40ac');
</script>
