<template>
  <div class="page surface-alt" v-if="entry">
    <div class="surface-panel heading">
      <div class="heading-main">
        <div class="breadcrumb">
          <RouterLink to="/" class="breadcrumb-link">{{ t('navigation.home') }}</RouterLink>
          <span class="divider">/</span>
          <span>{{ entryName }}</span>
        </div>
        <h1 class="section-title">{{ playgroundTitle }}</h1>
        <p class="section-subtitle">{{ playgroundDescription }}</p>
      </div>
      <div class="heading-actions">
        <Button
          icon="pi pi-link"
          :label="t('controls.copyLink')"
          class="p-button-text"
          @click="copyLink"
        />
        <Dropdown
          v-model="selectedComponentId"
          :options="componentOptions"
          optionLabel="label"
          optionValue="id"
          class="component-switcher"
        />
      </div>
      <Transition name="fade">
        <small v-if="copied" class="copy-feedback">Link copied!</small>
      </Transition>
    </div>

    <div class="main-grid">
      <div class="surface-panel controls-panel">
        <h2>{{ t('playground.propsTitle') }}</h2>
        <div class="controls-grid">
          <div v-for="control in entry.props" :key="control.key" class="control-item">
            <label :for="control.key">{{ control.label[currentLocale] ?? control.label.en }}</label>
            <InputText
              v-if="control.type === 'text' || control.type === 'image'"
              :modelValue="(formState[control.key] as string) ?? ''"
              :id="control.key"
              :type="control.type === 'image' ? 'url' : 'text'"
              @update:modelValue="updateText(control.key, $event)"
            />
            <Textarea
              v-else-if="control.type === 'textarea'"
              :modelValue="(formState[control.key] as string) ?? ''"
              :id="control.key"
              rows="4"
              autoResize
              @update:modelValue="updateText(control.key, $event)"
            />
            <InputNumber
              v-else-if="control.type === 'number'"
              :modelValue="(formState[control.key] as number | null)"
              :inputId="control.key"
              :min="control.min"
              :max="control.max"
              :step="0.1"
              mode="decimal"
              @update:modelValue="updateNumber(control.key, $event)"
            />
            <small v-if="control.helper" class="text-muted">
              {{ control.helper[currentLocale] ?? control.helper.en }}
            </small>
          </div>
        </div>
      </div>

      <div class="surface-panel preview-panel">
        <h2>{{ t('playground.previewTitle') }}</h2>
        <div class="preview-area">
          <component
            v-if="playgroundComponent"
            :is="playgroundComponent"
            v-bind="normalizedProps"
            @reset="resetProps"
          />
        </div>
        <div class="usage">
          <h3>{{ t('playground.usageTitle') }}</h3>
          <pre><code>{{ entry.usage }}</code></pre>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="page surface-alt">
    <div class="surface-panel">
      <p>Component not found.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent, reactive, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import { componentMap, components } from '../components/lab/registry';

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();

const copied = ref(false);
const selectedComponentId = ref(route.params.id as string);

const entry = computed(() => componentMap.get(selectedComponentId.value));

const playgroundComponent = computed(() =>
  entry.value ? defineAsyncComponent(entry.value.component) : null
);

const formState = reactive<Record<string, unknown>>({});

const clearState = () => {
  Object.keys(formState).forEach((key) => {
    delete formState[key];
  });
};

const applyDefaults = () => {
  clearState();
  if (!entry.value) {
    return;
  }
  entry.value.props.forEach((control) => {
    formState[control.key] = control.default;
  });
};

watch(entry, applyDefaults, { immediate: true });

watch(selectedComponentId, (id) => {
  if (id) {
    router.replace({ name: 'component-playground', params: { id } });
  }
});

watch(
  () => route.params.id,
  (id) => {
    if (typeof id === 'string' && id !== selectedComponentId.value) {
      selectedComponentId.value = id;
    }
  }
);

const normalizedProps = computed(() => {
  const resolved: Record<string, unknown> = {};
  if (!entry.value) {
    return resolved;
  }

  entry.value.props.forEach((control) => {
    const value = formState[control.key];
    if (control.type === 'number') {
      const numeric = typeof value === 'number' ? value : Number(value ?? control.default);
      resolved[control.key] = Number.isNaN(numeric) ? control.default : numeric;
    } else {
      resolved[control.key] = value ?? control.default;
    }
  });

  return resolved;
});


const updateText = (key: string, value: string | null | undefined) => {
  formState[key] = value ?? '';
};

const updateNumber = (key: string, value: number | null | undefined) => {
  formState[key] = value ?? null;
};

const resetProps = () => {
  applyDefaults();
};

const playgroundTitle = computed(() => t('playground.header', { name: entryName.value }));
const playgroundDescription = computed(() => t('playground.description'));

const currentLocale = computed(() => (locale.value as 'en' | 'ko'));

const entryName = computed(() => entry.value?.name[currentLocale.value] ?? entry.value?.name.en ?? '');

const componentOptions = computed(() =>
  components.map((item) => ({
    id: item.id,
    label: item.name[currentLocale.value] ?? item.name.en
  }))
);

const copyLink = async () => {
  const url = new URL(window.location.href);
  copied.value = false;
  try {
    await navigator.clipboard.writeText(url.toString());
    copied.value = true;
    setTimeout(() => (copied.value = false), 1800);
  } catch (error) {
    console.error('Failed to copy link', error);
  }
};
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
}

.heading {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.heading-main {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.heading-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.component-switcher {
  min-width: 16rem;
}

.main-grid {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 1.5rem;
}

.controls-panel,
.preview-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.control-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-item label {
  font-weight: 500;
}

.preview-panel .usage {
  margin-top: 1.5rem;
}

.preview-panel pre {
  background: var(--surface-alt-color);
  padding: 1rem;
  border-radius: 0.75rem;
  overflow-x: auto;
}

.breadcrumb {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--muted-text-color);
  font-size: 0.9rem;
}

.breadcrumb-link {
  color: inherit;
  text-decoration: none;
}

.divider {
  opacity: 0.6;
}

.copy-feedback {
  color: var(--accent-color);
}

@media (max-width: 1080px) {
  .main-grid {
    grid-template-columns: 1fr;
  }

  .component-switcher {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .page {
    padding: 1.5rem 1rem;
  }
}
</style>
