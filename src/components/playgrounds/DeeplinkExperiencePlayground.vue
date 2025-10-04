<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ComponentPlayground from './ComponentPlayground.vue'
import type { PropControlDefinition } from './types'
import DeeplinkExperience from '@/components/library/deeplink/DeeplinkExperience.vue'
import type { LibraryComponentDefinition } from '@/component-registry/types'

type DeeplinkExperienceInstance = InstanceType<typeof DeeplinkExperience>

interface DeeplinkExperienceProps {
  appName: string
  deeplinkUrl: string
  icon: string
  timeout: number
}

const props = defineProps<{ definition: LibraryComponentDefinition }>()

const { t } = useI18n()

const componentRef = ref<DeeplinkExperienceInstance | null>(null)

const controls = computed<PropControlDefinition[]>(() => [
  {
    prop: 'appName',
    type: 'text',
    labelKey: `${props.definition.i18nKey}.playground.controls.appName.label`,
    helperKey: `${props.definition.i18nKey}.playground.controls.appName.helper`,
  },
  {
    prop: 'deeplinkUrl',
    type: 'url',
    labelKey: `${props.definition.i18nKey}.playground.controls.deeplinkUrl.label`,
    helperKey: `${props.definition.i18nKey}.playground.controls.deeplinkUrl.helper`,
  },
  {
    prop: 'icon',
    type: 'url',
    labelKey: `${props.definition.i18nKey}.playground.controls.icon.label`,
    helperKey: `${props.definition.i18nKey}.playground.controls.icon.helper`,
  },
  {
    prop: 'timeout',
    type: 'number',
    labelKey: `${props.definition.i18nKey}.playground.controls.timeout.label`,
    helperKey: `${props.definition.i18nKey}.playground.controls.timeout.helper`,
    min: 0.5,
    max: 10,
    step: 0.5,
  },
])

const defaultProps = computed<DeeplinkExperienceProps>(() => ({
  appName: String(props.definition.defaultProps.appName ?? ''),
  deeplinkUrl: String(props.definition.defaultProps.deeplinkUrl ?? ''),
  icon: String(props.definition.defaultProps.icon ?? ''),
  timeout: Number(props.definition.defaultProps.timeout ?? 1.5),
}))

const defaultValues = computed<Record<string, unknown>>(() => ({
  ...defaultProps.value,
}))

const mapToComponentProps = (values: Record<string, unknown>): DeeplinkExperienceProps => ({
  appName: String(values.appName ?? defaultProps.value.appName),
  deeplinkUrl: String(values.deeplinkUrl ?? defaultProps.value.deeplinkUrl),
  icon: String(values.icon ?? defaultProps.value.icon),
  timeout: Number(values.timeout ?? defaultProps.value.timeout),
})

const trigger = () => {
  componentRef.value?.trigger()
}

const reset = () => {
  componentRef.value?.close()
}
</script>

<template>
  <ComponentPlayground
    :component="DeeplinkExperience"
    :controls="controls"
    :default-values="defaultValues"
    :title="t(`${definition.i18nKey}.playground.title`)"
    :description="t(`${definition.i18nKey}.playground.description`)"
    @reset="reset"
  >
    <template #preview="{ state }">
      <DeeplinkExperience ref="componentRef" v-bind="mapToComponentProps(state)" />
    </template>
    <template #actions>
      <div class="flex justify-content-end">
        <Button class="p-button-rounded" icon="pi pi-bolt" @click="trigger">
          {{ t(`${definition.i18nKey}.playground.trigger`) }}
        </Button>
      </div>
    </template>
  </ComponentPlayground>
</template>
