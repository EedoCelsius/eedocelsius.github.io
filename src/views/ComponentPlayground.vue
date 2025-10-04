<template>
  <div class="fade-in" v-if="definition">
    <Button
      class="p-button-text"
      icon="pi pi-arrow-left"
      :label="t('playground.back')"
      @click="router.push({ name: 'home' })"
      style="margin-bottom: 1.5rem;"
    />

    <section class="surface-card" style="padding: 2.5rem; display: grid; gap: 1.25rem;">
      <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
        <Avatar icon="pi pi-flask" shape="circle" size="large" style="background: var(--brand-primary); color: white;" />
        <div>
          <h2 style="margin: 0 0 0.35rem 0;">{{ definition.name[currentLocale] }}</h2>
          <p style="margin: 0; color: var(--text-color-secondary);">{{ definition.tagline[currentLocale] }}</p>
        </div>
      </div>
      <p style="margin: 0; color: var(--text-color-secondary); max-width: 720px;">{{ t(definition.descriptionKey) }}</p>
    </section>

    <section class="playground-preview surface-card" style="margin-top: 2.5rem;">
      <h3 style="margin-top: 0;">{{ t('playground.controls') }}</h3>
      <div class="control-grid">
        <div
          v-for="control in definition.playground.controls"
          :key="control.name"
          class="control-card"
        >
          <label :for="controlId(control.name)">{{ t(control.labelKey) }}</label>

          <Textarea
            v-if="control.type === 'textarea'"
            v-model="formState[control.name]"
            autoResize
            rows="4"
            :id="controlId(control.name)"
            :placeholder="control.placeholder"
          />

          <InputNumber
            v-else-if="control.type === 'number'"
            v-model="formState[control.name]"
            :id="controlId(control.name)"
            :placeholder="control.placeholder"
            :step="control.step ?? 0.1"
            :min="control.min"
            :max="control.max"
            :useGrouping="false"
            mode="decimal"
            fluid
          />

          <InputText
            v-else
            v-model="formState[control.name]"
            :id="controlId(control.name)"
            :type="control.type === 'url' ? 'url' : 'text'"
            :placeholder="control.placeholder"
            fluid
          />
        </div>
      </div>

      <div class="playground-actions">
        <Button
          :label="t('playground.trigger')"
          icon="pi pi-bolt"
          @click="handleTrigger"
        />
        <Button
          :label="t('playground.reset')"
          icon="pi pi-refresh"
          class="p-button-outlined"
          @click="resetProps"
        />
      </div>

      <h3 style="margin-top: 3rem;">{{ t('playground.preview') }}</h3>
      <div class="surface-card" style="padding: 1.5rem; border-radius: var(--radius-md);">
        <component
          v-if="playgroundComponent"
          :is="playgroundComponent"
          v-bind="formState"
          ref="componentRef"
        />
      </div>
    </section>
  </div>

  <div v-else class="surface-card" style="padding: 3rem; text-align: center;">
    <h2>{{ t('playground.notFound') }}</h2>
    <Button :label="t('playground.back')" icon="pi pi-arrow-left" @click="router.push({ name: 'home' })" />
  </div>
</template>

<script setup lang="ts">
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import { computed, defineAsyncComponent, reactive, ref, watch } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { getComponentDefinition } from '../router/componentRegistry';

interface PlaygroundComponentExpose {
  trigger?: () => void;
}

const props = defineProps<{ slug: string }>();

const { t, locale } = useI18n();
const router = useRouter();

const definition = computed(() => getComponentDefinition(props.slug));
const playgroundComponent = computed<Component | null>(() =>
  definition.value ? defineAsyncComponent(definition.value.component) : null,
);

const formState = reactive<Record<string, any>>({});

watch(
  definition,
  (next) => {
    Object.keys(formState).forEach((key) => delete formState[key]);
    if (!next) {
      return;
    }
    Object.entries(next.playground.defaultProps).forEach(([key, value]) => {
      formState[key] = value;
    });
  },
  { immediate: true },
);

const currentLocale = computed<'ko' | 'en'>(() => (locale.value.startsWith('ko') ? 'ko' : 'en'));

const controlId = (name: string) => `control-${name}`;

const componentRef = ref<ComponentPublicInstance<PlaygroundComponentExpose> | null>(null);

const handleTrigger = () => {
  const instance = componentRef.value as unknown as PlaygroundComponentExpose | undefined;
  instance?.trigger?.();
};

const resetProps = () => {
  if (!definition.value) {
    return;
  }
  Object.entries(definition.value.playground.defaultProps).forEach(([key, value]) => {
    formState[key] = value;
  });
};
</script>
