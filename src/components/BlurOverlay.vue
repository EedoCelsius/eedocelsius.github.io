<template>
  <transition name="overlay-fade">
    <div v-if="active" class="blur-overlay" :style="overlayStyle">
      <div class="overlay-content">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  blurStrength: {
    type: String,
    default: 'var(--blur-strength)'
  },
  background: {
    type: String,
    default: 'var(--surface-overlay)'
  }
});

const { active, blurStrength, background } = toRefs(props);

const overlayStyle = computed(() => ({
  backdropFilter: `blur(${blurStrength.value})`,
  background: background.value
}));
</script>

<style scoped>
.blur-overlay {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  z-index: 1000;
}

.overlay-content {
  width: 100%;
  max-width: min(520px, 90vw);
}

.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.25s ease;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}
</style>
