<template>
  <section class="playground container-narrow">
    <header class="playground__header">
      <h1>{{ t('playground.title') }}</h1>
      <p class="text-secondary">{{ t('playground.selectComponent') }}</p>
    </header>
    <div class="playground__layout">
      <aside class="playground__sidebar surface-card">
        <Listbox
          v-model="selectedComponentId"
          :options="componentOptions"
          option-label="label"
          option-value="id"
          class="component-list"
        >
          <template #option="{ option }">
            <div
              class="component-option"
              :class="{ 'is-selected': option.id === selectedComponentId }"
            >
              <h3>{{ option.label }}</h3>
              <p>{{ option.description }}</p>
            </div>
          </template>
        </Listbox>
      </aside>
      <div class="playground__content">
        <section v-if="activeDefinition" class="playground__controls surface-card">
          <h2>{{ t('playground.controls') }}</h2>
          <div class="control-grid">
            <div v-for="control in activeDefinition.controls" :key="control.prop" class="control-field">
              <label :for="control.prop">{{ t(control.labelKey) }}</label>

              <InputText
                v-if="control.type === 'text'"
                :id="control.prop"
                v-model="componentProps[control.prop]"
                class="w-full"
              />

              <Textarea
                v-else-if="control.type === 'textarea'"
                auto-resize
                rows="3"
                :id="control.prop"
                v-model="componentProps[control.prop]"
                class="w-full"
              />

              <input
                v-else-if="control.type === 'color'"
                type="color"
                :id="control.prop"
                v-model="componentProps[control.prop]"
                class="color-input"
              />

              <div v-else-if="control.type === 'number'" class="number-control">
                <Slider
                  :model-value="Number(componentProps[control.prop])"
                  @update:model-value="(value) => (componentProps[control.prop] = value)"
                  :min="control.min ?? 0"
                  :max="control.max ?? 100"
                  :step="control.step ?? 1"
                >
                </Slider>
                <InputNumber
                  :id="control.prop"
                  v-model="componentProps[control.prop]"
                  :min="control.min"
                  :max="control.max"
                  :step="control.step"
                  showButtons
                />
              </div>

              <small v-if="control.helperText" class="helper">{{ control.helperText }}</small>
            </div>
          </div>
        </section>
        <section class="playground__preview surface-card">
          <h2>{{ t('playground.preview') }}</h2>
          <div class="preview-stage" :class="{ 'preview-stage--overlay': isOverlay }">
            <div class="preview-background">
              <div class="preview-card">
                <h3>Calm workspace</h3>
                <p>Use the controls to tweak tokens.</p>
                <Button label="Primary" severity="secondary" text />
              </div>
            </div>
            <div v-if="!activeDefinition" class="empty-state">
              <p>{{ t('playground.emptyState') }}</p>
            </div>
            <div v-else-if="!isOverlay" class="preview-foreground">
              <component :is="activeDefinition.component" v-bind="componentProps" />
            </div>
            <component
              v-else
              :is="activeDefinition.component"
              v-bind="componentProps"
            >
              <template v-if="activeDefinition.id === 'blur-overlay'">
                <div class="focus-card">
                  <span class="focus-card__label">Focus</span>
                </div>
              </template>
            </component>
            <template v-if="activeDefinition && activeDefinition.id === 'blur-overlay'">
              <div class="focus-card focus-card--foreground">
                <span class="focus-card__label">Focus</span>
              </div>
            </template>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Listbox from 'primevue/listbox';
import Slider from 'primevue/slider';
import Textarea from 'primevue/textarea';
import { componentRegistry, getComponentDefinitionById } from '@/modules/componentRegistry';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const componentOptions = computed(() =>
  componentRegistry.map((item) => ({
    id: item.id,
    label: t(item.nameKey),
    description: t(item.descriptionKey),
  }))
);

const selectedComponentId = ref<string>(
  (route.params.componentId as string) || componentRegistry[0]?.id
);

