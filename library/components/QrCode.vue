<script lang="ts">
export const defaultProps = {
  content: window.location.href,
  lightColor: 'var(--p-surface-0)',
  darkColor: 'var(--p-surface-900)',
  icon: '',
} as const
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { toDataURL } from 'qrcode'
import { toHex } from '@shared/color'

const props = withDefaults(
  defineProps<{
    content: string
    lightColor?: string
    darkColor?: string
    icon?: string
  }>(),
  defaultProps
)

const qrSource = ref('')
const qrError = ref('')
  
const updateQR = async () => {
  const darkHex = toHex(props.darkColor) || '#000000'
  const lightHex = toHex(props.lightColor) || '#ffffff'

  try {
    qrSource.value = await toDataURL(props.content, {
      margin: 0,
      color: {
        dark: darkHex,
        light: lightHex,
      },
    })
    qrError.value = ''
  }
  catch (error) {
    qrError.value = String(error)
  }
}

watch(
  () => [props.content, props.darkColor, props.lightColor],
  updateQR
)

updateQR()
</script>

<template>
  <section class="relative aspect-square items-center justify-center rounded-3xl border border-surface-200 bg-surface-0 p-4 shadow-sm text-center">
    <img v-if="!qrError" :src="qrSource" alt="QR code" class="h-full w-full object-contain" />
    <div v-else class="flex h-full w-full items-center justify-center text-xs text-surface-300 dark:text-surface-600">
      <span>{{ qrError }}</span>
    </div>
    <div
      v-if="props.icon?.trim()"
      class="absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <span
        class="flex h-16 w-16 items-center justify-center p-1 rounded-md bg-surface-0"
      >
        <img :src="props.icon" alt="" class="h-full w-full object-contain" />
      </span>
    </div>
  </section>
</template>
