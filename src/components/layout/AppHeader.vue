<template>
  <header class="app-header surface-card">
    <div class="app-header__inner">
      <RouterLink to="/" class="brand">
        <span class="brand__dot" />
        <span class="brand__text">{{ t('app.title') }}</span>
      </RouterLink>
      <nav class="nav-links">
        <RouterLink to="/" class="nav-link" active-class="is-active">{{ t('nav.home') }}</RouterLink>
        <RouterLink to="/playground" class="nav-link" active-class="is-active">{{ t('nav.playground') }}</RouterLink>
      </nav>
      <div class="header-actions">
        <LanguageSwitcher />
        <ThemeToggleButton />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from '@/components/controls/LanguageSwitcher.vue';
import ThemeToggleButton from '@/components/controls/ThemeToggleButton.vue';

const { t } = useI18n();
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(16px);
  border-bottom: 1px solid color-mix(in srgb, var(--surface-300) 50%, transparent);
}

.app-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--primary-color);
  text-decoration: none;
}

.brand__dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, var(--primary-400), var(--primary-600));
  box-shadow: 0 0 0.5rem color-mix(in srgb, var(--primary-500) 30%, transparent);
}

.nav-links {
  display: flex;
  gap: 0.75rem;
}

.nav-link {
  font-weight: 500;
  color: var(--text-color-secondary);
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.nav-link:hover {
  color: var(--text-color);
  background-color: color-mix(in srgb, var(--primary-200) 15%, transparent);
}

.nav-link:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--primary-color) 55%, transparent);
  outline-offset: 2px;
  color: var(--text-color);
}

.nav-link.is-active {
  color: var(--primary-color);
  background-color: color-mix(in srgb, var(--primary-200) 30%, transparent);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

@media (max-width: 768px) {
  .app-header__inner {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .nav-links {
    order: 3;
    width: 100%;
    justify-content: center;
  }

  .header-actions {
    margin-left: auto;
  }
}
</style>
