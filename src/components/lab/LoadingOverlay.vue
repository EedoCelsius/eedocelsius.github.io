<template>
  <BlurOverlay :blur="blur">
    <template #background>
      <div class="relative h-full min-h-[240px] w-full bg-gradient-to-br from-slate-900 via-primary-900/70 to-primary-700/70">
        <div class="absolute inset-0 opacity-40 mix-blend-screen" aria-hidden="true">
          <div class="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.18),transparent_45%)]"></div>
        </div>
      </div>
    </template>
    <div class="flex flex-col items-center justify-center gap-4 py-12 text-white">
      <ProgressSpinner style="width: 3rem; height: 3rem" strokeWidth="4" fill="transparent" animationDuration="1.5s" />
      <p class="text-sm text-white/80">{{ descriptionText }}</p>
    </div>
  </BlurOverlay>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import BlurOverlay from './BlurOverlay.vue';
import ProgressSpinner from 'primevue/progressspinner';

const props = defineProps({
  blur: {
    type: Number,
    default: 18
  },
  description: {
    type: String,
    default: ''
  }
});

const { t } = useI18n();

const descriptionText = computed(() => props.description || t('lab.components.loadingOverlay.description'));
</script>
