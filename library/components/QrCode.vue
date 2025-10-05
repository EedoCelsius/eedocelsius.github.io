<script lang="ts">
export const defaultProps = {
  lightColor: 'var(--p-surface-0)',
  darkColor: 'var(--p-surface-900)',
  icon: '',
} as const
</script>

<script setup lang="ts">
import QRCode from 'qrcode'
import { ref, watch } from 'vue'
import { resolveColorValue } from '@shared/color'

const props = withDefaults(
  defineProps<{
    content: string
    lightColor?: string
    darkColor?: string
    icon?: string
  }>(),
  defaultProps
)

const qrCodeDataUrl = ref('')
let requestId = 0

const generateQrCode = async () => {
  if (!props.content?.trim()) {
    qrCodeDataUrl.value = ''
    return
  }

  const currentRequest = ++requestId

  try {
    const dataUrl = await QRCode.toDataURL(props.content, {
      margin: 0,
      color: {
        dark: resolveColorValue(props.darkColor) || '#000000',
        light: resolveColorValue(props.lightColor) || '#ffffff',
      },
      width: 512,
    })

    if (requestId === currentRequest) {
      qrCodeDataUrl.value = dataUrl
    }
  } catch (error) {
    if (requestId === currentRequest) {
      qrCodeDataUrl.value = ''
    }
    console.error('Failed to generate QR code', error)
  }
}

watch(
  () => [props.content, props.lightColor, props.darkColor],
  generateQrCode,
  { immediate: true }
)

</script>

<template>
  <section class="flex flex-col items-center text-center">
    <div class="relative rounded-3xl border border-surface-200 bg-surface-0 p-4 shadow-sm dark:border-surface-700 dark:bg-surface-900">
      <img v-if="qrCodeDataUrl" :src="qrCodeDataUrl" alt="" class="block h-auto w-full" />
      <div
        v-if="props.icon?.trim()"
        class="absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <span
          class="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-surface-0/80 bg-surface-0/90 shadow-lg backdrop-blur dark:border-surface-900/70 dark:bg-surface-900/80"
        >
          <img :src="props.icon" alt="" class="h-10 w-10 object-contain" />
        </span>
      </div>
    </div>
  </section>
</template>
