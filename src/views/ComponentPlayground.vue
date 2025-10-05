<script setup lang="ts">
import { computed, defineAsyncComponent, reactive, ref, watch, watchEffect } from 'vue'
import type { AsyncComponentLoader } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElColorPicker } from 'element-plus'
import Spinner from '@/components/library/Spinner.vue'
import type { LabComponentDefinition, LocaleCopy, PlaygroundPropValue } from '@/library/catalog'
import { getComponentDefinition } from '@/library/catalog'
import { resolveColorValue } from '@/utils/color'
import type { SupportedLocale } from '@/i18n'

const props = defineProps<{
  componentId: string
}>()

const { t, locale } = useI18n()

const definition = computed<LabComponentDefinition | undefined>(() => getComponentDefinition(props.componentId))

const cloneProps = (value?: Record<string, PlaygroundPropValue>) =>
  value ? (JSON.parse(JSON.stringify(value)) as Record<string, PlaygroundPropValue>) : {}

const componentDefaults = ref<Record<string, PlaygroundPropValue>>({})
const currentProps = reactive<Record<string, PlaygroundPropValue>>({})
const resolvedColors = reactive<Record<string, string>>({})

const colorKeys = computed(() =>
  definition.value?.controls
    .filter((control) => control.type === 'color')
    .map((control) => control.key) ?? []
)

const applyDefaults = (defaults: Record<string, PlaygroundPropValue>) => {
  const clonedDefaults = cloneProps(defaults)
  Object.keys(currentProps).forEach((key) => delete currentProps[key])
  Object.keys(resolvedColors).forEach((key) => delete resolvedColors[key])
  Object.assign(currentProps, clonedDefaults)
}

const loadComponentDefaults = async () => {
  if (!definition.value) {
    componentDefaults.value = {}
    Object.keys(currentProps).forEach((key) => delete currentProps[key])
    Object.keys(resolvedColors).forEach((key) => delete resolvedColors[key])
    return
  }

  const module = await definition.value.component()

  const defaults = cloneProps((module as { defaultProps?: Record<string, PlaygroundPropValue> }).defaultProps)
  componentDefaults.value = defaults
  applyDefaults(defaults)
}

watch(
  definition,
  () => {
    void loadComponentDefaults()
  },
  { immediate: true }
)

const resetProps = () => {
  applyDefaults(componentDefaults.value)
}

watchEffect(() => {
  const keys = colorKeys.value

  const activeKeys = new Set(keys)
  keys.forEach((key) => {
    resolvedColors[key] = resolveColorValue(currentProps[key])
  })

  Object.keys(resolvedColors).forEach((key) => {
    if (!activeKeys.has(key)) {
      delete resolvedColors[key]
    }
  })
})

const handleColorPickerChange = (key: string, value: string | null) => {
  currentProps[key] = (value ?? '') as PlaygroundPropValue
}

const activeLocale = computed(() => locale.value as SupportedLocale)

const localize = (copy: LocaleCopy) => copy[activeLocale.value] ?? copy.en

const localizedName = computed(() => (definition.value ? localize(definition.value.name) : ''))
const localizedDescription = computed(() => (definition.value ? localize(definition.value.description) : ''))

const previewComponent = computed(() => {
  if (!definition.value) {
    return null
  }
  const loader = definition.value.preview ?? definition.value.component
  return defineAsyncComponent(loader as AsyncComponentLoader<any>)
})

const baseTitle = computed(() => String(t('app.title')))

watch(
  [localizedName, baseTitle],
  ([name, appTitle]) => {
    document.title = name ? `${name} • ${appTitle}` : appTitle
  },
  { immediate: true }
)
</script>

