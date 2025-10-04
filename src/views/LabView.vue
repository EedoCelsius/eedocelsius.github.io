<template>
  <section class="component-grid">
    <aside class="component-panel">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{{ t('lab.sidebarTitle') }}</h2>
      <nav class="mt-4 space-y-2">
        <RouterLink
          v-for="component in labComponents"
          :key="component.id"
          :to="{ name: 'lab', params: { componentId: component.id } }"
          class="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition"
          :class="component.id === selectedId ? 'bg-primary-500/90 text-white shadow-lg' : 'bg-white/70 text-slate-700 dark:bg-slate-800/70 dark:text-slate-200 hover:bg-primary-50/70 dark:hover:bg-primary-900/30'"
        >
          <span>{{ t(`${component.i18nKey}.name`) }}</span>
          <i class="pi pi-chevron-right" aria-hidden="true"></i>
        </RouterLink>
      </nav>
    </aside>

    <div class="component-panel space-y-8">
      <div v-if="currentComponent" class="space-y-4">
        <div class="flex flex-col gap-2">
          <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">{{ t(`${currentComponent.i18nKey}.name`) }}</h1>
          <p class="text-sm text-muted">{{ t(`${currentComponent.i18nKey}.description`) }}</p>
        </div>
        <div class="grid gap-6 lg:grid-cols-2">
          <div class="space-y-4">
            <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{{ t('lab.propsTitle') }}</h3>
            <form class="space-y-4">
              <div v-for="control in currentComponent.controls" :key="control.prop" class="control-group">
                <label :for="`control-${control.prop}`">{{ t(control.labelKey) }}</label>
                <template v-if="control.type === 'textarea'">
                  <textarea
                    :id="`control-${control.prop}`"
                    rows="4"
                    :placeholder="control.placeholder"
                    v-model="currentProps[control.prop]"
                  ></textarea>
                </template>
                <template v-else-if="control.type === 'color'">
                  <input
                    type="color"
                    :id="`control-${control.prop}`"
                    v-model="currentProps[control.prop]"
                  />
                </template>
                <template v-else-if="control.type === 'range'">
                  <input
                    type="range"
                    :id="`control-${control.prop}`"
                    :min="control.min"
                    :max="control.max"
                    :step="control.step || 1"
                    :value="currentProps[control.prop]"
                    @input="event => updateProp(control, event.target.value)"
                  />
                  <div class="flex justify-between text-xs text-muted">
                    <span>{{ currentProps[control.prop] }} px</span>
                    <span>{{ control.min }} - {{ control.max }}</span>
                  </div>
                </template>
                <template v-else>
                  <input
                    type="text"
                    :id="`control-${control.prop}`"
                    :placeholder="control.placeholder"
                    v-model="currentProps[control.prop]"
                  />
                </template>
              </div>
            </form>
          </div>
          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{{ t('lab.previewTitle') }}</h3>
            <div class="component-preview">
              <component :is="currentComponent.component" v-bind="currentProps" />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="surface-section p-10 text-center text-muted">
        {{ t('lab.notFound') }}
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import { useRouter, useRoute, RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { labComponents, getComponentById } from '../lab/registry';

const props = defineProps({
  componentId: {
    type: String,
    default: undefined
  }
});

const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const currentComponent = ref(null);
const currentProps = reactive({});
const selectedId = ref(null);

const applyDefaults = definition => {
  Object.keys(currentProps).forEach(key => delete currentProps[key]);
  if (definition?.defaultProps) {
    Object.entries(definition.defaultProps).forEach(([key, value]) => {
      currentProps[key] = value;
    });
  }
};

const syncComponent = id => {
  if (!labComponents.length) {
    currentComponent.value = null;
    selectedId.value = null;
    return;
  }
  const fallbackId = labComponents[0].id;
  const targetId = id || fallbackId;
  const definition = getComponentById(targetId);
  if (!definition) {
    router.replace({ name: 'lab', params: { componentId: fallbackId } });
    return;
  }
  currentComponent.value = definition;
  selectedId.value = definition.id;
  if (route.params.componentId !== definition.id) {
    router.replace({ name: 'lab', params: { componentId: definition.id } });
  }
  applyDefaults(definition);
};

watch(
  () => props.componentId,
  newId => {
    syncComponent(newId);
  },
  { immediate: true }
);

const updateProp = (control, value) => {
  const normalized = control.type === 'range' ? Number(value) : value;
  currentProps[control.prop] = normalized;
};
</script>
