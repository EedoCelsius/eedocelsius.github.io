<script setup lang="ts">
import { computed } from 'vue'
import BlurOverlay from './BlurOverlay.vue'

const props = withDefaults(
  defineProps<{
    visible?: boolean
    blur?: number
    description?: string
    overlayColor?: string
  }>(),
  {
    visible: false,
    blur: 7,
    description: '',
    overlayColor: 'rgba(15, 23, 42, 0.55)',
  }
)

const hasDescription = computed(() => Boolean(props.description?.trim()))
</script>

<template>
  <BlurOverlay :visible="props.visible" :blur="props.blur" :overlay-color="props.overlayColor">
    <template #default>
      <slot />
    </template>
    <template #overlay>
      <div class="flex flex-col items-center gap-4 text-center text-white" aria-live="polite">
        <div class="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" aria-hidden="true" />
        <p v-if="hasDescription" class="max-w-xs text-sm text-white/80">{{ props.description }}</p>
      </div>
    </template>
  </BlurOverlay>
</template>
