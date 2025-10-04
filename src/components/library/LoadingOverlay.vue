<script setup lang="ts">
import { computed } from 'vue'
import BlurOverlay from './BlurOverlay.vue'
import Spinner from './Spinner.vue'

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
    spinnerText?: string | number
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
    spinnerText: '',
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
        <Spinner
          :size="props.spinnerSize"
          :thickness="props.spinnerThickness"
          :track-color="props.spinnerTrackColor"
          :indicator-color="props.spinnerIndicatorColor"
          :text="props.spinnerText"
          :text-size="18"
        />
        <p v-if="hasDescription" class="max-w-xs text-sm text-white/80">{{ props.description }}</p>
      </div>
    </template>
  </BlurOverlay>
</template>
