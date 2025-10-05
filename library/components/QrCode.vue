<script lang="ts">
export const defaultProps = {
  lightColor: 'var(--p-surface-0)',
  darkColor: 'var(--p-surface-900)',
  icon: '',
} as const
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import QRCode from 'qrcode'
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

const qrCodeSrc = ref('')

const generateQrCode = async () => {
  if (!props.content.trim()) {
    qrCodeSrc.value = ''
    return
  }

  try {
    qrCodeSrc.value = await QRCode.toDataURL(props.content, {
      errorCorrectionLevel: 'H',
      margin: 1,
      color: {
        dark: resolveColorValue(props.darkColor) ?? '#000000',
        light: resolveColorValue(props.lightColor) ?? '#ffffff',
      },
    })
  } catch (error) {
    console.error('Failed to generate QR code', error)
    qrCodeSrc.value = ''
  }
}

watch(
  () => [props.content, props.lightColor, props.darkColor],
  () => {
    void generateQrCode()
  },
  { immediate: true }
)
</script>

<template>
  <section class="flex flex-col items-center text-center">
    <div
      class="relative flex aspect-square w-full max-w-xs items-center justify-center rounded-3xl border border-surface-200 bg-surface-0 p-4 shadow-sm dark:border-surface-700 dark:bg-surface-900"
    >
      <img
        v-if="qrCodeSrc"
        :src="qrCodeSrc"
        alt="QR code"
        class="h-full w-full object-contain"
      />
      <div
        v-else
        class="flex h-full w-full items-center justify-center text-sm text-surface-500"
      >
        QR 코드를 생성할 수 없습니다.
      </div>
      <div
        v-if="props.icon?.trim()"
        class="pointer-events-none absolute inset-0 flex items-center justify-center"
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
