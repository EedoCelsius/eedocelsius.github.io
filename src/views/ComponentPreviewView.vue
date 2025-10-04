<template>
  <div v-if="!definition" class="not-found">
    <Message severity="warn" :closable="false">{{ $t('preview.notFound') }}</Message>
    <RouterLink class="p-button p-button-text" :to="{ name: 'home' }">
      {{ $t('preview.back') }}
    </RouterLink>
  </div>
  <div v-else class="preview-layout">
    <div class="controls">
      <Panel :header="$t('app.props')">
        <div class="field" v-for="control in definition.controls" :key="control.prop">
          <label :for="control.prop">{{ control.label }}</label>
          <component
            :is="controlComponent(control)"
            v-model="currentProps[control.prop]"
            :inputId="control.prop"
            :placeholder="control.placeholder"
            :min="control.min"
            :step="control.step"
            :useGrouping="false"
            fluid
          />
        </div>
        <div class="control-actions">
          <Button severity="secondary" text @click="resetProps">{{ $t('app.reset') }}</Button>
        </div>
      </Panel>
      <Panel :header="$t('app.actions')">
        <Button icon="pi pi-bolt" :label="$t('app.trigger')" @click="triggerComponent" />
      </Panel>
    </div>
    <div class="preview">
      <Panel>
        <template #header>
          <div class="preview-header">
            <div>
              <h3 class="title">{{ definition.name }}</h3>
              <p class="subtitle">{{ definition.description }}</p>
            </div>
            <Tag :value="$t('app.preview')" severity="secondary" rounded />
          </div>
        </template>
        <div class="preview-content">
          <Suspense>
            <template #default>
              <component
                :is="asyncComponent"
                ref="componentRef"
                v-bind="currentProps"
              />
            </template>
            <template #fallback>
              <div class="loading">
                <ProgressSpinner strokeWidth="4" style="width: 48px; height: 48px" />
              </div>
            </template>
          </Suspense>
        </div>
      </Panel>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import Panel from 'primevue/panel';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Tag from 'primevue/tag';
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';
import { findComponentByKey } from '../data/components.js';

const route = useRoute();
const componentRef = ref(null);

const definition = computed(() => findComponentByKey(route.params.componentKey));

const asyncComponent = computed(() =>
  definition.value ? defineAsyncComponent(definition.value.component) : null,
);

const currentProps = reactive({});

watch(
  definition,
  (value) => {
    if (value) {
      for (const key of Object.keys(currentProps)) {
        delete currentProps[key];
      }
      Object.assign(currentProps, value.previewProps);
    }
  },
  { immediate: true },
);

function resetProps() {
  if (definition.value) {
    for (const key of Object.keys(currentProps)) {
      delete currentProps[key];
    }
    Object.assign(currentProps, definition.value.previewProps);
  }
}

function triggerComponent() {
  if (componentRef.value && typeof componentRef.value.trigger === 'function') {
    componentRef.value.trigger();
  }
}

function controlComponent(control) {
  switch (control.type) {
    case 'number':
      return InputNumber;
    default:
      return InputText;
  }
}
</script>

<style scoped>
.preview-layout {
  display: grid;
  gap: 2rem;
  grid-template-columns: minmax(260px, 320px) 1fr;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.control-actions {
  display: flex;
  justify-content: flex-end;
}

.preview {
  width: 100%;
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.preview-header .title {
  margin: 0;
}

.preview-header .subtitle {
  margin: 0.3rem 0 0;
  color: var(--text-color-secondary);
}

.preview-content {
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(148, 163, 184, 0.08);
  border-radius: 1rem;
  padding: 2rem;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

@media (max-width: 960px) {
  .preview-layout {
    grid-template-columns: 1fr;
  }
}
</style>
