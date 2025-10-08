<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElLink, ElText } from 'element-plus'
import Card from 'primevue/card'
import type { ComponentDemo } from '@/demos/types'
import type { ControlDefinition, GroupDefinition, PlaygroundPropValue } from '@/library/types'
import Field from './field.vue'
import Section from './section.vue'

const props = defineProps<{
  demo: ComponentDemo
}>()

const { t } = useI18n()

const componentDefaults = ref<Record<string, PlaygroundPropValue>>({})
const demoProps = defineModel<Record<string, PlaygroundPropValue>>('props', { default: () => ({}) })

type ControlSection = { id: string; group?: GroupDefinition; controls: ControlDefinition[] }

const controlSections = computed<ControlSection[]>(() =>
  props.demo.properties.map((property) => {
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
)

const hasControls = computed(() =>
  controlSections.value.some((section) => section.controls.length > 0)
)

const hasOwn = (object: Record<string, unknown>, key: string) => Object.prototype.hasOwnProperty.call(object, key)

const flattenDefaults = (defaults: Record<string, unknown> | undefined) => {
  const flattened: Record<string, PlaygroundPropValue> = {}

  if (!defaults) {
    return flattened
  }

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

  Object.entries(defaults).forEach(([key, value]) => {
    visit(value, [key])
  })

  return flattened
}

const applyDefaults = () => {
  demoProps.value = { ...componentDefaults.value }
}

const isControlOptional = (control: ControlDefinition) => !hasOwn(componentDefaults.value, control.key)

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
        case 'select':
          value = control.options?.[0]?.value ?? null
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
  } else if (hasOwn(demoProps.value, control.key)) {
    delete demoProps.value[control.key]
  }
}

watch(
  () => props.demo.defaultProps,
  (defaults) => {
    componentDefaults.value = flattenDefaults(defaults)
    applyDefaults()
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <Card>
    <template #title>
      {{ t('playground.controls') }}
    </template>
    <template #content>
      <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-2">
          <ElText tag="p" size="small" type="info" class="self-start">{{ t('playground.helper') }}</ElText>
          <ElLink
            type="primary"
            :underline="false"
            class="self-end w-fit text-xs"
            @click="applyDefaults"
          >
            {{ t('playground.reset') }}
          </ElLink>
        </div>
        <form class="flex flex-col">
          <template v-if="hasControls">
            <Section
              v-for="section in controlSections"
              :key="section.id"
              :section="section"
              :class="['first:mt-0', section.group ? 'mt-0' : 'mt-5']"
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
          </template>
          <ElText v-else tag="p" size="small" type="info">{{ t('playground.noProps') }}</ElText>
        </form>
      </div>
    </template>
  </Card>
</template>
