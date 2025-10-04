<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
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

const isDarkMode = ref(false)

const syncTheme = (value: boolean) => {
  if (typeof document === 'undefined') return

  const rootElement = document.documentElement

  if (value) {
    rootElement.classList.add('theme-dark')
    rootElement.classList.remove('theme-light')
  } else {
    rootElement.classList.add('theme-light')
    rootElement.classList.remove('theme-dark')
  }

  rootElement.style.setProperty('color-scheme', value ? 'dark' : 'light')
}

onMounted(() => {
  if (typeof window === 'undefined') return

  const storedPreference = window.localStorage.getItem('theme')

  if (storedPreference === 'dark' || storedPreference === 'light') {
    isDarkMode.value = storedPreference === 'dark'
  } else {
    const systemPreference = window.matchMedia
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null

    if (systemPreference?.matches) {
      isDarkMode.value = true
    }
  }

  syncTheme(isDarkMode.value)

  watch(
    isDarkMode,
    (value) => {
      syncTheme(value)
      window.localStorage.setItem('theme', value ? 'dark' : 'light')
    },
    { immediate: false },
  )
})

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
}

const themeToggleIcon = computed(() => (isDarkMode.value ? 'pi pi-sun' : 'pi pi-moon'))

const themeToggleAriaLabel = computed(() =>
  isDarkMode.value ? t('navigation.switchToLight') : t('navigation.switchToDark'),
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
            :aria-label="t('navigation.language')"
          />
          <Button
            type="button"
            class="theme-toggle-button"
            :icon="themeToggleIcon"
            text
            rounded
            severity="secondary"
            :aria-label="themeToggleAriaLabel"
            @click="toggleTheme"
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

.theme-toggle-button {
  width: 2.5rem;
  height: 2.5rem;
}

.theme-toggle-button :deep(.p-button-icon) {
  font-size: 1rem;
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

  .theme-toggle-button {
    width: 2.25rem;
    height: 2.25rem;
  }
}
</style>
