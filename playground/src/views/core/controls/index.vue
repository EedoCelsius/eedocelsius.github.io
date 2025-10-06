<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ControlDefinition, GroupDefinition, PlaygroundComponent, PlaygroundPropValue } from '@/library/types'
import Field from './field.vue'
import Section from './section.vue'

const props = defineProps<{
  definition: PlaygroundComponent
}>()

const { t } = useI18n()

const componentDefaults = ref<Record<string, PlaygroundPropValue>>({})
const demoProps = defineModel<Record<string, PlaygroundPropValue>>('props', { default: () => ({}) })
type ControlSection = { id: string; group?: GroupDefinition; controls: ControlDefinition[] }

const controlSections = props.definition.properties.map<ControlSection>((property) => {
  if ('controls' in property) {
    return {
      id: property.id,
      group: property,
      controls: property.controls,
    }
  }

  return {
    id: property.key,
    group: undefined,
    controls: [property],
  }
})

const hasOwn = (object: Record<string, unknown>, key: string) => Object.prototype.hasOwnProperty.call(object, key)

const isControlOptional = (control: ControlDefinition) => !hasOwn(componentDefaults.value, control.key)

const applyDefaults = () => {
  demoProps.value = { ...componentDefaults.value }
}

const handleOptionalToggle = (control: ControlDefinition, isActive: boolean | undefined) => {
  const checked = Boolean(isActive)

  if (!isControlOptional(control)) {
    return
  }

  if (checked) {
    let value: PlaygroundPropValue

    if (hasOwn(componentDefaults.value, control.key)) {
      value = componentDefaults.value[control.key]
    } else {
      switch (control.type) {
        case 'slider':
          value = control.min ?? 0
          break
        case 'boolean':
          value = false
          break
        case 'textarea':
        case 'text':
        case 'color':
        default:
          value = ''
          break
      }
    }

    demoProps.value[control.key] = value
  } else {
    if (hasOwn(demoProps.value, control.key)) {
      delete demoProps.value[control.key]
    }
  }
}

const loadComponentDefaults = async () => {
  componentDefaults.value = {}
  demoProps.value = {}

  const module = await props.definition.component()
  const flattened: Record<string, PlaygroundPropValue> = {}

  const visit = (value: unknown, path: string[]) => {
    if (typeof value === 'function') {
      visit((value as () => unknown)(), path)
      return
    }

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.entries(value as Record<string, unknown>).forEach(([key, nested]) => {
        visit(nested, [...path, key])
      })
      return
    }

    if (value === undefined) {
      return
    }

    if (path.length > 0) {
      flattened[path.join('.')] = value as PlaygroundPropValue
    }
  }

  const defaultsSource = (module as { defaultProps?: unknown }).defaultProps
  if (defaultsSource && typeof defaultsSource === 'object' && !Array.isArray(defaultsSource)) {
    Object.entries(defaultsSource as Record<string, unknown>).forEach(([key, value]) => {
      visit(value, [key])
    })
  }

  componentDefaults.value = flattened
  applyDefaults()
}

onBeforeMount(() => {
  void loadComponentDefaults()
})

</script>

<template>
  <aside class="card-surface flex h-fit flex-col gap-6 p-6">
    <div class="flex items-center justify-between">
      <p class="text-sm font-semibold uppercase tracking-[0.4em] text-primary-500">{{ t('playground.controls') }}</p>
      <button type="button" class="text-xs font-semibold text-primary-500 transition hover:text-primary-400" @click="applyDefaults">
        {{ t('playground.reset') }}
      </button>
    </div>
    <p class="text-sm text-surface-500 dark:text-surface-400">{{ t('playground.helper') }}</p>
    <form class="flex flex-col gap-6">
      <div v-for="(section, sectionIndex) in controlSections" :key="section.id" class="flex flex-col gap-4">
        <Section
          :section="section"
        >
          <Field
            v-for="control in section.controls"
            :key="control.key"
            :control="control"
            v-model:value="demoProps[control.key]"
            :is-optional="isControlOptional(control)"
            @toggle-optional="handleOptionalToggle(control, $event)"
          />
        </Section>
        <hr
          v-if="section.group && sectionIndex < controlSections.length - 1"
          class="border-0 border-t border-surface-200/70 dark:border-surface-700/70"
        />
      </div>
    </form>
  </aside>
</template>
