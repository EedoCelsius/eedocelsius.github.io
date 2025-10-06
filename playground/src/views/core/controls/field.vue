<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Checkbox from 'primevue/checkbox'
import InputText from 'primevue/inputtext'
import Slider from 'primevue/slider'
import Textarea from 'primevue/textarea'
import { ElColorPicker } from 'element-plus'
import type { ControlDefinition, LocaleCopy, PlaygroundPropValue } from '@/library/catalog'
import type { SupportedLocale } from '@/i18n'
import { toRgba } from '@shared/color'

const props = defineProps<{
  control: ControlDefinition
  value: PlaygroundPropValue | undefined
  isOptional: boolean
  isActive: boolean
}>()

const emit = defineEmits<{
  (event: 'update:value', value: PlaygroundPropValue | undefined): void
  (event: 'toggle-optional', value: boolean | undefined): void
}>()

const { t, locale } = useI18n()

const localize = (copy: LocaleCopy) => copy[locale.value as SupportedLocale] ?? copy.en

const sanitizeControlKey = (key: string) => key.replace(/[^a-zA-Z0-9_-]+/g, '-')

const controlKey = computed(() => sanitizeControlKey(props.control.key))
const labelId = computed(() => `${controlKey.value}-label`)
const inputId = computed(() => `${controlKey.value}-input`)
const toggleId = computed(() => `${controlKey.value}-toggle`)

const toggleLabel = computed(() =>
  t('playground.toggleControl', { name: localize(props.control.label) })
)

const stringModel = computed<string | undefined>({
  get: () => (typeof props.value === 'string' ? props.value : undefined),
  set: (value) => emit('update:value', value),
})

const colorModel = computed<string | null>({
  get: () => toRgba(stringModel.value),
  set: (value) => emit('update:value', value ?? ''),
})

const numberModel = computed<number | undefined>({
  get: () => (typeof props.value === 'number' ? props.value : undefined),
  set: (value) => emit('update:value', value),
})

const booleanModel = computed<boolean | undefined>({
  get: () => (typeof props.value === 'boolean' ? props.value : undefined),
  set: (value) => emit('update:value', value),
})
</script>

<template>
  <div class="flex flex-col gap-2 text-sm">
    <div v-if="isOptional" class="flex items-center gap-2">
      <Checkbox
        :input-id="toggleId"
        :model-value="isActive"
        binary
        class="shrink-0"
        :aria-controls="inputId"
        :aria-expanded="isActive ? 'true' : 'false'"
        :aria-label="toggleLabel"
        :title="toggleLabel"
        @update:model-value="emit('toggle-optional', $event)"
      />
      <label :id="labelId" :for="toggleId" class="cursor-pointer font-medium text-surface-700 dark:text-surface-200">
        {{ localize(control.label) }}
      </label>
    </div>
    <label v-else-if="control.type !== 'boolean'" :for="inputId" class="font-medium text-surface-700 dark:text-surface-200">
      {{ localize(control.label) }}
    </label>
    <template v-if="control.type === 'text'">
      <InputText
        v-if="isActive"
        :id="inputId"
        v-model="stringModel"
        :aria-labelledby="isOptional ? labelId : undefined"
        class="w-full"
      />
    </template>
    <template v-else-if="control.type === 'textarea'">
      <Textarea
        v-if="isActive"
        :id="inputId"
        v-model="stringModel"
        rows="4"
        auto-resize
        :aria-labelledby="isOptional ? labelId : undefined"
        class="w-full"
      />
    </template>
    <template v-else-if="control.type === 'color'">
      <div v-if="isActive" class="flex items-center gap-3">
        <ElColorPicker
          v-model="colorModel"
          show-alpha
          color-format="rgb"
          class="shrink-0"
          :aria-labelledby="isOptional ? labelId : undefined"
        />
        <InputText
          :id="inputId"
          v-model="stringModel"
          :aria-labelledby="isOptional ? labelId : undefined"
          class="flex-1"
        />
      </div>
    </template>
    <template v-else-if="control.type === 'slider'">
      <div v-if="isActive" class="flex items-center gap-3">
        <Slider
          :id="inputId"
          v-model="numberModel"
          :min="control.min ?? 0"
          :max="control.max ?? 100"
          :step="control.step ?? 1"
          :aria-labelledby="isOptional ? labelId : undefined"
          class="flex-1"
        />
        <span class="w-12 text-right text-xs font-semibold text-primary-500">{{ numberModel ?? '' }}</span>
      </div>
    </template>
    <template v-else-if="control.type === 'boolean'">
      <div v-if="isActive" class="inline-flex items-center gap-3">
        <Checkbox :input-id="inputId" v-model="booleanModel" binary />
        <label :for="inputId" class="text-sm text-surface-600 dark:text-surface-300">
          {{ localize(control.label) }}
        </label>
      </div>
    </template>
    <p v-if="control.helperText && isActive" class="text-xs text-surface-500 dark:text-surface-400">
      {{ localize(control.helperText) }}
    </p>
  </div>
</template>
