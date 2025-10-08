<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import Card from 'primevue/card'

const { t } = useI18n()
</script>

<template>
  <Card>
    <template #content>
      <div class="flex flex-col items-center gap-4 text-center">
        <div class="text-4xl text-primary-500">
          <i class="pi pi-compass"></i>
        </div>
        <h1 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">{{ t('playground.notFoundTitle') }}</h1>
        <p class="max-w-md text-sm text-surface-600 dark:text-surface-300">{{ t('playground.notFoundDescription') }}</p>
        <RouterLink to="/">
          <Button
            :label="t('playground.backHome')"
            icon="pi pi-arrow-right"
            icon-pos="right"
            severity="primary"
            rounded
          />
        </RouterLink>
      </div>
    </template>
  </Card>
</template>
