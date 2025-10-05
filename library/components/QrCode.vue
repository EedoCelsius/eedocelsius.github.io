<script lang="ts">
export const defaultProps = {
  content: '',
  lightColor: 'var(--p-surface-0)',
  darkColor: 'var(--p-surface-900)',
  icon: '',
} as const
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { toDataURL } from 'qrcode'
import { colorValueToHex } from '@shared/color'

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

const generateQrCode = async () => {
  const content = props.content.trim()

  if (!content) {
    qrSource.value = ''
    return
  }

  const darkHex = colorValueToHex(props.darkColor) || '#000000'
  const lightHex = colorValueToHex(props.lightColor) || '#ffffff'

  qrSource.value = await toDataURL(content, {
    errorCorrectionLevel: 'H',
    margin: 0,
    color: {
      dark: darkHex,
      light: lightHex,
    },
  })
}

watch(
  () => [props.content, props.darkColor, props.lightColor],
  () => {
    void generateQrCode()
  },
  { immediate: true }
)
</script>

<template>
  <section class="flex flex-col items-center text-center">
    <div
      class="relative flex aspect-square w-full max-w-[220px] items-center justify-center rounded-3xl border border-surface-200 bg-surface-0 p-4 shadow-sm dark:border-surface-700 dark:bg-surface-900"
    >
      <img v-if="qrSource" :src="qrSource" alt="QR code" class="h-full w-full object-contain" />
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
