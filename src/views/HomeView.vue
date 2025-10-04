<template>
  <section class="grid gap-10">
    <div class="grid gap-6 rounded-3xl bg-gradient-to-br from-primary-100/70 via-white to-white p-10 shadow-lg dark:from-primary-900/40 dark:via-slate-900 dark:to-slate-900">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div class="max-w-2xl space-y-3">
          <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">
            {{ t('home.heroTitle') }}
          </h1>
          <p class="text-base text-slate-600 dark:text-slate-300">
            {{ t('home.heroSubtitle') }}
          </p>
        </div>
        <div class="flex items-center gap-3 text-slate-500 dark:text-slate-300">
          <i class="pi pi-sparkles text-3xl text-primary-500 dark:text-primary-300"></i>
          <span class="text-sm">{{ t('app.tagline') }}</span>
        </div>
      </div>
    </div>

    <div class="space-y-6">
      <div>
        <h2 class="text-2xl font-semibold">{{ t('home.componentsTitle') }}</h2>
        <p class="text-sm text-slate-600 dark:text-slate-300">{{ t('home.componentsSubtitle') }}</p>
      </div>
      <div class="grid gap-6 md:grid-cols-2">
        <article
          v-for="component in libraryComponents"
          :key="component.id"
          class="flex flex-col justify-between gap-6 rounded-2xl border border-slate-200/70 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800/70 dark:bg-slate-900/80"
        >
          <div class="space-y-3">
            <h3 class="text-xl font-semibold">{{ t(`${component.translationKey}.name`) }}</h3>
            <p class="text-sm text-slate-600 dark:text-slate-300">
              {{ t(`${component.translationKey}.description`) }}
            </p>
          </div>
          <RouterLink
            :to="{ name: 'component-detail', params: { id: component.id } }"
            class="inline-flex items-center gap-2 text-sm font-medium text-primary-600 transition hover:text-primary-500 dark:text-primary-300"
          >
            {{ t('actions.viewDetails') }}
            <i class="pi pi-arrow-up-right"></i>
          </RouterLink>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';

import { libraryComponents } from '../components/library/registry';

const { t } = useI18n();
</script>
