<template>
  <div v-if="definition" class="playground">
    <RouterLink class="back-link" to="/">
      <i class="pi pi-arrow-left"></i>
      <span>{{ t('component.back') }}</span>
    </RouterLink>

    <div class="header">
      <h1 class="section-title">{{ t(definition.nameKey) }}</h1>
      <p class="section-subtitle">{{ t(definition.descriptionKey) }}</p>
    </div>

    <div class="layout">
      <section class="preview surface-card">
        <h2>{{ t('labels.preview') }}</h2>
        <div class="preview-content">
          <component :is="definition.component" v-bind="currentProps">
            <template v-if="definition.id === 'blur-overlay'">
              <div class="preview-block">
                <h3>Calm background</h3>
                <p>
                  This area simulates underlying content. Toggle the overlay visibility to
                  observe the blur behavior.
                </p>
              </div>
            </template>
            <template v-else-if="definition.id === 'loading-overlay'">
              <div class="preview-block">
                <h3>Simulated section</h3>
                <p>Wrap any content to display the tranquil loading state.</p>
              </div>
            </template>
          </component>
        </div>
      </section>

      <section class="controls surface-card">
        <div class="controls-header">
          <h2>{{ t('component.controls') }}</h2>
          <Button text size="small" icon="pi pi-refresh" :label="t('component.reset')" @click="reset" />
        </div>
        <div class="control-grid">
          <div v-for="control in definition.controls" :key="control.key" class="control">
            <label :for="control.key">{{ t(control.labelKey) }}</label>
            <component
              :is="resolveControlComponent(control.type)"
              v-model="currentProps[control.key]"
              :id="control.key"
              :options="control.options"
              class="control-input"
              v-bind="controlProps(control.type)"
            />
            <small v-if="control.type === 'color'" class="color-preview">{{ currentProps[control.key] }}</small>
          </div>
        </div>
        <Divider />
        <div class="props-preview">
          <h3>{{ t('labels.props') }}</h3>
          <pre>{{ formattedProps }}</pre>
        </div>
      </section>
    </div>
  </div>
  <div v-else class="not-found surface-card">
    <h1>{{ t('component.notFound') }}</h1>
    <RouterLink class="back-link" to="/">{{ t('component.back') }}</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { componentMap, type ControlType } from '@/data/componentRegistry';

const props = defineProps<{ id: string }>();

const { t } = useI18n();

const definition = computed(() => componentMap[props.id]);
const currentProps = reactive<Record<string, any>>({});

function initializeProps() {
  if (!definition.value) {
    return;
  }
  Object.assign(currentProps, JSON.parse(JSON.stringify(definition.value.initialProps)));
}

initializeProps();

watch(
  () => props.id,
  () => {
    for (const key of Object.keys(currentProps)) {
      delete currentProps[key];
    }
    initializeProps();
  }
);

function reset() {
  initializeProps();
}

const formattedProps = computed(() => JSON.stringify(currentProps, null, 2));

function resolveControlComponent(type: ControlType) {
  switch (type) {
    case 'text':
      return 'InputText';
    case 'textarea':
      return 'Textarea';
    case 'color':
      return 'ColorPicker';
    case 'boolean':
      return 'InputSwitch';
    case 'select':
      return 'Dropdown';
    default:
      return 'InputText';
  }
}

function controlProps(type: ControlType) {
  switch (type) {
    case 'textarea':
      return { autoResize: true, rows: 3 };
    case 'color':
      return { format: 'hex', inline: true };
    case 'select':
      return { optionLabel: 'label', optionValue: 'value' };
    default:
      return {};
  }
}
</script>

<style scoped>
.playground {
  width: min(1080px, 100%);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-muted);
  transition: color 0.2s ease;
}

.back-link:hover {
  color: var(--color-text);
}

.header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.layout {
  display: grid;
  gap: 1.5rem;
}

.preview,
.controls {
  padding: 1.75rem;
}

.preview h2,
.controls h2 {
  margin-top: 0;
  font-size: 1.1rem;
}

.preview-content {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
}

.preview-block {
  padding: 2rem;
  text-align: center;
  color: var(--color-text);
}

.controls-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.control-grid {
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;
}

.control label {
  display: block;
  margin-bottom: 0.35rem;
  font-weight: 600;
}

.control-input :deep(.p-inputtext),
.control-input :deep(.p-inputtextarea) {
  width: 100%;
}

.color-preview {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.props-preview {
  background: rgba(92, 124, 250, 0.08);
  padding: 1rem;
  border-radius: var(--radius-medium);
  overflow-x: auto;
}

.props-preview pre {
  margin: 0;
  font-size: 0.85rem;
}

.not-found {
  width: min(720px, 100%);
  margin: 4rem auto;
  padding: 2rem;
  text-align: center;
}

@media (min-width: 960px) {
  .layout {
    grid-template-columns: 3fr 2fr;
  }
}
</style>
