<template>
  <transition name="overlay-fade" appear>
    <div
      v-if="active"
      class="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 backdrop-saturate-150"
      :style="backdropStyle"
    >
      <div class="pointer-events-auto">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  blurLevel?: number;
  active?: boolean;
}

const props = defineProps<Props>();

const blurLevel = computed(() => props.blurLevel ?? 10);
const active = computed(() => props.active ?? true);

const backdropStyle = computed(() => ({
  backdropFilter: `blur(${blurLevel.value}px)`
}));
</script>

<style scoped>
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.25s ease;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}
</style>
