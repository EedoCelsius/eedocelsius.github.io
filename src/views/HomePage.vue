<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
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
      <h1 class="text-4xl font-semibold text-slate-900 dark:text-slate-100">{{ t('home.title') }}</h1>
      <p class="max-w-2xl text-base text-slate-600 dark:text-slate-300">{{ t('home.description') }}</p>
    </div>
    <div class="grid gap-6 md:grid-cols-2">
      <article
        v-for="component in localizedComponents"
        :key="component.id"
        class="card-surface flex flex-col justify-between gap-6 p-6"
      >
        <div class="space-y-3">
          <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">{{ component.localizedName }}</h2>
          <p class="text-sm text-slate-600 dark:text-slate-300">{{ component.localizedDescription }}</p>
        </div>
        <RouterLink
          :to="`/components/${component.id}`"
          class="inline-flex items-center gap-2 self-start rounded-full bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-soft transition hover:bg-primary-400"
        >
          {{ t('home.openPlayground') }}
          <i class="pi pi-arrow-right text-xs"></i>
        </RouterLink>
      </article>
    </div>
  </section>
</template>
