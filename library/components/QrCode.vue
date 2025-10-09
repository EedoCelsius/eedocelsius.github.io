<script lang="ts">
import QRCode from 'qrcode'
import { ElText } from 'element-plus'
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
  <section class="relative aspect-square bg-surface-0 p-4">
    <div class="flex size-full items-center justify-center">
      <ElText v-if="qrError" type="warning" tag="span" size="small">{{ qrError }}</ElText>
      <img v-else :src="qrSource" alt="QR code" class="size-full object-contain"
        style="image-rendering: crisp-edges; image-rendering: pixelated;"
      />
    </div>
    <div class="absolute left-1/2 top-1/2 h-1/4 w-1/4 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
      <slot />
    </div>
  </section>
</template>
