<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { componentCatalog } from '@/library/catalog'
import type { SupportedLocale } from '@/i18n'

const { t, locale } = useI18n()

const activeLocale = computed(() => locale.value as SupportedLocale)

const localizedComponents = computed(() =>
  componentCatalog.map((component) => ({
    id: component.id,
    name: component.name,
    description: component.description,
    localizedName: component.name[activeLocale.value] ?? component.name.en,
    localizedDescription: component.description[activeLocale.value] ?? component.description.en,
  }))
)
</script>

<template>
  <section class="space-y-4">
    <div class="space-y-3">
      <p class="text-sm font-semibold uppercase tracking-[0.4em] text-primary-500">Component Lab</p>
      <h1 class="text-4xl font-semibold text-surface-900 dark:text-surface-0">{{ t('home.title') }}</h1>
      <p class="max-w-2xl text-base text-surface-600 dark:text-surface-300">{{ t('home.description') }}</p>
    </div>
    <div class="grid gap-6 md:grid-cols-2">
      <Card
        v-for="component in localizedComponents"
        :key="component.id"
      >
        <template #title>
          {{ component.localizedName }}
        </template>
        <template #subtitle>
          {{ component.localizedDescription }}
        </template>
        <template #footer>
          <RouterLink :to="`/components/${component.id}`">
            <Button
              :label="t('home.openPlayground')"
              icon="pi pi-arrow-right"
              icon-pos="right"
              severity="primary"
              rounded
              size="small"
            />
          </RouterLink>
        </template>
      </Card>
    </div>
  </section>
</template>
