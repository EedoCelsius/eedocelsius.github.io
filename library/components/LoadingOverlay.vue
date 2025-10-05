<script lang="ts">
import { defaultProps as blurOverlayDefaultProps } from './BlurOverlay.vue'
import { defaultProps as spinnerDefaultProps } from './Spinner.vue'
import type { props as blurOverlayProps } from './BlurOverlay.vue'
import type { props as spinnerProps } from './Spinner.vue'
  
export const defaultProps = {
  ...blurOverlayDefaultProps,
  ...spinnerDefaultProps,
  description: '',
} as const

export type LoadingOverlayProps = blurOverlayProps & spinnerProps & { description?: string }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import BlurOverlay from './BlurOverlay.vue'
import Spinner from './Spinner.vue'

const props = withDefaults(
  defineProps<LoadingOverlayProps>(),
  defaultProps
)

const hasDescription = computed(() => Boolean(props.description?.trim()))
</script>

<template>
  <BlurOverlay :visible="props.visible" :blur="props.blur" :overlay-color="props.overlayColor">
    <template #default>
      <slot />
    </template>
    <template #overlay>
      <div class="flex flex-col items-center gap-4 text-center text-surface-0" aria-live="polite">
        <Spinner
          :size="props.spinnerSize"
          :thickness="props.spinnerThickness"
          :track-color="props.spinnerTrackColor"
          :indicator-color="props.spinnerIndicatorColor"
          :text="props.spinnerText"
          :text-size="18"
        />
        <p v-if="hasDescription" class="max-w-xs text-sm text-surface-0/80">{{ props.description }}</p>
      </div>
    </template>
  </BlurOverlay>
</template>
