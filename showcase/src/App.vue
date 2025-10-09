<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'
import Toolbar from 'primevue/toolbar'
import { localeStorageKey } from '@/i18n'

type ThemeVariant = 'light' | 'dark'

const themeStorageKey = 'component-lab-theme'

const { locale, t } = useI18n()
const route = useRoute()

const languageOptions = [
  { value: 'en', label: 'EN' },
  { value: 'ko', label: '한국어' },
]

type LanguageValue = (typeof languageOptions)[number]['value']

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

const selectedLocale = computed({
  get: () => locale.value,
  set: (value: LanguageValue) => {
    if (value && locale.value !== value) {
      locale.value = value
    }
  },
})

const themeIcon = computed(() => (theme.value === 'dark' ? 'pi pi-sun' : 'pi pi-moon'))

const toolbarStyles = computed<Record<string, string>>(() => {
  const isDark = theme.value === 'dark'

  const background = isDark
    ? 'linear-gradient(135deg, rgba(45, 45, 60, 0.55), rgba(20, 20, 35, 0.35))'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.35))'

  const borderColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.55)'
  const shadowColor = isDark ? 'rgba(15, 18, 42, 0.55)' : 'rgba(31, 38, 135, 0.25)'

  return {
    border: `1px solid ${borderColor}`,
    background,
    boxShadow: `0 22px 45px -20px ${shadowColor}`,
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    borderRadius: 'calc(infinity * 1px)',
    transition: 'background 200ms ease, border-color 200ms ease, box-shadow 200ms ease',
  }
})

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

  if (route.name !== 'component-showcase') {
    document.title = t('app.title')
  }
})

watch(
  () => route.name,
  (name) => {
    if (name !== 'component-showcase') {
      document.title = 'Component Lab'
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="min-h-screen px-4">
    <header class="sticky top-0 z-40 max-w-6xl mx-auto pt-4">
      <Toolbar :pt="{ root: { style: toolbarStyles } }">
        <template #start>
          <RouterLink to="/">
            <Button
              icon="pi pi-home"
              rounded
              severity="secondary"
              :aria-label="t('app.home')"
            />
          </RouterLink>
        </template>
        <template #end>
          <div class="flex items-center gap-2">
            <SelectButton
              v-model="selectedLocale"
              :options="languageOptions"
              optionLabel="label"
              optionValue="value"
              :allowEmpty="false"
              aria-label="Language switcher"
            />
            <Button
              :icon="themeIcon"
              @click="toggleTheme"
              rounded
              severity="secondary"
              :aria-label="t('app.themeToggle')"
            />
          </div>
        </template>
      </Toolbar>
    </header>

    <main class="mx-auto w-full max-w-6xl py-4">
      <RouterView :key="route.fullPath" />
    </main>
  </div>
</template>
