<script lang="ts">
import QRCode from 'qrcode'
import { toHex } from '@shared/color'
import { defineComponent } from 'vue'

export const defaultProps = {
  data: window.location.href,
  lightColor: 'white',
  darkColor: 'black',
} as const

export type props = {
  data: string
  lightColor?: string
  darkColor?: string
}

export default defineComponent({
  name: 'QrCode',
  props: {
    data: {
      type: String,
      default: defaultProps.data,
    },
    lightColor: {
      type: String,
      default: defaultProps.lightColor,
    },
    darkColor: {
      type: String,
      default: defaultProps.darkColor,
    },
  },
  data() {
    return {
      qrSource: '',
      qrError: '',
    }
  },
  watch: {
    data: 'updateQrCode',
    lightColor: 'updateQrCode',
    darkColor: 'updateQrCode',
  },
  created() {
    this.updateQrCode()
  },
  methods: {
    updateQrCode(): void {
      const darkHex = toHex(this.darkColor) || '#000000'
      const lightHex = toHex(this.lightColor) || '#ffffff'

      QRCode.toDataURL(
        this.data,
        {
          margin: 0,
          color: {
            dark: darkHex,
            light: lightHex,
          },
        },
        (error: Error | null | undefined, url: string) => {
          if (error) {
            this.qrError = String(error)
            return
          }

          this.qrSource = url
          this.qrError = ''
        }
      )
    },
  },
})
</script>

<template>
  <section class="relative aspect-square items-center justify-center rounded-3xl border border-surface-200 bg-surface-0 p-4 shadow-sm">
    <img v-if="!qrError" :src="qrSource" alt="QR code" class="w-full object-contain" style="image-rendering: crisp-edges; image-rendering: pixelated;" />
    <div v-else class="flex h-full w-full items-center justify-center text-xs text-center">
      <span>{{ qrError }}</span>
    </div>
    <div class="absolute left-1/2 top-1/2 h-1/4 w-1/4 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center" aria-hidden="true">
      <slot />
    </div>
  </section>
</template>
