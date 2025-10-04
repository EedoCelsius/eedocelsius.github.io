<template>
  <div v-if="entry" class="space-y-10">
    <div class="flex items-center gap-3">
      <Button text severity="secondary" size="small" icon="pi pi-arrow-left" @click="goBack" />
      <div>
        <h1 class="text-3xl font-semibold">{{ t(`${entry.translationKey}.name`) }}</h1>
        <p class="text-sm text-slate-600 dark:text-slate-300">{{ t(`${entry.translationKey}.description`) }}</p>
      </div>
    </div>

    <div class="grid gap-8 lg:grid-cols-[2fr,1fr]">
      <section class="space-y-6">
        <div class="space-y-4">
          <h2 class="text-xl font-semibold">{{ t('component.previewTitle') }}</h2>
          <div class="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-lg dark:border-slate-800/70 dark:bg-slate-900/60">
            <div v-if="entry.id === 'qr-code-card'" class="flex justify-center py-6">
              <component :is="entry.component" v-bind="propsState" />
            </div>
            <div v-else class="relative isolate flex h-80 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-200 via-white to-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950">
              <div class="pointer-events-none absolute inset-4 rounded-2xl border border-dashed border-slate-400/40 bg-white/60 p-6 text-center text-sm font-medium text-slate-500 backdrop-blur-sm dark:border-slate-600/40 dark:bg-slate-900/50 dark:text-slate-300">
                {{ t('component.emptySlotInfo') }}
              </div>
              <component :is="entry.component" v-bind="propsState">
                <template v-if="entry.id === 'blur-overlay'">
                  <div class="rounded-2xl bg-white/80 px-6 py-4 text-center text-slate-700 shadow-lg backdrop-blur-md dark:bg-slate-900/80 dark:text-slate-100">
                    {{ t('component.samples.focus') }}
                  </div>
                </template>
              </component>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <h2 class="text-xl font-semibold">{{ t('component.documentationTitle') }}</h2>
          <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li v-for="(note, index) in t(`${entry.translationKey}.notes`, entryNotesOptions)" :key="index" class="flex items-start gap-2">
              <i class="pi pi-dot-circle mt-1 text-primary-500"></i>
              <span>{{ note }}</span>
            </li>
          </ul>
        </div>
      </section>

      <aside class="space-y-4 rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/70">
        <h2 class="text-lg font-semibold">{{ t('component.controlsTitle') }}</h2>
        <div v-if="entry.controls.length" class="space-y-5">
          <div v-for="control in entry.controls" :key="control.key" class="space-y-2">
            <label class="text-sm font-medium text-slate-700 dark:text-slate-200">{{ t(control.labelKey) }}</label>
            <InputText
              v-if="control.type === 'text'"
              v-model="propsState[control.key]"
              :placeholder="control.placeholder"
              size="small"
              class="w-full"
            />
            <Textarea
              v-else-if="control.type === 'textarea'"
              v-model="propsState[control.key]"
              auto-resize
              rows="3"
              :placeholder="control.placeholder"
              class="w-full"
            />
            <div v-else-if="control.type === 'color'" class="flex items-center gap-3">
              <input
                v-model="propsState[control.key]"
                type="color"
                class="h-9 w-16 cursor-pointer rounded border border-slate-300 bg-transparent p-1 dark:border-slate-700"
              />
              <InputText v-model="propsState[control.key]" size="small" class="w-full" />
            </div>
            <InputNumber
              v-else-if="control.type === 'number'"
              v-model="propsState[control.key]"
              :min="control.min"
              :max="control.max"
              :step="control.step ?? 1"
              :input-style="{ width: '100%' }"
              mode="decimal"
              show-buttons
              button-layout="horizontal"
              :pt="{ input: { class: 'w-full' } }"
            />
          </div>
        </div>
        <p v-else class="text-sm text-slate-500 dark:text-slate-300">No configurable props yet.</p>
      </aside>
    </div>
  </div>
  <div v-else class="space-y-4 text-center">
    <p class="text-lg font-semibold">{{ t('component.samples.notFound') }}</p>
    <Button :label="t('actions.back')" icon="pi pi-arrow-left" @click="goBack" />
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import { reactive, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { getComponentById } from '../components/library/registry';
import type { LibraryComponent } from '../components/library/types';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const entry = ref<LibraryComponent | null>(null);
const propsState = reactive<Record<string, any>>({});

const entryNotesOptions = { returnObjects: true } as const;

function initialiseComponent(id: string) {
  const found = getComponentById(id);
  entry.value = found ?? null;
  Object.keys(propsState).forEach((key) => delete propsState[key]);
  if (found) {
    Object.assign(propsState, JSON.parse(JSON.stringify(found.defaultProps)));
  }
}

function goBack() {
  router.push({ name: 'home' });
}

watch(
  () => route.params.id,
  (id) => {
    if (typeof id === 'string') {
      initialiseComponent(id);
    } else {
      entry.value = null;
    }
  },
  { immediate: true }
);
</script>
