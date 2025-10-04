<script setup lang="ts">
import QrCodeCard from '@/components/library/QrCodeCard.vue'

defineProps<{
  content: string
  lightColor: string
  darkColor: string
  icon?: string
}>()
</script>

<template>
  <div class="flex justify-center">
    <QrCodeCard v-bind="$props" />
  </div>
</template>
