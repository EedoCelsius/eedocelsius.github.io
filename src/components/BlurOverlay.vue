<template>
  <div class="blur-overlay" :style="backdropStyle">
    <div class="blur-overlay__scrim" />
    <div class="blur-overlay__slot">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Props = {
  blurLevel?: number;
};

const props = withDefaults(defineProps<Props>(), {
  blurLevel: 12,
});

const backdropStyle = computed(() => ({
  backdropFilter: `blur(${props.blurLevel}px)`,
  WebkitBackdropFilter: `blur(${props.blurLevel}px)`,
}));
</script>

<style scoped>
.blur-overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.blur-overlay__scrim {
  position: absolute;
  inset: 0;
  background: color-mix(in srgb, var(--app-background) 40%, transparent);
  opacity: 0.85;
}

html.dark-mode .blur-overlay__scrim {
  background: color-mix(in srgb, var(--surface-0) 8%, transparent);
  opacity: 0.9;
}

.blur-overlay__slot {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
</style>
