<template>
  <div class="props-editor component-lab-card">
    <h3 class="component-lab-section-title">{{ title }}</h3>
    <div class="editor-grid">
      <div v-for="control in controls" :key="control.prop" class="editor-field">
        <label class="editor-label" :for="control.prop">
          {{ t(control.labelKey) }}
        </label>
        <component
          :is="resolveInput(control.type)"
          v-if="resolveInput(control.type)"
          :id="control.prop"
          v-model="localState[control.prop]"
          :placeholder="control.placeholderKey ? t(control.placeholderKey) : ''"
          :min="control.min"
          :max="control.max"
          :step="control.step"
          fluid
          v-bind="control.componentProps"
        />
        <small v-if="control.helperKey" class="editor-helper">
          {{ t(control.helperKey) }}
        </small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  controls: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: 'Props',
  },
});

const emit = defineEmits(['update:modelValue']);
const { t } = useI18n();

const localState = reactive({ ...props.modelValue });

watch(
  () => props.modelValue,
  (value) => {
    Object.keys(localState).forEach((key) => delete localState[key]);
    Object.assign(localState, value ?? {});
  },
  { deep: true },
);

watch(
  localState,
  (value) => {
    emit('update:modelValue', { ...value });
  },
  { deep: true },
);

const inputsMap = {
  text: InputText,
  number: InputNumber,
  textarea: Textarea,
};

const resolveInput = (type) => inputsMap[type] || InputText;
</script>

<style scoped>
.props-editor {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.editor-grid {
  display: grid;
  gap: 1rem;
}

.editor-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.editor-label {
  font-weight: 600;
  font-size: 0.9rem;
}

.editor-helper {
  color: var(--text-color-secondary);
}

:deep(.p-inputtext),
:deep(.p-inputnumber),
:deep(.p-inputtextarea) {
  width: 100%;
}
</style>
