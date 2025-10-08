<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElText } from 'element-plus'
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'
import { localeStorageKey } from '@/i18n'

type ThemeVariant = 'light' | 'dark'

const themeStorageKey = 'component-lab-theme'

const { locale, t } = useI18n()
const route = useRoute()

type LanguageOption = {
  value: 'en' | 'ko'
  label: string
}

const languageOptions: LanguageOption[] = [
  { value: 'en', label: 'EN' },
  { value: 'ko', label: '한국어' },
]

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

const setLocale = (value: LanguageOption['value']) => {
  if (locale.value !== value) {
    locale.value = value
  }
}

const themeIcon = computed(() => (theme.value === 'dark' ? 'pi pi-sun' : 'pi pi-moon'))

const selectedLocale = computed({
  get: () => locale.value,
  set: (value) => {
    setLocale(value as LanguageOption['value'])
  },
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
  <div class="flex flex-col  min-h-screen">
    <Toolbar>
      <template #start>
        <RouterLink to="/">
          <ElText tag="h1" size="large">{{ t('app.title') }}</ElText>
        </RouterLink>
      </template>
      <template #end>
        <SelectButton
          v-model="selectedLocale"
          :options="languageOptions"
          optionLabel="label"
          optionValue="value"
          :allowEmpty="false"
        />
        <Button
          type="button"
          :icon="themeIcon"
          rounded
          text
          :aria-label="t('app.themeToggle')"
          :title="t('app.themeToggle')"
          @click="toggleTheme"
        />
      </template>
    </Toolbar>
    <main class="flex px-6 pb-16">
      <RouterView :key="route.fullPath" />
    </main>
  </div>
</template>
