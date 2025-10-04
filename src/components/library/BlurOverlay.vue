<template>
  <div class="blur-overlay" :class="{ rounded }">
    <div class="blur-overlay__content">
      <slot />
    </div>
    <transition name="fade">
      <div v-if="visible" class="blur-overlay__mask" :style="maskStyles"></div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  overlayColor: {
    type: String,
    default: 'rgba(16, 21, 34, 0.35)'
  },
  blurAmount: {
    type: String,
    default: '12px'
  },
  rounded: {
    type: Boolean,
    default: false
  }
});

const maskStyles = computed(() => ({
  background: props.overlayColor,
  backdropFilter: `blur(${props.blurAmount})`
}));
</script>

<style scoped>
.blur-overlay {
  position: relative;
  isolation: isolate;
  overflow: hidden;
}

.blur-overlay.rounded {
  border-radius: var(--radius-large);
}

.blur-overlay__content {
  position: relative;
  z-index: 1;
}

.blur-overlay__mask {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  z-index: 2;
  transition: opacity 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
