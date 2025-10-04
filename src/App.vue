<template>
  <div class="app-shell">
    <nav class="site-nav surface-panel">
      <RouterLink to="/" class="app-logo">Component Lab</RouterLink>
      <div class="nav-actions">
        <div class="language-select">
          <Dropdown v-model="selectedLocale" :options="locales" optionLabel="label" optionValue="value" />
        </div>
        <Button
          class="mode-toggle"
          :label="isDark ? t('controls.lightMode') : t('controls.darkMode')"
          :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
          outlined
          @click="toggleDarkMode"
        />
      </div>
    </nav>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';

const { locale, t } = useI18n();

const isDark = ref(false);
const selectedLocale = ref(locale.value);

const locales = computed(() => [
  { label: '한국어', value: 'ko' },
  { label: 'English', value: 'en' }
]);

const applyDarkMode = (value: boolean) => {
  document.body.classList.toggle('dark-mode', value);
};

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
};

onMounted(() => {
  const stored = window.localStorage.getItem('component-lab:theme');
  if (stored) {
    isDark.value = stored === 'dark';
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  applyDarkMode(isDark.value);

  const storedLocale = window.localStorage.getItem('component-lab:locale');
  if (storedLocale) {
    selectedLocale.value = storedLocale;
    locale.value = storedLocale;
  }
  document.documentElement.setAttribute('lang', locale.value);
});

watch(isDark, (value) => {
  applyDarkMode(value);
  window.localStorage.setItem('component-lab:theme', value ? 'dark' : 'light');
});

watch(selectedLocale, (next) => {
  locale.value = next;
  document.documentElement.setAttribute('lang', next);
  window.localStorage.setItem('component-lab:locale', next);
});
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.language-select {
  min-width: 140px;
}

main {
  flex: 1;
}

@media (max-width: 768px) {
  .site-nav {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-actions {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
