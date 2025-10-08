<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Card from 'primevue/card'
import Button from 'primevue/button'

const { t } = useI18n()
</script>

<template>
  <Card class="text-center">
    <template #content>
      <div class="flex flex-col items-center gap-4">
        <div class="text-4xl text-primary-500">
          <i class="pi pi-compass"></i>
        </div>
        <h1>{{ t('playground.notFoundTitle') }}</h1>
        <p>{{ t('playground.notFoundDescription') }}</p>
        <RouterLink to="/">
          <Button :label="t('playground.backHome')" icon="pi pi-arrow-right" icon-pos="right" />
        </RouterLink>
      </div>
    </template>
  </Card>
</template>
