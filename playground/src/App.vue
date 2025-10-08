<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'
import Toolbar from 'primevue/toolbar'
import { ElText } from 'element-plus'
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
  <div class="min-h-screen">
    <header class="sticky top-0 z-40 px-4 pt-4">
      <Toolbar class="mx-auto flex max-w-6xl items-center rounded-full px-6 py-3 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <template #start>
          <RouterLink to="/">
            <ElText tag="b" size="large">{{ t('app.title') }}</ElText>
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

    <main class="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
      <RouterView :key="route.fullPath" />
    </main>
  </div>
</template>
