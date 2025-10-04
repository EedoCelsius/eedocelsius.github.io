<template>
  <header class="app-header surface-card">
    <div class="brand">
      <RouterLink to="/" class="brand-link">
        <span class="brand-mark">CL</span>
        <div class="brand-text">
          <span class="brand-title">{{ t('app.title') }}</span>
          <span class="brand-tagline">{{ t('app.tagline') }}</span>
        </div>
      </RouterLink>
    </div>
    <nav class="nav">
      <RouterLink
        class="nav-link"
        :class="{ active: route.name === 'home' }"
        to="/"
      >
        {{ t('navigation.home') }}
      </RouterLink>
      <RouterLink
        class="nav-link"
        :class="{ active: isComponentsRoute }"
        :to="{ path: '/', hash: '#components' }"
      >
        {{ t('navigation.components') }}
      </RouterLink>
    </nav>
    <div class="actions">
      <Dropdown
        v-model="selectedLocale"
        :options="localeOptions"
        option-label="label"
        option-value="value"
        class="lang-select"
        @update:model-value="onLocaleChange"
      />
      <Button
        class="theme-toggle"
        :icon="themeMode === 'dark' ? 'pi pi-moon' : 'pi pi-sun'"
        rounded
        text
        @click="toggleTheme"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { setLocale, type SupportedLocale } from '@/plugins/i18n';
import { useTheme } from '@/composables/useTheme';

const route = useRoute();
const { t, locale } = useI18n();
const { themeMode, toggleTheme } = useTheme();

const localeOptions = [
  { label: 'English', value: 'en' },
  { label: '한국어', value: 'ko' }
];

const selectedLocale = ref<SupportedLocale>(locale.value as SupportedLocale);

watch(
  () => locale.value,
  (val) => {
    selectedLocale.value = val as SupportedLocale;
  }
);

const isComponentsRoute = computed(() => route.path.startsWith('/components'));

function onLocaleChange(value: SupportedLocale) {
  setLocale(value);
}
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 1.5rem;
  margin: 1.5rem auto 2rem;
  padding: 1rem 1.5rem;
  max-width: min(1080px, calc(100% - 2rem));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  backdrop-filter: blur(16px);
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-mark {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  font-weight: 700;
  background: linear-gradient(135deg, rgba(92, 124, 250, 0.95), rgba(151, 117, 250, 0.95));
  color: white;
  letter-spacing: 0.08em;
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.brand-title {
  font-weight: 600;
  font-size: 1.1rem;
}

.brand-tagline {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-link {
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  color: var(--color-text-muted);
  transition: background 0.2s ease, color 0.2s ease;
}

.nav-link:hover,
.nav-link.active {
  color: var(--color-text);
  background: var(--color-accent-soft);
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.lang-select {
  min-width: 120px;
}

@media (max-width: 768px) {
  .app-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .actions {
    width: 100%;
    justify-content: space-between;
  }

  .nav {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
