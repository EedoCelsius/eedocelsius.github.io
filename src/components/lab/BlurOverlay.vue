<template>
  <div class="relative overflow-hidden rounded-3xl shadow-xl">
    <div class="relative h-full w-full">
      <slot name="background">
        <div class="h-full min-h-[220px] w-full bg-gradient-to-br from-primary-400/80 via-primary-500/70 to-primary-700/80"></div>
      </slot>
    </div>
    <div class="pointer-events-none absolute inset-0 bg-slate-900/40" :style="overlayStyle"></div>
    <div class="relative z-10 p-8">
      <slot>
        <div class="space-y-3 text-left text-white">
          <h3 class="text-2xl font-semibold">{{ title }}</h3>
          <p class="text-sm text-white/80">{{ description }}</p>
          <div class="flex flex-wrap gap-2 text-xs">
            <span class="rounded-full bg-white/20 px-3 py-1">Overlay</span>
            <span class="rounded-full bg-white/20 px-3 py-1">Backdrop Blur</span>
            <span class="rounded-full bg-white/20 px-3 py-1">PrimeVue Palette</span>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  blur: {
    type: Number,
    default: 12
  }
});

const { t } = useI18n();

const overlayStyle = computed(() => ({
  backdropFilter: `blur(${props.blur}px)`,
  WebkitBackdropFilter: `blur(${props.blur}px)`
}));

const title = computed(() => t('lab.components.blurOverlay.name'));
const description = computed(() => t('lab.components.blurOverlay.description'));
</script>
