<template>
  <BlurOverlay :blur-level="props.blurLevel">
    <div class="loading-overlay">
      <ProgressSpinner stroke-width="4" style="width: 3rem; height: 3rem" />
      <p v-if="props.description" class="loading-overlay__description">{{ props.description }}</p>
    </div>
  </BlurOverlay>
</template>

<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';
import BlurOverlay from './BlurOverlay.vue';

type Props = {
  blurLevel?: number;
  description?: string;
};

const props = withDefaults(defineProps<Props>(), {
  blurLevel: 14,
  description: '',
});
</script>

<style scoped>
.loading-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.75rem;
  border-radius: 1rem;
  background: color-mix(in srgb, var(--surface-0) 60%, transparent);
  box-shadow: 0 20px 45px -36px rgba(15, 23, 42, 0.6);
}

.loading-overlay__description {
  margin: 0;
  font-weight: 500;
  text-align: center;
  color: var(--text-color);
}

html.dark-mode .loading-overlay {
  background: color-mix(in srgb, var(--surface-0) 30%, transparent);
  box-shadow: 0 24px 50px -38px rgba(8, 12, 24, 0.85);
}
</style>
