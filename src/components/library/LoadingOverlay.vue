<template>
  <BlurOverlay
    class="loading-overlay"
    :visible="visible"
    :overlay-color="overlayColor"
    :blur-amount="blurAmount"
    rounded
  >
    <slot />
    <transition name="fade">
      <div v-if="visible" class="loading-indicator">
        <span class="spinner"></span>
        <p v-if="description" class="description">{{ description }}</p>
      </div>
    </transition>
  </BlurOverlay>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import BlurOverlay from './BlurOverlay.vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: ''
  },
  overlayColor: {
    type: String,
    default: 'rgba(16, 21, 34, 0.4)'
  },
  blurAmount: {
    type: String,
    default: '14px'
  }
});

const { visible, description, overlayColor, blurAmount } = toRefs(props);
</script>

<style scoped>
.loading-overlay {
  position: relative;
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-large);
  background: linear-gradient(135deg, rgba(92, 124, 250, 0.08), rgba(16, 21, 34, 0.08));
}

.loading-indicator {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  text-align: center;
  color: #fff;
}

.spinner {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.35);
  border-top-color: rgba(255, 255, 255, 0.9);
  animation: spin 1s linear infinite;
}

.description {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
