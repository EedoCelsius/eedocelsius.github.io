<script setup lang="ts">
import { QrCode, type QrCodeProps } from '@library/components'

defineProps<QrCodeProps>()
</script>

<template>
  <div class="flex justify-center">
    <QrCode v-bind="$props" class="w-64 h-64" />
  </div>
</template>
