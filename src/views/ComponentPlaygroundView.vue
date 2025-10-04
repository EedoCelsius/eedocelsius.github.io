<template>
  <div class="playground-view" v-if="definition">
    <section class="playground-header component-lab-card">
      <div>
        <Tag value="Beta" severity="info" />
      </div>
      <h1>{{ t('playground.title', { component: componentName }) }}</h1>
      <p class="playground-subtitle">{{ componentSummary }}</p>
      <div class="playground-actions">
        <Button icon="pi pi-bolt" :label="t('component.actions.trigger')" @click="triggerComponent" />
        <Button icon="pi pi-refresh" :label="t('component.actions.reset')" text @click="resetProps" />
      </div>
    </section>

    <div class="playground-grid">
      <div class="playground-column">
        <section class="component-lab-card">
          <h2 class="component-lab-section-title">{{ t('component.overview') }}</h2>
          <ul class="description-list">
            <li v-for="item in descriptionItems" :key="item">{{ item }}</li>
          </ul>
        </section>

        <PropsEditor
          v-if="definition.controls?.length"
          :model-value="propsState"
          :controls="definition.controls"
          :title="t('component.props')"
          @update:modelValue="onPropsUpdate"
        />

        <section class="component-lab-card">
          <h3 class="component-lab-section-title">{{ t('playground.technicalDetails') }}</h3>
          <dl class="props-details">
            <div v-for="(copy, key) in propDetails" :key="key" class="props-details__item">
              <dt>{{ t(`controls.${key}`) }}</dt>
              <dd>{{ copy }}</dd>
            </div>
          </dl>
        </section>
      </div>

      <div class="playground-column">
        <section class="component-lab-card preview-card">
          <h2 class="component-lab-section-title">{{ t('playground.mobilePreview') }}</h2>
          <component
            :is="definition.component"
            v-bind="propsState"
            ref="componentRef"
          >
            <template #trigger="slotProps">
              <Button icon="pi pi-external-link" :label="t('component.actions.trigger')" @click="slotProps.trigger" />
            </template>
          </component>
        </section>

        <section class="component-lab-card">
          <h3 class="component-lab-section-title">{{ t('playground.desktopPreview') }}</h3>
          <ul class="description-list">
            <li>{{ t(definition.notesKeys.desktop) }}</li>
            <li>{{ t(definition.notesKeys.mobile) }}</li>
          </ul>
        </section>
      </div>
    </div>
  </div>
  <div v-else class="empty-state component-lab-card">
    <p>{{ t('component.empty') }}</p>
    <RouterLink class="empty-link" to="/">
      <Button icon="pi pi-home" :label="t('nav.home')" text />
    </RouterLink>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import PropsEditor from '../components/playground/PropsEditor.vue';
import { findComponentBySlug } from '../lab/componentsRegistry';

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
});

const componentRef = ref();
const propsState = reactive({});
const { t, tm } = useI18n();

const definition = computed(() => findComponentBySlug(props.slug));

const componentName = computed(() => (definition.value ? t(definition.value.nameKey) : ''));
const componentSummary = computed(() => (definition.value ? t(definition.value.summaryKey) : t('playground.subtitle')));

const descriptionItems = computed(() => {
  if (!definition.value) return [];
  const message = tm(definition.value.descriptionKey);
  if (Array.isArray(message)) {
    return message;
  }
  if (typeof message === 'string') {
    return [message];
  }
  return [];
});

const propDetails = computed(() => {
  if (!definition.value) return {};
  const copy = tm(definition.value.propsKey);
  return copy && typeof copy === 'object' ? copy : {};
});

watch(
  definition,
  (next) => {
    if (!next) {
      return;
    }
    Object.keys(propsState).forEach((key) => delete propsState[key]);
    Object.assign(propsState, next.defaultProps ?? {});
  },
  { immediate: true },
);

function triggerComponent() {
  componentRef.value?.trigger?.();
}

function resetProps() {
  if (!definition.value) return;
  Object.keys(propsState).forEach((key) => delete propsState[key]);
  Object.assign(propsState, definition.value.defaultProps ?? {});
}

function onPropsUpdate(value) {
  Object.assign(propsState, value);
}
</script>

<style scoped>
.playground-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.playground-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.playground-subtitle {
  margin: 0;
  color: var(--text-color-secondary);
}

.playground-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.playground-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.playground-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.description-list {
  padding-left: 1.25rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.props-details {
  display: grid;
  gap: 1rem;
}

.props-details__item {
  display: grid;
  gap: 0.25rem;
}

.props-details dt {
  font-weight: 600;
}

.preview-card {
  min-height: 360px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.preview-card > :deep(*) {
  flex: 1;
}

.empty-state {
  display: grid;
  place-items: center;
  gap: 1rem;
  text-align: center;
}

.empty-link {
  text-decoration: none;
}
</style>
