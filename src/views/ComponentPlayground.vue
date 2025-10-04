<template>
  <section class="playground">
    <header class="playground-header">
      <div>
        <h1>{{ t('playground.title') }}</h1>
        <p>{{ t('playground.description') }}</p>
      </div>
      <div class="select-wrapper">
        <label class="visually-hidden" for="component-select">{{ t('playground.chooseComponent') }}</label>
        <select id="component-select" v-model="selectedId" class="control-select">
          <option disabled value="">{{ t('playground.chooseComponent') }}</option>
          <option v-for="definition in componentDefinitions" :key="definition.id" :value="definition.id">
            {{ t(definition.nameKey) }}
          </option>
        </select>
      </div>
    </header>

    <div v-if="activeDefinition" class="playground-content">
      <aside class="controls-panel">
        <header>
          <h2>{{ t('playground.props') }}</h2>
          <button type="button" class="text-button" @click="resetProps">{{ t('playground.reset') }}</button>
        </header>
        <form class="controls-form" @submit.prevent>
          <div v-for="control in activeDefinition.controls" :key="control.key" class="control-group">
            <label :for="`${control.key}-input`">{{ t(control.labelKey) }}</label>
            <template v-if="control.type === 'text'">
              <input
                :id="`${control.key}-input`"
                type="text"
                v-model="propsState[control.key]"
              />
            </template>
            <template v-else-if="control.type === 'color'">
              <input
                :id="`${control.key}-input`"
                type="color"
                v-model="propsState[control.key]"
              />
            </template>
            <template v-else-if="control.type === 'boolean'">
              <label class="switch">
                <input
                  :id="`${control.key}-input`"
                  type="checkbox"
                  v-model="propsState[control.key]"
                />
                <span class="slider"></span>
              </label>
            </template>
            <template v-else-if="control.type === 'textarea'">
              <textarea
                :id="`${control.key}-input`"
                rows="3"
                v-model="propsState[control.key]"
              ></textarea>
            </template>
          </div>
        </form>
      </aside>

      <div class="preview-panel" :class="activeDefinition.previewClass">
        <div class="preview-stage">
          <div class="preview-backdrop">
            <h3>{{ t('common.madeBy') }}</h3>
            <p>Component Lab</p>
          </div>
          <component :is="activeDefinition.component" v-bind="propsState">
            <template v-if="activeDefinition.id === 'qr-code-card'">
              <div class="qr-slot">
                <h3>{{ t('components.qrCodeCard.name') }}</h3>
                <p>{{ t('components.qrCodeCard.description') }}</p>
              </div>
            </template>
            <template v-else-if="activeDefinition.id === 'blur-overlay'">
              <div class="overlay-slot">
                <div class="overlay-card">
                  <h3>{{ t('components.blurOverlay.name') }}</h3>
                  <p>{{ t('components.blurOverlay.description') }}</p>
                </div>
              </div>
            </template>
            <template v-else-if="activeDefinition.id === 'loading-overlay'">
              <div class="overlay-slot">
                <div class="overlay-card">
                  <h3>{{ t('components.loadingOverlay.name') }}</h3>
                  <p>{{ t('components.loadingOverlay.description') }}</p>
                </div>
              </div>
            </template>
          </component>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <p>{{ t('playground.noComponent') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { componentDefinitions, componentLookup } from '@/data/componentRegistry';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const selectedId = ref<string>((route.query.component as string) || componentDefinitions[0]?.id || '');

watch(
  () => route.query.component,
  (value) => {
    if (typeof value === 'string' && value !== selectedId.value) {
      selectedId.value = value;
    }
  }
);

watch(selectedId, (value) => {
  const queryValue = value || undefined;
  if (route.query.component === queryValue) {
    return;
  }

  router.replace({
    query: {
      ...route.query,
      component: queryValue
    }
  });
});

const activeDefinition = computed(() => componentLookup[selectedId.value]);

const propsState = reactive<Record<string, any>>({});

watch(
  activeDefinition,
  (definition) => {
    if (!definition) {
      Object.keys(propsState).forEach((key) => delete propsState[key]);
      return;
    }
    Object.keys(propsState).forEach((key) => delete propsState[key]);
    Object.assign(propsState, definition.initialProps);
  },
  { immediate: true }
);

function resetProps() {
  const definition = activeDefinition.value;
  if (!definition) return;
  Object.keys(propsState).forEach((key) => delete propsState[key]);
  Object.assign(propsState, definition.initialProps);
}
</script>

<style scoped>
.playground {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.playground-header {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-end;
  justify-content: space-between;
}

.playground-header h1 {
  margin: 0;
}

.playground-header p {
  margin: 0.5rem 0 0;
  color: var(--text-muted);
}

.select-wrapper {
  min-width: 220px;
}

.control-select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border-subtle);
  background: var(--surface-layer);
  color: var(--text-primary);
}

.playground-content {
  display: grid;
  grid-template-columns: minmax(280px, 320px) 1fr;
  gap: 2rem;
}

.controls-panel {
  padding: 1.5rem;
  border-radius: 1.25rem;
  background: color-mix(in srgb, var(--surface-card) 92%, transparent);
  border: 1px solid var(--border-subtle);
}

.controls-panel header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.controls-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-group label {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.control-group input[type='text'],
.control-group input[type='color'],
.control-group textarea {
  border-radius: 0.75rem;
  border: 1px solid var(--border-subtle);
  background: var(--surface-layer);
  color: var(--text-primary);
  padding: 0.5rem 0.75rem;
  font-size: 0.95rem;
}

.control-group input[type='color'] {
  padding: 0;
  height: 2.5rem;
}

.control-group textarea {
  resize: vertical;
}

.switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  width: 44px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  inset: 0;
  background: color-mix(in srgb, var(--accent-color) 20%, transparent);
  border-radius: 999px;
  transition: background 0.2s ease;
}

.slider::after {
  content: '';
  position: absolute;
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 3px;
  border-radius: 50%;
  background: var(--surface-card);
  transition: transform 0.2s ease;
}

.switch input:checked + .slider {
  background: color-mix(in srgb, var(--accent-color) 80%, transparent);
}

.switch input:checked + .slider::after {
  transform: translateX(18px);
}

.text-button {
  background: none;
  border: none;
  color: var(--accent-color);
  cursor: pointer;
  font-weight: 500;
}

.preview-panel {
  position: relative;
  border-radius: 1.5rem;
  background: linear-gradient(160deg, rgba(92, 124, 250, 0.12), transparent 60%);
  border: 1px solid var(--border-subtle);
  padding: clamp(1.5rem, 4vw, 2rem);
}

.preview-stage {
  position: relative;
  min-height: 320px;
  border-radius: 1.25rem;
  background: color-mix(in srgb, var(--surface-card) 86%, transparent);
  border: 1px dashed color-mix(in srgb, var(--border-subtle) 50%, transparent);
  overflow: hidden;
  display: grid;
  place-items: center;
  padding: 1.5rem;
}

.preview-backdrop {
  position: absolute;
  inset: 0;
  padding: 1.5rem;
  pointer-events: none;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  font-size: 0.85rem;
  color: color-mix(in srgb, var(--text-muted) 80%, transparent);
}

.preview-backdrop p {
  margin: 0;
}

.preview-overlay .preview-stage {
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none"><path d="M0 60h120M60 0v120" stroke="%23a0aec0" stroke-opacity="0.15" stroke-width="1"/></svg>')
      repeat;
  background-size: 120px 120px;
}

.preview-inline .preview-stage {
  place-items: center;
}

.qr-slot,
.overlay-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
}

.qr-slot p,
.overlay-card p {
  margin: 0;
  color: var(--text-muted);
}

.overlay-slot {
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-state {
  padding: 3rem;
  border-radius: 1.25rem;
  border: 1px dashed var(--border-subtle);
  text-align: center;
  color: var(--text-muted);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

@media (max-width: 1024px) {
  .playground-content {
    grid-template-columns: 1fr;
  }
}
</style>
