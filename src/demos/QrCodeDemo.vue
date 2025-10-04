<script setup lang="ts">
import QrCode from '@/components/library/QrCode.vue'

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
