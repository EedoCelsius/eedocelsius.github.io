<script lang="ts">
export const defaultProps = {
  content: 'https://componentlab.dev',
  lightColor: 'var(--p-surface-0)',
  darkColor: 'var(--p-surface-900)',
  icon: '',
} as const
</script>

<script setup lang="ts">
import QRCode from 'qrcode'
import { onMounted, ref, watch } from 'vue'
import { resolveColorValue } from '@shared/color'

const props = withDefaults(
  defineProps<{
    content?: string
    lightColor?: string
    darkColor?: string
    icon?: string
  }>(),
  defaultProps
)

const qrCodeSrc = ref('')

const clampByte = (value: number) => Math.min(255, Math.max(0, Math.round(value)))
const toHexComponent = (value: number) => clampByte(value).toString(16).padStart(2, '0')

const toHexColor = (value: string | undefined, fallback: string) => {
  const resolved = resolveColorValue(value)?.trim()

  if (!resolved) {
    return fallback
  }

  if (/^#([\da-f]{6}|[\da-f]{8})$/i.test(resolved)) {
    return resolved
  }

  const rgbMatch = resolved.match(
    /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/i
  )

  if (!rgbMatch) {
    return fallback
  }

  const [, r, g, b, alpha] = rgbMatch
  const rHex = toHexComponent(Number.parseFloat(r!))
  const gHex = toHexComponent(Number.parseFloat(g!))
  const bHex = toHexComponent(Number.parseFloat(b!))

  if (alpha === undefined) {
    return `#${rHex}${gHex}${bHex}`
  }

  const alphaValue = Number.parseFloat(alpha)
  const alphaHex = toHexComponent(Number.isNaN(alphaValue) ? 255 : alphaValue * 255)

  return `#${rHex}${gHex}${bHex}${alphaHex}`
}

const generateQrCode = async () => {
  const contentValue = (props.content ?? '').trim()

  if (!contentValue) {
    qrCodeSrc.value = ''
    return
  }

  try {
    qrCodeSrc.value = await QRCode.toDataURL(contentValue, {
      errorCorrectionLevel: 'H',
      color: {
        dark: toHexColor(props.darkColor, '#000000ff'),
        light: toHexColor(props.lightColor, '#ffffffff'),
      },
      margin: 1,
    })
  } catch (error) {
    console.error('Failed to generate QR code', error)
    qrCodeSrc.value = ''
  }
}

onMounted(generateQrCode)

watch(
  () => [props.content, props.darkColor, props.lightColor],
  generateQrCode,
  { immediate: false }
)
</script>

<template>
  <section class="flex flex-col items-center text-center">
    <div
      class="relative aspect-square w-full max-w-[220px] rounded-3xl border border-surface-200 bg-surface-0 p-4 shadow-sm dark:border-surface-700 dark:bg-surface-900"
    >
      <img
        v-if="qrCodeSrc"
        :src="qrCodeSrc"
        alt=""
        class="h-full w-full object-contain"
      />
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
