<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const goHome = () => {
  router.push({ name: 'home' })
}
</script>

<template>
  <section class="not-found surface-card border-round-3xl shadow-2 p-5 text-center">
    <h1 class="text-4xl font-bold mb-2">{{ t('messages.notFoundTitle') }}</h1>
    <p class="text-lg text-color-secondary mb-4">{{ t('messages.notFoundDescription') }}</p>
    <Button icon="pi pi-home" @click="goHome">{{ t('messages.goHome') }}</Button>
  </section>
</template>

<style scoped>
.not-found {
  max-width: 520px;
  margin: 4rem auto;
}
</style>
