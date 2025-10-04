<template>
  <section class="surface-card mx-auto max-w-3xl p-10 text-center">
    <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-500/90 text-white shadow-lg">
      <i class="pi pi-flask text-2xl"></i>
    </div>
    <h1 class="mt-6 text-3xl font-semibold text-slate-900 dark:text-slate-100">{{ t('app.title') }}</h1>
    <p class="mt-4 text-lg text-muted">{{ t('app.tagline') }}</p>
    <p class="mt-4 text-base text-muted">{{ t('home.welcome') }}</p>
    <RouterLink
      :to="{ name: 'lab' }"
      class="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
    >
      <span>{{ t('home.cta') }}</span>
      <i class="pi pi-arrow-right"></i>
    </RouterLink>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
