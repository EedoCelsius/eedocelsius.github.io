<template>
  <div class="component-preview preview-page" v-if="metadata">
    <header class="preview-header">
      <h1>{{ t('preview.title', { component: metadata.name }) }}</h1>
      <p>{{ t('preview.description') }}</p>
    </header>

    <div class="preview-layout">
      <aside class="preview-controls">
        <h3>{{ t('home.propsTitle') }}</h3>
        <div class="control-group" v-for="(value, key) in componentState" :key="key">
          <label :for="`prop-${key}`">{{ key }}</label>
          <InputText
            v-if="isString(value)"
            :id="`prop-${key}`"
            v-model="componentState[key]"
          />
          <InputNumber
            v-else
            :id="`prop-${key}`"
            v-model="componentState[key]"
            show-buttons
            :min="0"
            :step="100"
          />
        </div>
        <div class="control-actions">
          <Button icon="pi pi-refresh" :label="t('preview.reset')" severity="secondary" @click="reset" />
          <Button icon="pi pi-play" :label="t('preview.trigger')" @click="trigger" />
        </div>
      </aside>

      <section class="preview-stage">
        <Suspense>
          <component :is="asyncComponent" v-bind="componentState" ref="componentRef" />
        </Suspense>
      </section>
    </div>
  </div>
  <div v-else class="preview-page">
    <p>Component not found.</p>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch, defineAsyncComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import { componentCatalog } from '@/components/library';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const slug = computed(() => route.params.componentName as string);

const metadata = computed(() => componentCatalog.find((component) => component.slug === slug.value));

if (!metadata.value) {
  router.replace('/');
}

const componentState = reactive<Record<string, any>>({ ...(metadata.value?.previewProps ?? {}) });

const asyncComponent = computed(() => {
  if (!metadata.value) return null;
  return defineAsyncComponent(metadata.value.component as any);
});

const componentRef = ref<any>(null);

const isString = (value: unknown): value is string => typeof value === 'string';

const reset = () => {
  Object.assign(componentState, metadata.value?.previewProps ?? {});
};

const trigger = () => {
  const instance = componentRef.value as any;
  if (instance && typeof instance.trigger === 'function') {
    instance.trigger();
  }
};

watch(metadata, (newMetadata) => {
  if (!newMetadata) return;
  Object.assign(componentState, newMetadata.previewProps);
});
</script>

<style scoped>
.preview-header {
  margin-bottom: 2rem;
}

.preview-layout {
  display: grid;
  grid-template-columns: minmax(260px, 320px) 1fr;
  gap: 2rem;
  align-items: flex-start;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.control-group label {
  font-weight: 600;
}

.control-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 2rem;
}

.preview-stage {
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

@media (max-width: 960px) {
  .preview-layout {
    grid-template-columns: 1fr;
  }

  .preview-controls {
    order: 2;
  }
}
</style>
