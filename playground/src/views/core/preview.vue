<script setup lang="ts">
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ComponentDemo } from '@/demos/types'
import type { LabComponentSummary } from '@/library/catalog'
import type { LocaleCopy, PlaygroundPropValue } from '@/library/types'
import type { SupportedLocale } from '@/i18n'

const props = defineProps<{
  summary: LabComponentSummary
  demo: ComponentDemo
  demoProps: Record<string, PlaygroundPropValue>
}>()

const { t, locale } = useI18n()

const localize = (copy: LocaleCopy) => copy[(locale.value as SupportedLocale)] ?? copy.en

const localizedName = computed(() => localize(props.summary.name))
const localizedDescription = computed(() => localize(props.summary.description))
const demoComponent = computed(() => props.demo.component)

const resolvedDemoProps = computed(() => {
  const expanded: Record<string, unknown> = {}

  Object.entries(props.demoProps).forEach(([path, value]) => {
    const segments = path.split('.')
    if (segments.length === 0) {
      return
    }

    let target: Record<string, unknown> = expanded
    for (let index = 0; index < segments.length - 1; index += 1) {
      const segment = segments[index]
      if (!segment) {
        return
      }

      const existing = target[segment]
      if (!existing || typeof existing !== 'object' || Array.isArray(existing)) {
        target[segment] = {}
      }

      target = target[segment] as Record<string, unknown>
    }

    const lastSegment = segments[segments.length - 1]
    if (!lastSegment) {
      return
    }

    target[lastSegment] = value as unknown
  })

  return expanded
})

watch(
  [localizedName, () => String(t('app.title'))],
  ([name, appTitle]) => {
    document.title = name ? `${name} • ${appTitle}` : appTitle
  },
  { immediate: true }
)
</script>

<template>
  <section class="card-surface flex flex-col gap-6 p-6">
    <header class="space-y-3">
      <p class="text-sm font-semibold uppercase tracking-[0.4em] text-primary-500">{{ t('playground.preview') }}</p>
      <h1 class="text-3xl font-semibold text-surface-900 dark:text-surface-0">{{ localizedName }}</h1>
      <p class="text-sm text-surface-600 dark:text-surface-300">{{ localizedDescription }}</p>
    </header>
    <div class="relative min-h-[360px] overflow-hidden rounded-3xl border border-surface-200/70 bg-surface-0 p-6 shadow-inner dark:border-surface-800/70 dark:bg-surface-900">
      <component :is="demoComponent" v-bind="resolvedDemoProps" />
    </div>
  </section>
</template>
