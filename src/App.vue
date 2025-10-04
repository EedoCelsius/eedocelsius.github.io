<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, RouterLink, RouterView } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { componentCatalog } from './data/componentCatalog';

const { t, locale } = useI18n();
const route = useRoute();

const locales = [
  { label: '한국어', value: 'ko' },
  { label: 'English', value: 'en' }
];

const currentLocale = ref(locale.value);
watch(currentLocale, (value) => {
  locale.value = value;
});

watch(
  () => locale.value,
  (value) => {
    if (currentLocale.value !== value) {
      currentLocale.value = value;
    }
  }
);

const prefersDark = typeof window !== 'undefined'
  ? window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
  : false;
const storedTheme = typeof window !== 'undefined' ? localStorage.getItem('component-playground-theme') : null;
const isDark = ref(storedTheme ? storedTheme === 'dark' : prefersDark);

const applyTheme = (value) => {
  if (typeof document === 'undefined') {
    return;
  }
  const root = document.documentElement;
  if (value) {
    root.classList.add('dark-theme');
  } else {
    root.classList.remove('dark-theme');
  }
};

onMounted(() => {
  applyTheme(isDark.value);
});

watch(isDark, (value) => {
  applyTheme(value);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('component-playground-theme', value ? 'dark' : 'light');
  }
});

const themeLabel = computed(() => (isDark.value ? t('app.theme.dark') : t('app.theme.light')));

const updateDocumentTitle = () => {
  const key = route.meta?.titleKey;
  const baseTitle = t('app.title');
  const translatedRoute = key ? t(key) : baseTitle;
  if (typeof document !== 'undefined') {
    document.title = key ? `${translatedRoute} · ${baseTitle}` : baseTitle;
  }
};

watch(
  [() => route.fullPath, () => locale.value],
  () => {
    updateDocumentTitle();
  },
  { immediate: true }
);

const navigationItems = computed(() => [
  {
    to: '/',
    label: t('navigation.overview')
  },
  ...componentCatalog.map((component) => ({
    to: component.route,
    label: t(component.nameKey)
  }))
]);

const toggleTheme = () => {
  isDark.value = !isDark.value;
};
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <div class="app-header__inner">
        <RouterLink class="brand" to="/">
          <span class="brand-mark">CP</span>
          <span class="brand-title">{{ t('app.title') }}</span>
        </RouterLink>
        <nav class="main-nav" aria-label="Main navigation">
          <RouterLink v-for="item in navigationItems" :key="item.to" :to="item.to" class="nav-link">
            {{ item.label }}
          </RouterLink>
        </nav>
        <div class="header-controls">
          <label class="visually-hidden" for="language-select">{{ t('app.language') }}</label>
          <select id="language-select" v-model="currentLocale" class="language-select">
            <option v-for="option in locales" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
          <button class="theme-toggle" type="button" @click="toggleTheme">
            <i :class="['pi', isDark ? 'pi-moon' : 'pi-sun']" aria-hidden="true"></i>
            <span>{{ themeLabel }}</span>
          </button>
        </div>
      </div>
    </header>
    <main class="app-main">
      <div class="main-container">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
.visually-hidden {
  position: absolute;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  width: 1px;
  overflow: hidden;
  white-space: nowrap;
}
</style>
