<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  ElCheckbox,
  ElColorPicker,
  ElInput,
  ElOption,
  ElRadio,
  ElRadioGroup,
  ElSelect,
  ElSlider,
  ElText,
} from 'element-plus'
import type { CheckboxValueType } from 'element-plus'
import type { ControlDefinition, LocaleCopy, ShowcasePropValue } from '@/library/types'
import type { SupportedLocale } from '@/i18n'
import { toRgba } from '@shared/color'

const props = defineProps<{
  control: ControlDefinition
  isOptional: boolean
}>()

const valueModel = defineModel<ShowcasePropValue | undefined>('value')

const isActive = computed(() => valueModel.value !== undefined)

const emit = defineEmits<{
  (event: 'toggle-optional', value: boolean | undefined): void
}>()

const { t, locale } = useI18n()

const localize = (copy: LocaleCopy) => copy[locale.value as SupportedLocale] ?? copy.en

const sanitizeControlKey = (key: string) => key.replace(/[^a-zA-Z0-9_-]+/g, '-')

const controlKey = computed(() => sanitizeControlKey(props.control.key))
const inputId = computed(() => `${controlKey.value}-input`)
const toggleId = computed(() => `${controlKey.value}-toggle`)

const toggleLabel = computed(() =>
  t('showcase.toggleControl', { name: localize(props.control.label) })
)

const handleOptionalCheckboxUpdate = (value: CheckboxValueType) => {
  emit('toggle-optional', value === true)
}

const selectOptions = computed(() =>
  (props.control.options ?? []).map((option) => ({
    label: localize(option.label),
    value: option.value,
  }))
)

const stringModel = computed<string | undefined>({
  get: () => (typeof valueModel.value === 'string' ? valueModel.value : undefined),
  set: (value) => { valueModel.value = value },
})

const colorModel = computed<string | null>({
  get: () => toRgba(stringModel.value),
  set: (value) => { valueModel.value = value ?? '' },
})

const numberModel = computed<number | undefined>({
  get: () => (typeof valueModel.value === 'number' ? valueModel.value : undefined),
  set: (value) => { valueModel.value = value },
})

const booleanModel = computed<boolean | undefined>({
  get: () => (typeof valueModel.value === 'boolean' ? valueModel.value : undefined),
  set: (value) => { valueModel.value = value },
})
</script>

<template>
  <div class="flex flex-col gap-2 text-sm">
    <div v-if="isOptional" class="flex items-center">
      <ElCheckbox
        :id="toggleId"
        :model-value="isActive"
        class="shrink-0"
        :aria-controls="inputId"
        :aria-expanded="isActive ? 'true' : 'false'"
        :aria-label="toggleLabel"
        :title="toggleLabel"
        :label="localize(control.label)"
        @update:model-value="handleOptionalCheckboxUpdate"
      />
    </div>
    <ElText v-else class="self-start font-medium">{{ localize(control.label) }}</ElText>
    <template v-if="control.type === 'text'">
      <ElInput
        v-if="isActive"
        :id="inputId"
        v-model="stringModel"
        :aria-label="isOptional ? localize(control.label) : undefined"
        class="w-full"
      />
    </template>
    <template v-else-if="control.type === 'textarea'">
      <ElInput
        v-if="isActive"
        :id="inputId"
        v-model="stringModel"
        type="textarea"
        :autosize="{ minRows: 4 }"
        :aria-label="isOptional ? localize(control.label) : undefined"
        class="w-full"
      />
    </template>
    <template v-else-if="control.type === 'select'">
      <ElSelect
        v-if="isActive"
        :id="inputId"
        v-model="valueModel"
        :aria-label="isOptional ? localize(control.label) : undefined"
        class="w-full"
      >
        <ElOption
          v-for="option in selectOptions"
          :key="`${option.label}-${String(option.value)}`"
          :label="option.label"
          :value="option.value as any"
        />
      </ElSelect>
    </template>
    <template v-else-if="control.type === 'color'">
      <div v-if="isActive" class="flex items-center gap-3">
        <ElColorPicker
          v-model="colorModel"
          show-alpha
          color-format="rgb"
          class="shrink-0"
          :aria-label="isOptional ? localize(control.label) : undefined"
        />
        <ElInput
          :id="inputId"
          v-model="stringModel"
          :aria-label="isOptional ? localize(control.label) : undefined"
          class="flex-1"
        />
      </div>
    </template>
    <template v-else-if="control.type === 'slider'">
      <ElSlider
        v-if="isActive"
        :id="inputId"
        v-model="numberModel"
        :min="control.min ?? 0"
        :max="control.max ?? 100"
        :step="control.step ?? 1"
        :aria-label="isOptional ? localize(control.label) : undefined"
        class="flex-1 py-2"
      />
    </template>
    <template v-else-if="control.type === 'boolean'">
      <ElRadioGroup
        v-if="isActive"
        :id="inputId"
        v-model="booleanModel"
        class="flex gap-4"
        :aria-label="isOptional ? localize(control.label) : undefined"
      >
        <ElRadio :label="true" />
        <ElRadio :label="false" />
      </ElRadioGroup>
    </template>
    <ElText
      v-if="control.helperText && isActive"
      tag="p"
      size="small"
      type="info"
      class="self-start"
    >
      {{ localize(control.helperText) }}
    </ElText>
  </div>
</template>