watch(
  () => route.params.componentId,
  (value) => {
    if (typeof value === 'string' && value !== selectedComponentId.value) {
      selectedComponentId.value = value;
    } else if (!value && componentRegistry[0]) {
      selectedComponentId.value = componentRegistry[0].id;
    }
  },
  { immediate: true }
);

watch(selectedComponentId, (value) => {
  if (!value) {
    return;
  }
  if (value !== route.params.componentId) {
    router.replace({ name: 'playground', params: { componentId: value } });
  }
});

const activeDefinition = computed(() =>
  selectedComponentId.value ? getComponentDefinitionById(selectedComponentId.value) : undefined
);

const componentProps = reactive<Record<string, any>>({});

watch(
  () => activeDefinition.value,
  (definition) => {
    if (definition) {
      Object.keys(componentProps).forEach((key) => delete componentProps[key]);
      Object.assign(componentProps, definition.defaultProps);
    }
  },
  { immediate: true }
);

const isOverlay = computed(() => activeDefinition.value?.id.includes('overlay') ?? false);
</script>

<style scoped>
.playground {
  padding: 3rem 0 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.playground__header h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
}

.playground__layout {
  display: grid;
  grid-template-columns: minmax(240px, 320px) 1fr;
  gap: 1.5rem;
}

.playground__sidebar {
  padding: 1rem;
  border-radius: 1.25rem;
  box-shadow: 0 20px 40px -45px rgba(15, 23, 42, 0.7);
}

.component-list {
  width: 100%;
  border: none;
}

.component-option {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.component-option h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
}

.component-option p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-color-secondary);
}

.component-option.is-selected h3 {
  color: var(--primary-color);
}

.playground__content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.playground__controls,
.playground__preview {
  border-radius: 1.25rem;
  padding: 1.5rem;
  box-shadow: 0 20px 45px -48px rgba(15, 23, 42, 0.7);
}

.playground__controls h2,
.playground__preview h2 {
  margin: 0 0 1rem;
  font-size: 1.2rem;
}

.control-grid {
  display: grid;
  gap: 1rem;
}

.control-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-field label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-color);
}

.helper {
  color: var(--text-color-secondary);
}

.color-input {
  height: 2.5rem;
  border-radius: 0.75rem;
  border: 1px solid color-mix(in srgb, var(--surface-300) 40%, transparent);
  background: transparent;
}

.number-control {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.number-control .p-slider {
  flex: 1;
}

.number-control .p-inputnumber {
  width: 7rem;
}

.preview-stage {
  position: relative;
  border-radius: 1.5rem;
  min-height: 360px;
  background: radial-gradient(circle at top, rgba(92, 124, 250, 0.15), transparent 55%),
    var(--surface-0);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.preview-background {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  padding: 2rem;
}

.preview-card {
  background: color-mix(in srgb, var(--surface-0) 80%, transparent);
  border-radius: 1rem;
  padding: 1.5rem;
  width: clamp(220px, 35%, 280px);
  box-shadow: 0 18px 40px -42px rgba(15, 23, 42, 0.85);
}

.preview-card h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
}

.preview-card p {
  margin: 0 0 1rem;
  color: var(--text-color-secondary);
}

.preview-foreground {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  width: 100%;
}

.empty-state {
  position: relative;
  z-index: 2;
  text-align: center;
  color: var(--text-color-secondary);
}

.preview-stage--overlay .preview-background {
  filter: none;
}

.focus-card {
  position: absolute;
  padding: 0.75rem 1.25rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--surface-0) 65%, transparent);
  box-shadow: 0 10px 30px -24px rgba(15, 23, 42, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  z-index: 1;
}

.focus-card__label {
  font-weight: 600;
  color: var(--text-color);
}

.focus-card--foreground {
  position: relative;
  z-index: 2;
  margin-top: 8rem;
}

@media (max-width: 1024px) {
  .playground__layout {
    grid-template-columns: 1fr;
  }

  .playground__sidebar {
    order: 2;
  }
}

@media (max-width: 768px) {
  .preview-stage {
    min-height: 320px;
  }

  .number-control {
    flex-direction: column;
    align-items: flex-start;
  }

  .preview-card {
    width: 100%;
  }
}
</style>
