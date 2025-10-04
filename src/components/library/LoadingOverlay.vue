<script setup lang="ts">
import { computed } from 'vue'
import BlurOverlay from './BlurOverlay.vue'
import ProgressSpinner from './ProgressSpinner.vue'

const props = withDefaults(
  defineProps<{
    visible?: boolean
    blur?: number
    description?: string
    overlayColor?: string
    spinnerSize?: number
    spinnerThickness?: number
    spinnerTrackColor?: string
    spinnerIndicatorColor?: string
    spinnerLabel?: string
  }>(),
  {
    visible: false,
    blur: 7,
    description: '',
    overlayColor: 'rgba(15, 23, 42, 0.55)',
    spinnerSize: 48,
    spinnerThickness: 4,
    spinnerTrackColor: 'rgba(255, 255, 255, 0.25)',
    spinnerIndicatorColor: '#ffffff',
    spinnerLabel: '',
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
        <ProgressSpinner
          :size="props.spinnerSize"
          :thickness="props.spinnerThickness"
          :track-color="props.spinnerTrackColor"
          :indicator-color="props.spinnerIndicatorColor"
          :label="props.spinnerLabel"
        />
        <p v-if="hasDescription" class="max-w-xs text-sm text-white/80">{{ props.description }}</p>
      </div>
    </template>
  </BlurOverlay>
</template>
