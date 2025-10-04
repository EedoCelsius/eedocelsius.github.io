<template>
  <div class="deeplink-experience">
    <Dialog
      v-model:visible="desktopDialogVisible"
      modal
      :closable="true"
      :style="{ width: '24rem' }"
      :breakpoints="{ '960px': '90vw' }"
    >
      <template #header>
        <div class="dialog-header">
          <span class="dialog-title">{{ desktopTitle }}</span>
        </div>
      </template>
      <div class="desktop-body">
        <p class="text-muted">{{ desktopBody }}</p>
        <div class="qr-wrapper">
          <QrcodeVue :value="deeplinkUrl" :size="220" level="H" />
          <div v-if="icon" class="qr-icon">
            <img :src="icon" :alt="appName" />
          </div>
        </div>
        <p class="qr-caption">{{ scanningHint }}</p>
      </div>
      <template #footer>
        <Button :label="confirmLabel" @click="desktopDialogVisible = false" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="mobileInstallDialogVisible"
      modal
      :closable="false"
      :style="{ width: '22rem' }"
      :breakpoints="{ '960px': '90vw' }"
    >
      <template #header>
        <div class="dialog-header">
          <span class="dialog-title">{{ mobileTitle }}</span>
        </div>
      </template>
      <div class="mobile-body">
        <p class="text-muted">{{ mobileBody }}</p>
        <Button icon="pi pi-download" class="p-button-rounded" :label="installCta" type="button" @click="openInstall" />
      </div>
      <template #footer>
        <Button :label="confirmLabel" severity="secondary" @click="mobileInstallDialogVisible = false" />
      </template>
    </Dialog>

    <transition name="fade">
      <div v-if="showLoadingOverlay" class="loading-overlay">
        <div class="overlay-content">
          <ProgressSpinner strokeWidth="4" style="width: 48px; height: 48px" />
          <p class="overlay-text">{{ loadingText }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import QrcodeVue from 'qrcode.vue';

interface Props {
  appName: string;
  deeplinkUrl: string;
  icon?: string;
  timeout?: number;
}

const props = withDefaults(defineProps<Props>(), {
  appName: 'My App',
  timeout: 1.5
});

const { t } = useI18n();

const desktopDialogVisible = ref(false);
const mobileInstallDialogVisible = ref(false);
const showLoadingOverlay = ref(false);
let timeoutHandle: number | undefined;

const isMobile = computed(() => /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

const desktopTitle = computed(() => t('deeplink.desktopTitle'));
const desktopBody = computed(() => t('deeplink.desktopBody', { app: props.appName }));
const mobileTitle = computed(() => t('deeplink.mobileTitle', { app: props.appName }));
const mobileBody = computed(() => t('deeplink.mobileBody'));
const installCta = computed(() => t('deeplink.installCta', { app: props.appName }));
const confirmLabel = computed(() => t('deeplink.confirm'));
const scanningHint = computed(() => t('deeplink.scanningHint', { app: props.appName }));
const loadingText = computed(() => t('deeplink.loading', { app: props.appName }));

const trigger = () => {
  if (!props.deeplinkUrl) {
    return;
  }

  if (isMobile.value) {
    showLoadingOverlay.value = true;
    mobileInstallDialogVisible.value = false;

    window.location.href = props.deeplinkUrl;

    if (timeoutHandle) {
      clearTimeout(timeoutHandle);
    }

    timeoutHandle = window.setTimeout(() => {
      showLoadingOverlay.value = false;
      mobileInstallDialogVisible.value = true;
      timeoutHandle = undefined;
    }, props.timeout * 1000);
  } else {
    desktopDialogVisible.value = true;
  }
};

const cancelOverlay = () => {
  showLoadingOverlay.value = false;
  if (timeoutHandle) {
    clearTimeout(timeoutHandle);
    timeoutHandle = undefined;
  }
};


const openInstall = () => {
  window.open(props.deeplinkUrl, '_blank');
};

onBeforeUnmount(() => {
  cancelOverlay();
});

defineExpose({ trigger });
</script>

<style scoped>
.deeplink-experience {
  position: relative;
}

.dialog-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.dialog-title {
  font-size: 1.1rem;
  font-weight: 600;
}

.desktop-body,
.mobile-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
}

.qr-wrapper {
  position: relative;
  display: inline-flex;
  margin: 0 auto;
  padding: 0.75rem;
  border-radius: 18px;
  background: var(--surface-alt-color);
  box-shadow: inset 0 0 0 1px var(--surface-border);
}

.qr-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  transform: translate(-50%, -50%);
  background: white;
  display: grid;
  place-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.qr-icon img {
  width: 44px;
  height: 44px;
  object-fit: contain;
  border-radius: 12px;
}

.qr-caption {
  font-size: 0.85rem;
  color: var(--muted-text-color);
}

.loading-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  z-index: 1000;
}

.overlay-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  border-radius: 16px;
  background: var(--surface-color);
  color: var(--text-color);
  min-width: 240px;
}

.overlay-text {
  font-size: 1rem;
  font-weight: 500;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
</style>
