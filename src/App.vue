<script setup lang="ts">
import { computed, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LOCALES, type LocaleCode } from '@/i18n'

const route = useRoute()
const { locale, t } = useI18n()

const localeOptions = computed(() => [...SUPPORTED_LOCALES])

const selectedLocale = computed<LocaleCode>({
  get: () => locale.value as LocaleCode,
  set: (value: LocaleCode) => {
    locale.value = value
  },
})

watch(
  () => locale.value,
  (value) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('locale', value)
    }
  },
  { immediate: true },
)

const navigationItems = computed(() => [
  {
    label: t('navigation.home'),
    to: { name: 'home' as const },
  },
  {
    label: t('navigation.components'),
    to: { name: 'components' as const },
  },
])

const isRouteActive = (targetName: string) => {
  if (targetName === 'components') {
    return route.name === 'components' || route.name === 'component-detail'
  }

  return route.name === targetName
}
</script>

<template>
  <div class="app-shell min-h-screen flex flex-column surface-ground">
    <header class="app-header surface-card shadow-2">
      <div class="app-header__content flex align-items-center justify-content-between">
        <RouterLink :to="{ name: 'home' }" class="app-logo text-color">
          <span class="font-bold text-xl">{{ t('app.title') }}</span>
        </RouterLink>
        <nav class="app-nav flex align-items-center gap-3">
          <RouterLink
            v-for="item in navigationItems"
            :key="item.label"
            :to="item.to"
            class="app-nav__link"
            :class="{ 'app-nav__link--active': isRouteActive(item.to.name as string) }"
          >
            {{ item.label }}
          </RouterLink>
          <Dropdown
            v-model="selectedLocale"
            :options="localeOptions"
            optionLabel="label"
            optionValue="code"
            class="locale-dropdown"
          />
        </nav>
      </div>
    </header>

    <main class="app-main flex-grow-1">
      <RouterView />
    </main>

    <footer class="app-footer surface-section text-sm text-color-secondary">
      <div class="app-footer__content">
        <p class="m-0">{{ t('app.description') }}</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-shell {
  background: var(--surface-ground);
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
}

.app-header__content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  width: 100%;
}

.app-logo {
  text-decoration: none;
}

.app-nav__link {
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  color: var(--text-color-secondary);
  transition: background-color 0.2s ease, color 0.2s ease;
}

.app-nav__link--active,
.app-nav__link:hover {
  background-color: color-mix(in srgb, var(--primary-color) 15%, transparent);
  color: var(--primary-color-text);
}

.locale-dropdown {
  min-width: 8rem;
}

.app-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
  width: 100%;
}

.app-footer {
  border-top: 1px solid var(--surface-border);
}

.app-footer__content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 2rem;
}

@media screen and (max-width: 768px) {
  .app-header__content,
  .app-main,
  .app-footer__content {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .app-nav {
    gap: 0.75rem;
  }

  .app-nav__link {
    padding: 0.35rem 0.6rem;
  }

  .locale-dropdown {
    min-width: 7rem;
  }
}
</style>