<template>
  <div v-if="!definition" class="card-surface flex flex-col items-center gap-5 p-10 text-center">
    <div class="text-4xl text-primary-500">
      <i class="pi pi-compass"></i>
    </div>
    <h1 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">{{ t('playground.notFoundTitle') }}</h1>
    <p class="max-w-md text-sm text-surface-600 dark:text-surface-300">{{ t('playground.notFoundDescription') }}</p>
    <RouterLink
      to="/"
      class="inline-flex items-center gap-2 rounded-full bg-primary-500 px-4 py-2 text-sm font-medium text-primary-contrast shadow-soft transition hover:bg-primary-400"
    >
      {{ t('playground.backHome') }}
      <i class="pi pi-arrow-right text-xs"></i>
    </RouterLink>
  </div>
  <div v-else class="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_22rem]">
    <section class="card-surface flex flex-col gap-6 p-6">
      <header class="space-y-3">
        <p class="text-sm font-semibold uppercase tracking-[0.4em] text-primary-500">{{ t('playground.preview') }}</p>
        <h1 class="text-3xl font-semibold text-surface-900 dark:text-surface-0">{{ localizedName }}</h1>
        <p class="text-sm text-surface-600 dark:text-surface-300">{{ localizedDescription }}</p>
      </header>
      <div class="relative min-h-[360px] overflow-hidden rounded-3xl border border-surface-200/70 bg-surface-0 p-6 shadow-inner dark:border-surface-800/70 dark:bg-surface-900">
        <Suspense v-if="previewComponent">
          <component :is="previewComponent" v-bind="currentProps" />
          <template #fallback>
            <div class="flex h-full items-center justify-center text-surface-400">
              <Spinner :size="72" :thickness="6" indicator-color="var(--p-primary-color)" />
            </div>
          </template>
        </Suspense>
        <div v-else class="flex h-full items-center justify-center text-surface-400">
          <Spinner :size="72" :thickness="6" indicator-color="var(--p-primary-color)" />
        </div>
      </div>
    </section>
    <aside class="card-surface flex h-fit flex-col gap-6 p-6">
      <div class="flex items-center justify-between">
        <p class="text-sm font-semibold uppercase tracking-[0.4em] text-primary-500">{{ t('playground.controls') }}</p>
        <button
          type="button"
          class="text-xs font-semibold text-primary-500 transition hover:text-primary-400"
          @click="resetProps"
        >
          {{ t('playground.reset') }}
        </button>
      </div>
      <p class="text-sm text-surface-500 dark:text-surface-400">{{ t('playground.helper') }}</p>
      <form class="flex flex-col gap-5">
        <div
          v-for="control in definition.controls"
          :key="control.key"
          class="flex flex-col gap-2 text-sm"
        >
          <label
            v-if="control.type !== 'boolean'"
            :for="control.key"
            class="font-medium text-surface-700 dark:text-surface-200"
          >
            {{ localize(control.label) }}
          </label>
          <template v-if="control.type === 'text'">
            <input
              :id="control.key"
              v-model="(currentProps[control.key] as string | undefined)"
              type="text"
              class="w-full rounded-xl border border-surface-200/70 bg-surface-0 px-3 py-2 text-sm text-surface-700 shadow-sm transition focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100 dark:border-surface-700/70 dark:bg-surface-900 dark:text-surface-0 dark:focus:border-primary-300"
            />
          </template>
          <template v-else-if="control.type === 'textarea'">
            <textarea
              :id="control.key"
              v-model="(currentProps[control.key] as string | undefined)"
              rows="4"
              class="w-full rounded-xl border border-surface-200/70 bg-surface-0 px-3 py-2 text-sm text-surface-700 shadow-sm transition focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100 dark:border-surface-700/70 dark:bg-surface-900 dark:text-surface-0 dark:focus:border-primary-300"
            ></textarea>
          </template>
          <template v-else-if="control.type === 'color'">
            <div class="flex items-center gap-3">
              <ElColorPicker
                :model-value="resolvedColors[control.key] ?? ''"
                show-alpha
                color-format="rgb"
                class="shrink-0"
                @update:model-value="handleColorPickerChange(control.key, $event)"
              />
              <input
                :id="control.key"
                v-model="(currentProps[control.key] as string | undefined)"
                type="text"
                class="flex-1 rounded-xl border border-surface-200/70 bg-surface-0 px-3 py-2 text-sm text-surface-700 shadow-sm transition focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100 dark:border-surface-700/70 dark:bg-surface-900 dark:text-surface-0 dark:focus:border-primary-300"
              />
            </div>
          </template>
          <template v-else-if="control.type === 'slider'">
            <div class="flex items-center gap-3">
              <input
                :id="control.key"
                v-model.number="(currentProps[control.key] as number | undefined)"
                type="range"
                :min="control.min ?? 0"
                :max="control.max ?? 100"
                :step="control.step ?? 1"
                class="flex-1 accent-primary-500"
              />
              <span class="w-12 text-right text-xs font-semibold text-primary-500">{{ currentProps[control.key] }}</span>
            </div>
          </template>
          <template v-else-if="control.type === 'boolean'">
            <label class="inline-flex items-center gap-3">
              <input
                :id="control.key"
                v-model="(currentProps[control.key] as boolean | undefined)"
                type="checkbox"
                class="h-5 w-5 rounded border border-surface-300 text-primary-500 focus:ring-primary-200 dark:border-surface-600"
              />
              <span class="text-sm text-surface-600 dark:text-surface-300">{{ localize(control.label) }}</span>
            </label>
          </template>
          <p v-if="control.helperText" class="text-xs text-surface-500 dark:text-surface-400">
            {{ localize(control.helperText) }}
          </p>
        </div>
      </form>
      <span
        ref="colorResolver"
        aria-hidden="true"
        style="position: fixed; width: 0; height: 0; opacity: 0; pointer-events: none"
      ></span>
    </aside>
  </div>
</template>
