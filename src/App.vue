<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { localeStorageKey } from '@/i18n'

type ThemeVariant = 'light' | 'dark'

const themeStorageKey = 'component-lab-theme'

const { locale, t } = useI18n()
const route = useRoute()

const languageOptions = [
  { value: 'en', label: 'EN' },
  { value: 'ko', label: '한국어' },
] as const

const resolveInitialTheme = (): ThemeVariant => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const stored = window.localStorage.getItem(themeStorageKey) as ThemeVariant | null
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

const theme = ref<ThemeVariant>(resolveInitialTheme())

const applyTheme = (value: ThemeVariant) => {
  if (typeof document === 'undefined') {
    return
  }

  const root = document.documentElement
  root.classList.toggle('dark', value === 'dark')
}

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

const setLocale = (value: (typeof languageOptions)[number]['value']) => {
  if (locale.value !== value) {
    locale.value = value
  }
}

const themeIcon = computed(() => (theme.value === 'dark' ? 'pi pi-sun' : 'pi pi-moon'))

onMounted(() => {
  applyTheme(theme.value)
  document.documentElement.lang = locale.value
})

watch(theme, (value) => {
  applyTheme(value)
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(themeStorageKey, value)
  }
})

watch(locale, (value) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(localeStorageKey, value)
  }

  if (typeof document !== 'undefined') {
    document.documentElement.lang = value
  }

  if (route.name !== 'component-playground') {
    document.title = t('app.title')
  }
})

watch(
  () => route.name,
  (name) => {
    if (name !== 'component-playground') {
      document.title = t('app.title')
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-surface-50 via-surface-0 to-primary-50/30 text-surface-800 transition-colors dark:from-surface-950 dark:via-surface-950 dark:to-surface-900 dark:text-surface-0">
    <header class="sticky top-0 z-40 border-b border-surface-200/70 bg-surface-0/70 backdrop-blur dark:border-surface-800/70 dark:bg-surface-950/70">
      <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <RouterLink to="/" class="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <span class="text-xl font-semibold tracking-tight text-surface-900 dark:text-surface-0">{{ t('app.title') }}</span>
          <span class="text-sm text-surface-500 dark:text-surface-300">{{ t('app.tagline') }}</span>
        </RouterLink>
        <div class="flex items-center gap-3">
          <nav
            aria-label="Language switcher"
            class="flex rounded-full border border-surface-200/70 bg-surface-0/80 p-1 shadow-sm backdrop-blur dark:border-surface-700/70 dark:bg-surface-800/80"
          >
            <button
              v-for="option in languageOptions"
              :key="option.value"
              type="button"
              class="rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
              :class="
                locale === option.value
                  ? 'bg-primary-500 text-primary-contrast shadow-sm'
                  : 'text-surface-600 dark:text-surface-300 hover:text-primary-500'
              "
              @click="setLocale(option.value)"
            >
              {{ option.label }}
            </button>
          </nav>
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full border border-surface-200/70 bg-surface-0/90 text-surface-600 shadow-sm transition-colors hover:text-primary-500 dark:border-surface-700/70 dark:bg-surface-800/80 dark:text-surface-300"
            :title="t('app.themeToggle')"
            @click="toggleTheme"
          >
            <i :class="themeIcon" class="text-lg"></i>
            <span class="sr-only">{{ t('app.themeToggle') }}</span>
          </button>
        </div>
      </div>
    </header>

    <main class="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
      <RouterView />
    </main>
  </div>
</template>
