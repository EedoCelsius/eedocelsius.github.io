<template>
  <div class="app-shell">
    <header class="app-header">
      <RouterLink to="/" class="brand">
        <span class="brand-mark" aria-hidden="true">◎</span>
        <span class="brand-label">{{ t('app.title') }}</span>
      </RouterLink>

      <nav class="main-nav">
        <RouterLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="nav-link"
          :class="{ active: route.path === link.path }"
        >
          {{ t(link.labelKey) }}
        </RouterLink>
      </nav>

      <div class="header-controls">
        <label class="visually-hidden" :for="languageSelectId">{{ t('common.language') }}</label>
        <select
          :id="languageSelectId"
          v-model="currentLocale"
          class="control-select"
        >
          <option v-for="option in localeOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>

        <button type="button" class="icon-button" @click="toggleMode" :aria-label="themeAriaLabel">
          <i :class="['pi', isDark ? 'pi-moon' : 'pi-sun']" aria-hidden="true"></i>
        </button>
      </div>
    </header>

    <main class="app-main">
      <RouterView />
    </main>

    <footer class="app-footer">
      <p>{{ t('app.footer') }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { useColorMode } from '@/composables/useColorMode';

const { t, locale, availableLocales } = useI18n();
const route = useRoute();
const { isDark, toggleMode } = useColorMode();

const navLinks = [
  { path: '/', labelKey: 'nav.home' },
  { path: '/playground', labelKey: 'nav.playground' }
];

const localeOptions = computed(() =>
  availableLocales.map((value) => ({
    value,
    label: value === 'ko' ? '한국어' : 'English'
  }))
);

const currentLocale = computed({
  get: () => locale.value,
  set: (value) => {
    locale.value = value;
  }
});

const themeAriaLabel = computed(() =>
  `${t('common.theme')}: ${t(isDark.value ? 'common.dark' : 'common.light')}`
);

const languageSelectId = 'language-select';

watchEffect(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = currentLocale.value;
  }
});
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background: var(--surface-background);
  color: var(--text-primary);
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  background: color-mix(in srgb, var(--surface-layer) 96%, transparent);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--border-subtle);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
}

.brand-mark {
  font-size: 1.25rem;
  color: var(--accent-color);
}

.brand-label {
  font-size: 1.1rem;
  letter-spacing: 0.02em;
}

.main-nav {
  display: flex;
  gap: 0.75rem;
}

.nav-link {
  position: relative;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  color: var(--text-muted);
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease;
}

.nav-link:hover {
  background: color-mix(in srgb, var(--accent-color) 12%, transparent);
  color: var(--text-primary);
}

.nav-link.active {
  background: color-mix(in srgb, var(--accent-color) 18%, transparent);
  color: var(--text-primary);
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.control-select {
  appearance: none;
  border: 1px solid var(--border-subtle);
  background: var(--surface-layer);
  color: var(--text-primary);
  padding: 0.35rem 0.75rem;
  border-radius: 0.75rem;
  font-size: 0.9rem;
}

.icon-button {
  border: 1px solid var(--border-subtle);
  border-radius: 50%;
  width: 2.25rem;
  height: 2.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-layer);
  color: var(--text-primary);
  transition: transform 0.2s ease, background 0.2s ease;
}

.icon-button:hover {
  transform: translateY(-1px);
  background: color-mix(in srgb, var(--accent-color) 15%, transparent);
}

.icon-button:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

.app-main {
  padding: 2rem clamp(1.5rem, 4vw, 3rem);
}

.app-footer {
  padding: 1.5rem 2rem 2.5rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

@media (max-width: 768px) {
  .app-header {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .main-nav {
    width: 100%;
    justify-content: center;
  }

  .header-controls {
    margin-left: auto;
  }
}
</style>
