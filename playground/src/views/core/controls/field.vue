<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  ElCheckbox,
  ElColorPicker,
  ElFormItem,
  ElInput,
  ElOption,
  ElSelect,
  ElSlider,
  ElSpace,
  ElSwitch,
  ElText,
} from 'element-plus'
import type { ControlDefinition, LocaleCopy, PlaygroundPropValue } from '@/library/types'
import type { SupportedLocale } from '@/i18n'
import { toRgba } from '@shared/color'

const props = defineProps<{
  control: ControlDefinition
  isOptional: boolean
}>()

const valueModel = defineModel<PlaygroundPropValue | undefined>('value')

const isActive = computed(() => valueModel.value !== undefined)

const emit = defineEmits<{
  (event: 'toggle-optional', value: boolean | undefined): void
}>()

const { locale } = useI18n()

const localize = (copy: LocaleCopy) => copy[locale.value as SupportedLocale] ?? copy.en

type SelectOption = { label: string; value: PlaygroundPropValue }

const selectOptions = computed<SelectOption[]>(() =>
  (props.control.options ?? []).map((option) => ({
    label: localize(option.label),
    value: option.value ?? null,
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
  <template v-if="control.type === 'boolean'">
    <ElFormItem>
      <template #label>
        <ElCheckbox
          v-if="isOptional"
          :model-value="isActive"
          @update:model-value="(value) => emit('toggle-optional', Boolean(value))"
        >
          {{ localize(control.label) }}
        </ElCheckbox>
        <span v-else>{{ localize(control.label) }}</span>
      </template>
      <ElSwitch v-if="isActive" v-model="booleanModel" />
      <ElText v-if="control.helperText && isActive" size="small" type="info">
        {{ localize(control.helperText) }}
      </ElText>
    </ElFormItem>
  </template>
  <template v-else>
    <ElFormItem>
      <template #label>
        <ElCheckbox
          v-if="isOptional"
          :model-value="isActive"
          @update:model-value="(value) => emit('toggle-optional', Boolean(value))"
        >
          {{ localize(control.label) }}
        </ElCheckbox>
        <span v-else>{{ localize(control.label) }}</span>
      </template>
      <template v-if="control.type === 'text'">
        <ElInput v-if="isActive" v-model="stringModel" />
      </template>
      <template v-else-if="control.type === 'textarea'">
        <ElInput
          v-if="isActive"
          v-model="stringModel"
          type="textarea"
          :autosize="{ minRows: 4 }"
        />
      </template>
      <template v-else-if="control.type === 'select'">
        <ElSelect v-if="isActive" v-model="valueModel" filterable clearable>
          <ElOption
            v-for="option in selectOptions"
            :key="option.label"
            :label="option.label"
            :value="option.value as any"
          />
        </ElSelect>
      </template>
      <template v-else-if="control.type === 'color'">
        <ElSpace v-if="isActive" alignment="center" wrap>
          <ElColorPicker v-model="colorModel" show-alpha color-format="rgb" />
          <ElInput v-model="stringModel" />
        </ElSpace>
      </template>
      <template v-else-if="control.type === 'slider'">
        <ElSlider
          v-if="isActive"
          v-model="numberModel"
          :min="control.min ?? 0"
          :max="control.max ?? 100"
          :step="control.step ?? 1"
          show-input
        />
      </template>
      <template v-else>
        <ElInput v-if="isActive" v-model="stringModel" />
      </template>
      <ElText v-if="control.helperText && isActive" size="small" type="info">
        {{ localize(control.helperText) }}
      </ElText>
    </ElFormItem>
  </template>
</template>
