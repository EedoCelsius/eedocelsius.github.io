<script lang="ts">
export const defaultProps = {
  content: window.location.href,
  lightColor: 'white',
  darkColor: 'black',
  icon: '',
} as const

export type props = {
  content: string
  lightColor?: string
  darkColor?: string
  icon?: string
}
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import QRCode from 'qrcode'
import { toHex } from '@shared/color'

const props = withDefaults(
  defineProps<props>(),
  defaultProps
)

const qrSource = ref('')
const qrError = ref('')
  
const updateQrCode = () => {
  const darkHex = toHex(props.darkColor) || '#000000'
  const lightHex = toHex(props.lightColor) || '#ffffff'

  QRCode.toDataURL(
    props.content,
    {
      margin: 0,
      color: {
        dark: darkHex,
        light: lightHex,
      },
    },
    (error: Error | null | undefined, url: string) => {
      if (error) {
        qrError.value = String(error)
        return
      }

      qrSource.value = url
      qrError.value = ''
    }
  )
}

watch(
  () => [props.content, props.darkColor, props.lightColor],
  updateQrCode
)

updateQrCode()
</script>

<template>
  <section class="relative aspect-square items-center justify-center rounded-3xl border border-surface-200 bg-surface-0 p-4 shadow-sm">
    <img v-if="!qrError" :src="qrSource" alt="QR code" class="w-full object-contain" style="image-rendering: crisp-edges; image-rendering: pixelated;" />
    <div v-else class="flex h-full w-full items-center justify-center text-xs text-center">
      <span>{{ qrError }}</span>
    </div>
    <div
      v-if="props.icon?.trim()"
      class="absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <span
        class="flex h-1/4 w-1/4 items-center justify-center p-1 bg-surface-0"
      >
        <img :src="props.icon" alt="" class="w-full object-contain" />
      </span>
    </div>
  </section>
</template>
