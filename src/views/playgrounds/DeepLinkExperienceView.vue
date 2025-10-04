<script setup>
import { reactive, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';

import DeepLinkExperience from '../../components/playground/DeepLinkExperience.vue';

const { t } = useI18n();

const defaults = {
  appName: '카카오톡',
  deeplinkUrl: 'kakaotalk://launch',
  icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/KakaoTalk_logo.svg',
  timeout: 1.5
};

const form = reactive({ ...defaults });

const experienceRef = ref(null);

const triggerExperience = () => {
  experienceRef.value?.trigger();
};

const resetForm = () => {
  Object.assign(form, defaults);
};
</script>

<template>
  <section class="playground-page">
    <RouterLink class="playground-back" to="/">
      <i class="pi pi-arrow-left" aria-hidden="true"></i>
      <span>{{ t('playground.common.back') }}</span>
    </RouterLink>

    <div class="playground-layout">
      <section class="control-panel" aria-labelledby="deeplink-control-title">
        <header>
          <h2 id="deeplink-control-title">{{ t('playground.deeplink.formTitle') }}</h2>
        </header>
        <div class="field-group">
          <div class="field">
            <label for="app-name">{{ t('playground.deeplink.labels.appName') }}</label>
            <InputText id="app-name" v-model="form.appName" autocomplete="off" />
          </div>
          <div class="field">
            <label for="deeplink-url">{{ t('playground.deeplink.labels.deeplinkUrl') }}</label>
            <InputText id="deeplink-url" v-model="form.deeplinkUrl" autocomplete="off" />
            <span class="field-helper">{{ t('playground.deeplink.helper.deeplinkUrl') }}</span>
          </div>
          <div class="field">
            <label for="icon-url">{{ t('playground.deeplink.labels.icon') }}</label>
            <InputText id="icon-url" v-model="form.icon" autocomplete="off" />
          </div>
          <div class="field">
            <label for="timeout">{{ t('playground.deeplink.labels.timeout') }}</label>
            <InputNumber
              id="timeout"
              v-model="form.timeout"
              :min="0.5"
              :step="0.1"
              mode="decimal"
              showButtons
              buttonLayout="horizontal"
              decrementButtonClass="p-button-text"
              incrementButtonClass="p-button-text"
              decrementButtonIcon="pi pi-minus"
              incrementButtonIcon="pi pi-plus"
            />
            <span class="field-helper">{{ t('playground.deeplink.helper.timeout') }}</span>
          </div>
        </div>
        <div class="actions">
          <Button icon="pi pi-play" :label="t('playground.deeplink.actions.trigger')" @click="triggerExperience" />
          <Button icon="pi pi-refresh" severity="secondary" text :label="t('playground.deeplink.actions.reset')" @click="resetForm" />
        </div>
      </section>

      <section class="preview-panel" aria-labelledby="deeplink-preview-title">
        <header>
          <h2 id="deeplink-preview-title">{{ t('playground.deeplink.previewTitle') }}</h2>
          <p class="hint">{{ t('playground.deeplink.mobileOnlyHint') }}</p>
        </header>
        <DeepLinkExperience ref="experienceRef" v-bind="form" />
      </section>
    </div>
  </section>
</template>
