<script setup lang="ts">
import { computed } from 'vue'
import ProgressSpinner from './ProgressSpinner.vue'

const props = withDefaults(
  defineProps<{
    value: string | number
    size?: number
    thickness?: number
    textSize?: number
    trackColor?: string
    indicatorColor?: string
    label?: string
  }>(),
  {
    size: 96,
    thickness: 8,
    textSize: 22,
    trackColor: 'rgba(148, 163, 184, 0.35)',
    indicatorColor: '#6366f1',
    label: '',
  }
)

const displayValue = computed(() => `${props.value}`)
const textStyle = computed(() => ({
  fontSize: `${props.textSize}px`,
  lineHeight: '1',
}))
</script>

<template>
  <ProgressSpinner
    :size="props.size"
    :thickness="props.thickness"
    :track-color="props.trackColor"
    :indicator-color="props.indicatorColor"
    :label="props.label"
  >
    <div
      class="flex items-center justify-center font-semibold text-slate-700 dark:text-slate-100"
      :style="textStyle"
      aria-hidden="true"
    >
      {{ displayValue }}
    </div>
  </ProgressSpinner>
</template>
