<template>
  <div class="app-shell">
    <header class="app-header">
      <RouterLink class="brand" to="/">Eedocelsius Components</RouterLink>
      <div class="header-actions">
        <Dropdown
          v-model="selectedLocale"
          :options="localeOptions"
          option-label="label"
          option-value="value"
          class="locale-dropdown"
        />
        <a
          class="github-link"
          href="https://github.com/eedocelsius/eedocelsius.github.io"
          target="_blank"
          rel="noopener"
        >
          <i class="pi pi-github" />
        </a>
      </div>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Dropdown from 'primevue/dropdown';

const { locale, availableLocales, t } = useI18n();

const selectedLocale = computed({
  get: () => locale.value,
  set: (value: string) => {
    locale.value = value;
  }
});

const localeOptions = computed(() =>
  availableLocales.map((value) => ({
    label: t(`locales.${value}`),
    value
  }))
);
</script>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.brand {
  font-weight: 700;
  font-size: 1.25rem;
  color: #1e40af;
  text-decoration: none;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.github-link {
  color: #1f2933;
  font-size: 1.25rem;
}

.locale-dropdown {
  min-width: 10rem;
}

main {
  flex: 1;
}
</style>
