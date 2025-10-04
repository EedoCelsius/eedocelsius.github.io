<script setup lang="ts">
import { computed } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'
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
    blur: 14,
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
        <ProgressSpinner style="width: 3rem; height: 3rem" strokeWidth="4" aria-hidden="true" />
        <p v-if="hasDescription" class="max-w-xs text-sm text-white/80">{{ props.description }}</p>
      </div>
    </template>
  </BlurOverlay>
</template>
