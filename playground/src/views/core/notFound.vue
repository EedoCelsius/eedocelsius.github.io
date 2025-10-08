<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElText } from 'element-plus'
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
        <ElText tag="h1" class="text-2xl font-semibold">
          {{ t('playground.notFoundTitle') }}
        </ElText>
        <ElText tag="p" class="max-w-md" size="small" type="info">
          {{ t('playground.notFoundDescription') }}
        </ElText>
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
