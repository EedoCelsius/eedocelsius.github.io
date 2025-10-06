<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from 'vue'
import Checkbox from 'primevue/checkbox'
import InputText from 'primevue/inputtext'
import Slider from 'primevue/slider'
import Textarea from 'primevue/textarea'
import { ElColorPicker } from 'element-plus'
import { useI18n } from 'vue-i18n'
import type {
  ControlDefinition,
  LabComponentDefinition,
  LocaleCopy,
  PlaygroundPropValue,
} from '@/library/catalog'
import { toRgba } from '@shared/color'
import type { SupportedLocale } from '@/i18n'

const props = defineProps<{
  definition: LabComponentDefinition
}>()

const emit = defineEmits<{
  (event: 'update:props', value: Record<string, PlaygroundPropValue>): void
  (event: 'update:resolved-props', value: Record<string, unknown>): void
}>()

const { t, locale } = useI18n()

const cloneProps = (value?: Record<string, PlaygroundPropValue>) => {
  if (!value) {
    return {}
  }

  return Object.keys(value).reduce<Record<string, PlaygroundPropValue>>((accumulator, key) => {
    accumulator[key] = value[key]
    return accumulator
  }, {})
}

const sanitizeControlKey = (key: string) => key.replace(/[^a-zA-Z0-9_-]+/g, '-')

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

const getControlLabelId = (control: ControlDefinition) => `${sanitizeControlKey(control.key)}-label`
const getControlInputId = (control: ControlDefinition) => `${sanitizeControlKey(control.key)}-input`
const getControlToggleId = (control: ControlDefinition) => `${sanitizeControlKey(control.key)}-toggle`

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

const localize = (copy: LocaleCopy) => copy[(locale.value as SupportedLocale)] ?? copy.en

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
        <button
          v-if="section.group"
          type="button"
          class="flex items-center justify-between text-left text-xs font-semibold uppercase tracking-[0.35em] text-surface-500 transition hover:text-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 dark:text-surface-400"
          :aria-expanded="isSectionCollapsed(section.id, true) ? 'false' : 'true'"
          @click="toggleSection(section.id)"
        >
          <span>{{ localize(section.group.label) }}</span>
          <i class="pi text-sm" :class="isSectionCollapsed(section.id, true) ? 'pi-angle-down' : 'pi-angle-up'" aria-hidden="true"></i>
        </button>
        <div v-show="!section.group || !isSectionCollapsed(section.id, Boolean(section.group))" class="flex flex-col gap-4">
          <div v-for="control in section.controls" :key="control.key" class="flex flex-col gap-2 text-sm">
            <div v-if="isControlOptional(control)" class="flex items-center gap-2">
              <Checkbox
                :input-id="getControlToggleId(control)"
                :model-value="isControlActive(control)"
                binary
                class="shrink-0"
                :aria-controls="getControlInputId(control)"
                :aria-expanded="isControlActive(control) ? 'true' : 'false'"
                :aria-label="t('playground.toggleControl', { name: localize(control.label) })"
                :title="t('playground.toggleControl', { name: localize(control.label) })"
                @update:model-value="handleOptionalToggle(control, $event)"
              />
              <label :id="getControlLabelId(control)" :for="getControlToggleId(control)" class="cursor-pointer font-medium text-surface-700 dark:text-surface-200">
                {{ localize(control.label) }}
              </label>
            </div>
            <label v-else-if="control.type !== 'boolean'" :for="getControlInputId(control)" class="font-medium text-surface-700 dark:text-surface-200">
              {{ localize(control.label) }}
            </label>
            <template v-if="control.type === 'text'">
              <InputText
                v-if="isControlActive(control)"
                :id="getControlInputId(control)"
                v-model="(currentProps[control.key] as string | undefined)"
                :aria-labelledby="isControlOptional(control) ? getControlLabelId(control) : undefined"
                class="w-full"
              />
            </template>
            <template v-else-if="control.type === 'textarea'">
              <Textarea
                v-if="isControlActive(control)"
                :id="getControlInputId(control)"
                v-model="(currentProps[control.key] as string | undefined)"
                rows="4"
                auto-resize
                :aria-labelledby="isControlOptional(control) ? getControlLabelId(control) : undefined"
                class="w-full"
              />
            </template>
            <template v-else-if="control.type === 'color'">
              <div v-if="isControlActive(control)" class="flex items-center gap-3">
                <ElColorPicker
                  :model-value="resolvedColors[control.key] ?? ''"
                  show-alpha
                  color-format="rgb"
                  class="shrink-0"
                  :aria-labelledby="isControlOptional(control) ? getControlLabelId(control) : undefined"
                  @active-change="setColorPropValue(control.key, $event)"
                  @update:model-value="setColorPropValue(control.key, $event)"
                />
                <InputText
                  :id="getControlInputId(control)"
                  v-model="(currentProps[control.key] as string | undefined)"
                  :aria-labelledby="isControlOptional(control) ? getControlLabelId(control) : undefined"
                  class="flex-1"
                />
              </div>
            </template>
            <template v-else-if="control.type === 'slider'">
              <div v-if="isControlActive(control)" class="flex items-center gap-3">
                <Slider
                  :id="getControlInputId(control)"
                  v-model="(currentProps[control.key] as number | undefined)"
                  :min="control.min ?? 0"
                  :max="control.max ?? 100"
                  :step="control.step ?? 1"
                  :aria-labelledby="isControlOptional(control) ? getControlLabelId(control) : undefined"
                  class="flex-1"
                />
                <span class="w-12 text-right text-xs font-semibold text-primary-500">{{ currentProps[control.key] }}</span>
              </div>
            </template>
            <template v-else-if="control.type === 'boolean'">
              <div v-if="isControlActive(control)" class="inline-flex items-center gap-3">
                <Checkbox :input-id="getControlInputId(control)" v-model="(currentProps[control.key] as boolean | undefined)" binary />
                <label :for="getControlInputId(control)" class="text-sm text-surface-600 dark:text-surface-300">
                  {{ localize(control.label) }}
                </label>
              </div>
            </template>
            <p v-if="control.helperText && isControlActive(control)" class="text-xs text-surface-500 dark:text-surface-400">
              {{ localize(control.helperText) }}
            </p>
          </div>
        </div>
        <hr v-if="sectionIndex < controlSections.length - 1" class="border-0 border-t border-surface-200/70 dark:border-surface-700/70" />
      </div>
    </form>
  </aside>
</template>
