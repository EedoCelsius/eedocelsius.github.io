<script setup lang="ts">
import QrCode from '@library/components/QrCode.vue'

defineProps<{
  content: string
  lightColor: string
  darkColor: string
  icon?: string
}>()
</script>

<template>
  <div class="flex justify-center">
    <QrCode v-bind="$props" />
  </div>
</template>
