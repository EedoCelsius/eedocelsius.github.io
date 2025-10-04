<template>
  <BlurOverlay :active="active" :blur-level="blurLevel">
    <div class="flex flex-col items-center gap-3 rounded-2xl bg-white/80 px-8 py-6 text-slate-700 shadow-xl backdrop-blur-md dark:bg-slate-900/70 dark:text-slate-100">
      <ProgressSpinner style="width: 3rem; height: 3rem" stroke-width="4" />
      <p v-if="description" class="text-center text-sm leading-relaxed">
        {{ description }}
      </p>
    </div>
  </BlurOverlay>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ProgressSpinner from 'primevue/progressspinner';

import BlurOverlay from './BlurOverlay.vue';

interface Props {
  description?: string;
  blurLevel?: number;
  active?: boolean;
}

const props = defineProps<Props>();

const blurLevel = computed(() => props.blurLevel ?? 12);
const active = computed(() => props.active ?? true);
const description = computed(() => props.description ?? 'Loading, please wait...');
</script>
