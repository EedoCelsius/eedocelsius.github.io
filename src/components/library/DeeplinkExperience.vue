<template>
  <div class="deeplink-experience">
    <slot name="trigger" :trigger="trigger" :isMobile="isMobile" :isDesktop="!isMobile">
      <Button icon="pi pi-external-link" :label="t('preview.trigger')" @click="trigger" />
    </slot>

    <Dialog
      v-model:visible="showDesktopDialog"
      modal
      :header="t('preview.desktopOnlyTitle')"
      class="desktop-dialog"
    >
      <p class="desktop-dialog__message">
        {{ t('preview.desktopOnlyMessage', { app: appName }) }}
      </p>
      <div class="qr-container" v-if="qrCodeDataUrl">
        <img :src="qrCodeDataUrl" alt="QR code" class="qr-image" />
        <div class="qr-icon-overlay" v-if="icon">
          <img :src="icon" :alt="`${appName} icon`" />
        </div>
      </div>
      <template #footer>
        <Button :label="t('preview.desktopOnlyCta')" @click="showDesktopDialog = false" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="showInstallDialog"
      modal
      :header="t('preview.installPromptTitle', { app: appName })"
      class="install-dialog"
    >
      <p>
        {{ t('preview.installPromptDescription', { app: appName, seconds: timeoutSeconds }) }}
      </p>
      <template #footer>
        <Button :label="t('preview.installPromptCta')" @click="handleRetry" />
      </template>
    </Dialog>

    <Transition name="fade">
      <div v-if="showLoadingOverlay" class="overlay-spinner">
        <div class="overlay-content">
          <ProgressSpinner strokeWidth="6" style="width: 64px; height: 64px" />
          <p>{{ t('preview.loadingMessage', { app: appName }) }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ProgressSpinner from 'primevue/progressspinner';
import QRCode from 'qrcode';

interface Props {
  appName: string;
  deeplinkUrl: string;
  icon?: string;
  timeout?: number;
}

const props = withDefaults(defineProps<Props>(), {
  timeout: 1500
});

const { t } = useI18n();

const showDesktopDialog = ref(false);
const showInstallDialog = ref(false);
const showLoadingOverlay = ref(false);
const qrCodeDataUrl = ref('');
const isMobile = ref(false);
let timeoutHandle: number | null = null;

const normalizedTimeout = computed(() => Math.max(500, props.timeout));
const timeoutSeconds = computed(() => (normalizedTimeout.value / 1000).toFixed(1));

const detectMobile = () => {
  if (typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const generateQrCode = async () => {
  if (!props.deeplinkUrl) {
    qrCodeDataUrl.value = '';
    return;
  }
  try {
    qrCodeDataUrl.value = await QRCode.toDataURL(props.deeplinkUrl, {
      width: 320,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    });
  } catch (error) {
    console.error('Failed to generate QR code', error);
    qrCodeDataUrl.value = '';
  }
};

const clearTimer = () => {
  if (timeoutHandle) {
    window.clearTimeout(timeoutHandle);
    timeoutHandle = null;
  }
};

const trigger = async () => {
  clearTimer();
  showInstallDialog.value = false;
  showDesktopDialog.value = false;

  const mobile = detectMobile();
  isMobile.value = mobile;

  if (!mobile) {
    await generateQrCode();
    showDesktopDialog.value = true;
    return;
  }

  showLoadingOverlay.value = true;
  timeoutHandle = window.setTimeout(() => {
    showLoadingOverlay.value = false;
    showInstallDialog.value = true;
  }, normalizedTimeout.value);

  window.location.href = props.deeplinkUrl;
};

const handleRetry = () => {
  showInstallDialog.value = false;
  trigger();
};

watch(
  () => props.deeplinkUrl,
  () => {
    if (showDesktopDialog.value) {
      generateQrCode();
    }
  }
);

onUnmounted(() => {
  clearTimer();
});

defineExpose({
  trigger
});
</script>

<style scoped>
.desktop-dialog__message {
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.qr-image {
  width: 280px;
  height: 280px;
  border-radius: 1.5rem;
  box-shadow: 0 20px 35px rgba(15, 23, 42, 0.18);
}

.overlay-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
