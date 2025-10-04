<template>
  <div class="min-h-screen pb-12">
    <header class="sticky top-0 z-30 backdrop-blur bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/60 dark:border-slate-800/60">
      <nav class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 lg:px-8">
        <RouterLink to="/" class="flex items-center gap-3 text-lg font-semibold text-primary-700 dark:text-primary-200">
          <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/90 text-white shadow-lg">
            <i class="pi pi-flask"></i>
          </span>
          <div class="flex flex-col leading-tight">
            <span>{{ t('app.title') }}</span>
            <span class="text-xs font-normal text-muted">Component Lab</span>
          </div>
        </RouterLink>
        <div class="flex items-center gap-3">
          <RouterLink
            to="/"
            class="hidden rounded-full px-4 py-2 text-sm font-medium transition hover:text-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-400 md:inline-flex"
            :class="{ 'text-primary-500': isActive('/') }"
          >
            {{ t('nav.home') }}
          </RouterLink>
          <RouterLink
            :to="{ name: 'lab' }"
            class="hidden rounded-full px-4 py-2 text-sm font-medium transition hover:text-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-400 md:inline-flex"
            :class="{ 'text-primary-500': isActive('/lab') }"
          >
            {{ t('nav.lab') }}
          </RouterLink>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </nav>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-10 lg:px-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from './components/base/LanguageSwitcher.vue';
import ThemeToggle from './components/base/ThemeToggle.vue';

const route = useRoute();
const { t } = useI18n();

const isActive = expected => {
  if (expected === '/') {
    return route.path === '/';
  }
  return route.path === expected || route.path.startsWith(`${expected}/`);
};
</script>
