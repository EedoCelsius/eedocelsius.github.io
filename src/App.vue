<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <header class="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/80">
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <RouterLink to="/" class="flex items-center gap-2">
          <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-700 dark:bg-primary-900/60 dark:text-primary-100">
            <i class="pi pi-flask text-xl"></i>
          </span>
          <div class="leading-tight">
            <p class="text-lg font-semibold">{{ t('app.title') }}</p>
            <p class="text-xs text-slate-500 dark:text-slate-400">{{ t('app.tagline') }}</p>
          </div>
        </RouterLink>
        <div class="flex items-center gap-3">
          <nav class="hidden items-center gap-2 text-sm font-medium md:flex">
            <RouterLink
              v-for="item in navigation"
              :key="item.to"
              :to="item.to"
              class="rounded-lg px-3 py-2 transition-colors hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-primary-900/40 dark:hover:text-primary-100"
              active-class="bg-primary-500/10 text-primary-700 dark:text-primary-100"
            >
              {{ item.label }}
            </RouterLink>
          </nav>
          <Dropdown
            v-model="currentLocale"
            :options="localeOptions"
            option-label="label"
            option-value="value"
            class="w-28"
            size="small"
          />
          <Button
            :label="isDark ? t('app.themeLight') : t('app.themeDark')"
            icon-pos="right"
            size="small"
            class="whitespace-nowrap"
            @click="toggleTheme()"
          >
            <template #icon>
              <i :class="['pi text-sm', isDark ? 'pi-sun' : 'pi-moon']"></i>
            </template>
          </Button>
        </div>
      </div>
    </header>
    <main class="mx-auto max-w-6xl px-4 py-10">
      <RouterView />
    </main>
    <footer class="border-t border-slate-200/70 bg-white/70 py-6 text-center text-sm text-slate-500 dark:border-slate-800/70 dark:bg-slate-900/70 dark:text-slate-400">
      © {{ new Date().getFullYear() }} Component Lab
    </footer>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink, RouterView } from 'vue-router';

import { useTheme } from './composables/useTheme';

const { t, locale } = useI18n();
const { isDark, toggleTheme } = useTheme();

const navigation = computed(() => [
  { to: '/', label: t('nav.home') }
]);

const localeOptions = [
  { label: 'English', value: 'en' },
  { label: '한국어', value: 'ko' }
];

const currentLocale = computed({
  get: () => locale.value,
  set: (value: string) => {
    locale.value = value as 'en' | 'ko';
  }
});
</script>
