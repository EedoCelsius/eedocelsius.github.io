<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ControlDefinition, LabComponentDefinition, PlaygroundPropValue } from '@/library/catalog'
import Field from './field.vue'
import Section from './section.vue'

const props = defineProps<{
  definition: LabComponentDefinition
  props?: Record<string, PlaygroundPropValue>
}>()

const { t } = useI18n()

const cloneProps = (value?: Record<string, PlaygroundPropValue>) => {
  if (!value) {
    return {}
  }

  return Object.keys(value).reduce<Record<string, PlaygroundPropValue>>((accumulator, key) => {
    accumulator[key] = value[key]
    return accumulator
  }, {})
}

const componentDefaults = ref<Record<string, PlaygroundPropValue>>({})
const currentProps = defineModel<Record<string, PlaygroundPropValue>>('props', { default: () => ({}) })
const activeControls = reactive<Record<string, boolean>>({})
const storedOptionalValues = reactive<Record<string, PlaygroundPropValue>>({})

const controlSections = computed(() => {
  const UNGROUPED_ID = '__ungrouped__'
  const sections: { id: string; group?: ControlDefinition['group']; controls: ControlDefinition[] }[] = []
  const sectionMap = new Map<string, { id: string; group?: ControlDefinition['group']; controls: ControlDefinition[] }>()

  props.definition.controls.forEach((control) => {
    const identifier = control.group?.id ?? UNGROUPED_ID
    let section = sectionMap.get(identifier)
    if (!section) {
      section = {
        id: identifier,
        group: control.group,
        controls: [],
      }
      sectionMap.set(identifier, section)
      sections.push(section)
    }

    section.controls.push(control)
  })

  return sections
})

const hasOwn = (object: Record<string, unknown>, key: string) => Object.prototype.hasOwnProperty.call(object, key)

const isControlOptional = (control: ControlDefinition) => !hasOwn(componentDefaults.value, control.key)
const isControlActive = (control: ControlDefinition) => !isControlOptional(control) || activeControls[control.key] === true

const applyDefaults = (defaults: Record<string, PlaygroundPropValue>) => {
  const clonedDefaults = cloneProps(defaults)
  Object.keys(currentProps).forEach((key) => delete currentProps[key])
  Object.entries(clonedDefaults).forEach(([key, value]) => {
    const control = props.definition.controls.find((item) => item.key === key)
    if (!control || isControlActive(control)) {
      currentProps[key] = value
    }
  })
}

const resetActiveControls = () => {
  Object.keys(activeControls).forEach((key) => delete activeControls[key])
  Object.keys(storedOptionalValues).forEach((key) => delete storedOptionalValues[key])

  props.definition.controls.forEach((control) => {
    activeControls[control.key] = !isControlOptional(control)
  })
}

const handleOptionalToggle = (control: ControlDefinition, isActive: boolean | undefined) => {
  const checked = Boolean(isActive)

  if (!isControlOptional(control)) {
    activeControls[control.key] = true
    return
  }

  if (checked) {
    let value: PlaygroundPropValue

    if (hasOwn(storedOptionalValues, control.key)) {
      value = storedOptionalValues[control.key]
    } else if (hasOwn(componentDefaults.value, control.key)) {
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

    currentProps[control.key] = value
  } else {
    if (hasOwn(currentProps, control.key)) {
      storedOptionalValues[control.key] = currentProps[control.key]
      delete currentProps[control.key]
    }
  }

  activeControls[control.key] = checked
}

let definitionLoadToken = 0

watch(
  () => props.definition,
  async (nextDefinition) => {
    const token = ++definitionLoadToken
    componentDefaults.value = {}
    Object.keys(currentProps).forEach((key) => delete currentProps[key])
    Object.keys(activeControls).forEach((key) => delete activeControls[key])
    Object.keys(storedOptionalValues).forEach((key) => delete storedOptionalValues[key])
    const module = await nextDefinition.component()
    if (token !== definitionLoadToken) {
      return
    }
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

    const defaults = cloneProps(flattened)
    componentDefaults.value = defaults
    resetActiveControls()
    applyDefaults(defaults)
  },
  { immediate: true }
)

const resetProps = () => {
  resetActiveControls()
  applyDefaults(componentDefaults.value)
}

</script>

<template>
  <aside class="card-surface flex h-fit flex-col gap-6 p-6">
    <div class="flex items-center justify-between">
      <p class="text-sm font-semibold uppercase tracking-[0.4em] text-primary-500">{{ t('playground.controls') }}</p>
      <button type="button" class="text-xs font-semibold text-primary-500 transition hover:text-primary-400" @click="resetProps">
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
            v-model:value="currentProps[control.key]"
            :is-optional="isControlOptional(control)"
            :is-active="isControlActive(control)"
            @toggle-optional="handleOptionalToggle(control, $event)"
          />
        </Section>
        <hr
          v-if="sectionIndex < controlSections.length - 1"
          class="border-0 border-t border-surface-200/70 dark:border-surface-700/70"
        />
      </div>
    </form>
  </aside>
</template>
