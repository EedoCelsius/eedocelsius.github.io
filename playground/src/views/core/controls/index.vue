<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ControlDefinition, LabComponentDefinition, PlaygroundPropValue } from '@/library/catalog'
import { toRgba } from '@shared/color'
import ControlField from './components/ControlField.vue'
import ControlSection from './components/ControlSection.vue'

const props = defineProps<{
  definition: LabComponentDefinition
}>()

const emit = defineEmits<{
  (event: 'update:props', value: Record<string, PlaygroundPropValue>): void
  (event: 'update:resolved-props', value: Record<string, unknown>): void
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
const currentProps = reactive<Record<string, PlaygroundPropValue>>({})
const resolvedColors = reactive<Record<string, string>>({})
const activeControls = reactive<Record<string, boolean>>({})
const storedOptionalValues = reactive<Record<string, PlaygroundPropValue>>({})
const collapsedSections = reactive<Record<string, boolean>>({})

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

watchEffect(() => {
  const sections = controlSections.value
  const validSectionIds = new Set(sections.map((section) => section.id))

  sections.forEach((section) => {
    if (!Object.prototype.hasOwnProperty.call(collapsedSections, section.id)) {
      collapsedSections[section.id] = section.group ? true : false
      return
    }

    if (!section.group) {
      collapsedSections[section.id] = false
    }
  })

  Object.keys(collapsedSections).forEach((id) => {
    if (!validSectionIds.has(id)) {
      delete collapsedSections[id]
    }
  })
})

const hasOwn = (object: Record<string, unknown>, key: string) => Object.prototype.hasOwnProperty.call(object, key)

const isControlOptional = (control: ControlDefinition) => !hasOwn(componentDefaults.value, control.key)
const isControlActive = (control: ControlDefinition) => !isControlOptional(control) || activeControls[control.key] === true

const applyDefaults = (defaults: Record<string, PlaygroundPropValue>) => {
  const clonedDefaults = cloneProps(defaults)
  Object.keys(currentProps).forEach((key) => delete currentProps[key])
  Object.keys(resolvedColors).forEach((key) => delete resolvedColors[key])
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
    if (control.type === 'color') {
      delete resolvedColors[control.key]
    }
  }

  activeControls[control.key] = checked
}

const updateControlValue = (key: string, value: PlaygroundPropValue | undefined) => {
  if (value === undefined) {
    delete currentProps[key]
    return
  }

  currentProps[key] = value
}

let definitionLoadToken = 0

watch(
  () => props.definition,
  async (nextDefinition) => {
    const token = ++definitionLoadToken
    componentDefaults.value = {}
    Object.keys(currentProps).forEach((key) => delete currentProps[key])
    Object.keys(resolvedColors).forEach((key) => delete resolvedColors[key])
    Object.keys(activeControls).forEach((key) => delete activeControls[key])
    Object.keys(storedOptionalValues).forEach((key) => delete storedOptionalValues[key])
    Object.keys(collapsedSections).forEach((key) => delete collapsedSections[key])
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

watchEffect(() => {
  const keys = props.definition.controls
    .filter((control) => control.type === 'color')
    .map((control) => control.key)

  const activeKeys = new Set(keys)
  keys.forEach((key) => {
    const value = currentProps[key]
    resolvedColors[key] = toRgba(typeof value === 'string' ? value : undefined)
  })

  Object.keys(resolvedColors).forEach((key) => {
    if (!activeKeys.has(key)) {
      delete resolvedColors[key]
    }
  })
})

const resetProps = () => {
  resetActiveControls()
  applyDefaults(componentDefaults.value)
}

const setColorPropValue = (key: string, value: string | null) => {
  currentProps[key] = (value ?? '') as PlaygroundPropValue
}

const toggleSection = (sectionId: string) => {
  collapsedSections[sectionId] = !(collapsedSections[sectionId] ?? true)
}

const resolvedComponentProps = computed(() => {
  const expanded: Record<string, unknown> = {}

  Object.entries(currentProps).forEach(([path, value]) => {
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
  currentProps,
  (value) => {
    emit('update:props', cloneProps(value))
  },
  { immediate: true, deep: true }
)

watch(
  resolvedComponentProps,
  (value) => {
    emit('update:resolved-props', value)
  },
  { immediate: true, deep: true }
)

const isSectionCollapsed = (sectionId: string, hasGroup: boolean) => {
  if (!hasGroup) {
    return false
  }

  return collapsedSections[sectionId] ?? true
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
        <ControlSection
          :section="section"
          :is-collapsed="isSectionCollapsed(section.id, Boolean(section.group))"
          :has-group="Boolean(section.group)"
          @toggle="toggleSection(section.id)"
        >
          <ControlField
            v-for="control in section.controls"
            :key="control.key"
            :control="control"
            :value="currentProps[control.key] as PlaygroundPropValue | undefined"
            :is-optional="isControlOptional(control)"
            :is-active="isControlActive(control)"
            :resolved-color="resolvedColors[control.key]"
            @toggle-optional="handleOptionalToggle(control, $event)"
            @update:value="updateControlValue(control.key, $event)"
            @update-color="setColorPropValue(control.key, $event)"
          />
        </ControlSection>
        <hr
          v-if="sectionIndex < controlSections.length - 1"
          class="border-0 border-t border-surface-200/70 dark:border-surface-700/70"
        />
      </div>
    </form>
  </aside>
</template>
