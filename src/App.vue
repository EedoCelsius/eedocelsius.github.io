<template>
  <div class="app-shell">
    <header class="app-header">
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 1.5rem;">
        <RouterLink to="/" style="display: flex; align-items: center; gap: 0.75rem; font-weight: 700; font-size: 1.2rem;">
          <span class="pi pi-flask" style="font-size: 1.45rem; color: var(--brand-primary);"></span>
          <span>{{ t('app.title') }}</span>
        </RouterLink>

        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <Dropdown
            v-model="currentLanguage"
            :options="languageOptions"
            optionLabel="label"
            optionValue="value"
            class="language-selector"
            :aria-label="t('app.language')"
          >
            <template #value="slotProps">
              <div class="language-chip">
                <i class="pi pi-globe" />
                <span>{{ slotProps.value === 'ko' ? '한국어' : 'English' }}</span>
              </div>
            </template>
          </Dropdown>

          <Button
            :label="isDark ? t('app.theme.light') : t('app.theme.dark')"
            :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
            class="p-button-text"
            @click="toggleTheme"
            :aria-label="t('app.theme.toggle')"
          />

          <a href="https://github.com/eedocelsius" target="_blank" rel="noopener">
            <Button icon="pi pi-github" class="p-button-rounded p-button-text" :label="t('app.github')" />
          </a>
        </div>
      </div>
    </header>

    <main class="app-main">
      <RouterView />
    </main>

    <footer class="app-footer">
      {{ t('app.footer') }}
    </footer>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTheme } from './composables/useTheme';
import { setLocale } from './locales';

const { t, locale } = useI18n();
const { isDark, toggleTheme } = useTheme();

const languageOptions = [
  { label: '한국어', value: 'ko' },
  { label: 'English', value: 'en' },
];

const currentLanguage = computed({
  get: () => (locale.value.startsWith('ko') ? 'ko' : 'en'),
  set: (value: string) => {
    const next = value === 'ko' ? 'ko' : 'en';
    locale.value = next;
    setLocale(next as 'ko' | 'en');
  },
});
</script>
