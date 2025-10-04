<template>
  <BlurOverlay :active="active" :blur-strength="blurStrength" :background="background">
    <div class="loading-overlay">
      <ProgressSpinner strokeWidth="5" :style="{ width: '64px', height: '64px' }" />
      <p v-if="description" class="loading-description">{{ description }}</p>
    </div>
  </BlurOverlay>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import ProgressSpinner from 'primevue/progressspinner';

import BlurOverlay from './BlurOverlay.vue';

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: ''
  },
  blurStrength: {
    type: String,
    default: 'var(--blur-strength)'
  },
  background: {
    type: String,
    default: 'color-mix(in srgb, var(--surface-overlay) 94%, transparent)'
  }
});

const { active, description, blurStrength, background } = toRefs(props);
</script>

<style scoped>
.loading-overlay {
  display: grid;
  justify-items: center;
  gap: 1rem;
  padding: 2.5rem 2rem;
  border-radius: 1.25rem;
  background: color-mix(in srgb, var(--surface-card) 85%, transparent);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-soft);
}

.loading-description {
  margin: 0;
  font-size: 1rem;
  color: var(--text-primary);
  text-align: center;
}
</style>
