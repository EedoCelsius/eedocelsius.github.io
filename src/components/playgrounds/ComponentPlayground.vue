<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import type { Component } from 'vue'
import { useI18n } from 'vue-i18n'
import type { PropControlDefinition } from './types'

const props = defineProps<{
  component: Component
  controls: PropControlDefinition[]
  defaultValues: Record<string, unknown>
  title: string
  description?: string
}>()

const emit = defineEmits<{
  reset: []
}>()

const { t } = useI18n()

const state = reactive({ ...props.defaultValues })

watch(
  () => props.defaultValues,
  (values) => {
    Object.assign(state, values)
  },
  { deep: true },
)

const hasControls = computed(() => props.controls.length > 0)

const reset = () => {
  Object.assign(state, props.defaultValues)
  emit('reset')
}
</script>

<template>
  <Card class="component-playground">
    <template #title>
      <div class="flex align-items-start justify-content-between gap-3">
        <div>
          <h3 class="m-0">{{ title }}</h3>
          <p v-if="description" class="m-0 text-color-secondary text-sm">{{ description }}</p>
        </div>
        <Button text size="small" icon="pi pi-refresh" @click="reset">
          {{ t('component.reset') }}
        </Button>
      </div>
    </template>
    <template #content>
      <div class="grid">
        <div class="col-12 md:col-4" v-if="hasControls">
          <div class="flex flex-column gap-3">
            <div v-for="control in controls" :key="control.prop" class="flex flex-column gap-2">
              <label :for="control.prop" class="font-semibold">
                {{ t(control.labelKey) }}
              </label>
              <template v-if="control.type === 'text' || control.type === 'url'">
                <InputText
                  :id="control.prop"
                  v-model="(state[control.prop] as string)"
                  :type="control.type === 'url' ? 'url' : 'text'"
                />
              </template>
              <template v-else-if="control.type === 'number'">
                <InputNumber
                  :id="control.prop"
                  v-model="(state[control.prop] as number)"
                  :min="control.min"
                  :max="control.max"
                  :step="control.step ?? 0.1"
                  mode="decimal"
                  show-buttons
                  button-layout="horizontal"
                />
              </template>
              <template v-else-if="control.type === 'textarea'">
                <textarea
                  :id="control.prop"
                  v-model="(state[control.prop] as string)"
                  rows="3"
                  class="p-inputtextarea"
                />
              </template>
              <small v-if="control.helperKey" class="text-color-secondary">{{ t(control.helperKey) }}</small>
            </div>
          </div>
        </div>
        <div :class="['col-12', hasControls ? 'md:col-8' : 'md:col-12']">
          <div class="stage surface-section border-round-xl p-4">
            <slot name="preview" :state="state">
              <component :is="component" v-bind="state" />
            </slot>
          </div>
          <div class="mt-3">
            <slot name="actions" :state="state"></slot>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.component-playground {
  width: 100%;
}

.stage {
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
}

textarea.p-inputtextarea {
  font-family: inherit;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--surface-border);
  background-color: var(--surface-card);
  color: var(--text-color);
}
</style>
