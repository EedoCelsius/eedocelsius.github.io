<script setup lang="ts">
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Card from 'primevue/card'
import Panel from 'primevue/panel'
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
  <Card>
    <template #title>
      {{ t('playground.preview') }}
    </template>
    <template #content>
      <div class="space-y-4">
        <div class="space-y-2">
          <h1 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">{{ localizedName }}</h1>
          <p class="text-sm text-surface-600 dark:text-surface-300">{{ localizedDescription }}</p>
        </div>
        <Panel :pt="{ content: { class: 'min-h-[360px]' } }">
          <component :is="demoComponent" v-bind="resolvedDemoProps" />
        </Panel>
      </div>
    </template>
  </Card>
</template>
