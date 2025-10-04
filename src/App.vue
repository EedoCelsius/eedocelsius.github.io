<template>
  <div class="app-shell">
    <header class="app-header">
      <RouterLink class="brand" to="/">
        <span class="pi pi-flask brand-icon" aria-hidden="true" />
        <span class="brand-text">{{ t('app.title') }}</span>
      </RouterLink>
      <div class="header-actions">
        <Dropdown
          v-model="selectedComponent"
          :options="componentOptions"
          option-label="label"
          option-value="value"
          :placeholder="t('nav.components')"
          class="component-picker"
          @update:modelValue="onSelectComponent"
        />
        <Dropdown
          v-model="currentLocale"
          :options="localeOptions"
          option-label="label"
          option-value="value"
          class="language-selector"
          :aria-label="t('app.language')"
        />
        <div class="theme-toggle" :aria-label="t('app.theme.dark')">
          <i class="pi pi-sun" aria-hidden="true" />
          <ToggleSwitch v-model="darkMode" :true-value="true" :false-value="false" />
          <i class="pi pi-moon" aria-hidden="true" />
        </div>
      </div>
    </header>

    <main class="app-main">
      <RouterView />
    </main>

    <footer class="app-footer">
      <p>{{ t('app.tagline') }}</p>
      <p class="app-footer__meta">&copy; {{ new Date().getFullYear() }} Component Lab</p>
    </footer>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Dropdown from 'primevue/dropdown';
import ToggleSwitch from 'primevue/toggleswitch';
import { useDark } from '@vueuse/core';
import { componentRegistry } from './lab/componentsRegistry';

const router = useRouter();
const route = useRoute();
const { t, locale } = useI18n();

const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'component-lab-dark',
  valueLight: '',
  storageKey: 'component-lab-theme',
});

const darkMode = computed({
  get: () => isDark.value,
  set: (value) => {
    isDark.value = value;
  },
});

const localeOptions = [
  { label: 'English', value: 'en' },
  { label: '한국어', value: 'ko' },
];

const currentLocale = computed({
  get: () => locale.value,
  set: (value) => {
    locale.value = value;
  },
});

const componentOptions = computed(() =>
  componentRegistry.map((item) => ({
    label: t(item.nameKey),
    value: item.slug,
  })),
);

const selectedComponent = ref(null);

watch(
  () => route.params.slug,
  (slug) => {
    selectedComponent.value = slug ?? null;
  },
  { immediate: true },
);

function onSelectComponent(slug) {
  if (!slug) {
    return;
  }

  if (route.name === 'component-playground' && route.params.slug === slug) {
    return;
  }

  router.push({ name: 'component-playground', params: { slug } });
}
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--surface-ground);
  color: var(--text-color);
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  gap: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(12px);
  background: color-mix(in srgb, var(--surface-card) 80%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--surface-border) 60%, transparent);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  color: inherit;
  text-decoration: none;
}

.brand:hover {
  color: var(--primary-color);
}

.brand-icon {
  font-size: 1.2rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.component-picker :deep(.p-dropdown) {
  min-width: 14rem;
}

.language-selector :deep(.p-dropdown) {
  min-width: 8rem;
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--surface-section) 80%, transparent);
  border: 1px solid color-mix(in srgb, var(--surface-border) 50%, transparent);
}

.theme-toggle i {
  font-size: 0.9rem;
}

.app-main {
  flex: 1;
  padding: 2rem 1.5rem 3rem;
}

.app-footer {
  border-top: 1px solid color-mix(in srgb, var(--surface-border) 60%, transparent);
  padding: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  background: color-mix(in srgb, var(--surface-card) 80%, transparent);
  color: var(--text-color-secondary);
}

.app-footer__meta {
  margin-top: 0.25rem;
}

@media (max-width: 768px) {
  .app-header {
    flex-direction: column;
    align-items: stretch;
  }

  .header-actions {
    width: 100%;
    flex-wrap: wrap;
  }

  .component-picker,
  .language-selector {
    flex: 1 1 100%;
  }

  .theme-toggle {
    justify-content: center;
    width: 100%;
  }
}
</style>
