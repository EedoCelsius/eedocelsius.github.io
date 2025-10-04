<template>
  <div class="deeplink-experience">
    <slot name="trigger" :trigger="trigger" :is-mobile="isMobileEnvironment" :is-desktop="!isMobileEnvironment">
      <Button
        icon="pi pi-external-link"
        :label="t('component.actions.trigger')"
        @click="trigger"
      />
    </slot>

    <Dialog
      v-model:visible="desktopDialogVisible"
      modal
      :closable="true"
      :header="t('deeplink.labels.desktopDialogTitle')"
      class="deeplink-dialog"
    >
      <div class="desktop-body">
        <div class="qr-wrapper" role="img" :aria-label="t('deeplink.labels.desktopDialogHint', { appName: resolvedAppName })">
          <img v-if="qrCodeDataUrl" class="qr-image" :src="qrCodeDataUrl" alt="QR code" />
          <div v-if="icon" class="qr-icon">
            <img :src="icon" alt="" />
          </div>
        </div>
        <p class="desktop-message">
          {{ t('deeplink.labels.desktopDialogMessage', { appName: resolvedAppName }) }}
        </p>
        <p class="desktop-hint">
          {{ t('deeplink.labels.desktopDialogHint', { appName: resolvedAppName }) }}
        </p>
      </div>
      <template #footer>
        <Button :label="t('deeplink.buttons.close')" text @click="desktopDialogVisible = false" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="mobileFallbackVisible"
      modal
      :closable="false"
      :header="t('deeplink.labels.mobileDialogTitle', { appName: resolvedAppName })"
      class="deeplink-dialog"
    >
      <p>
        {{ t('deeplink.labels.mobileDialogMessage', { seconds: timeoutSeconds, appName: resolvedAppName }) }}
      </p>
      <template #footer>
        <Button :label="t('deeplink.buttons.close')" text @click="closeFallback" />
        <Button :label="t('deeplink.buttons.tryAgain')" @click="retry" />
      </template>
    </Dialog>

    <transition name="fade">
      <div v-if="mobileOverlayVisible" class="deeplink-overlay" role="status" :aria-label="t('deeplink.labels.mobileOverlay', { appName: resolvedAppName })">
        <ProgressSpinner strokeWidth="6" />
        <p>{{ t('deeplink.labels.mobileOverlay', { appName: resolvedAppName }) }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ProgressSpinner from 'primevue/progressspinner';
import QRCode from 'qrcode';

const props = defineProps({
  appName: {
    type: String,
    default: '',
  },
  deeplinkUrl: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: '',
  },
  timeout: {
    type: Number,
    default: 1.5,
  },
});

const { t } = useI18n();

const desktopDialogVisible = ref(false);
const mobileOverlayVisible = ref(false);
const mobileFallbackVisible = ref(false);
const qrCodeDataUrl = ref('');
let fallbackTimer;

const timeoutSeconds = computed(() => Number.isFinite(props.timeout) ? props.timeout : 1.5);
const resolvedAppName = computed(() => props.appName || 'App');
const isMobileEnvironment = computed(() => /Android|iP(ad|hone|od)|IEMobile|BlackBerry|Opera Mini|Mobile|Silk/i.test(navigator.userAgent || ''));

async function ensureQrCode() {
  if (!props.deeplinkUrl) {
    qrCodeDataUrl.value = '';
    return;
  }

  try {
    qrCodeDataUrl.value = await QRCode.toDataURL(props.deeplinkUrl, {
      margin: 1,
      width: 256,
      color: {
        dark: '#1f2937',
        light: '#ffffff',
      },
    });
  } catch (error) {
    console.error('[DeeplinkExperience] Failed to generate QR code', error);
    qrCodeDataUrl.value = '';
  }
}

watch(
  () => props.deeplinkUrl,
  () => {
    if (desktopDialogVisible.value) {
      ensureQrCode();
    }
  },
);

function clearFallbackTimer() {
  if (fallbackTimer) {
    clearTimeout(fallbackTimer);
    fallbackTimer = undefined;
  }
}

function attemptLaunch() {
  if (!props.deeplinkUrl) {
    return;
  }

  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = props.deeplinkUrl;
  document.body.appendChild(iframe);
  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 1000);
}

function trigger() {
  if (!props.deeplinkUrl) {
    return;
  }

  if (isMobileEnvironment.value) {
    desktopDialogVisible.value = false;
    mobileFallbackVisible.value = false;
    mobileOverlayVisible.value = true;
    attemptLaunch();
    clearFallbackTimer();
    fallbackTimer = window.setTimeout(() => {
      mobileOverlayVisible.value = false;
      mobileFallbackVisible.value = true;
    }, timeoutSeconds.value * 1000);
  } else {
    clearFallbackTimer();
    mobileOverlayVisible.value = false;
    mobileFallbackVisible.value = false;
    desktopDialogVisible.value = true;
    ensureQrCode();
  }
}

function closeFallback() {
  mobileFallbackVisible.value = false;
  clearFallbackTimer();
}

function retry() {
  closeFallback();
  trigger();
}

defineExpose({
  trigger,
});

onBeforeUnmount(() => {
  clearFallbackTimer();
});
</script>

<style scoped>
.deeplink-experience {
  position: relative;
}

.deeplink-dialog :deep(.p-dialog-content) {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.desktop-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.qr-wrapper {
  position: relative;
  width: 220px;
  aspect-ratio: 1;
  border-radius: 1.25rem;
  padding: 1rem;
  background: var(--surface-card);
  border: 1px solid color-mix(in srgb, var(--surface-border) 60%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.qr-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.qr-icon {
  position: absolute;
  width: 64px;
  height: 64px;
  border-radius: 1rem;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.25);
}

.qr-icon img {
  width: 48px;
  height: 48px;
  object-fit: cover;
}

.desktop-message {
  font-size: 1rem;
  line-height: 1.5;
}

.desktop-hint {
  font-size: 0.9rem;
  color: var(--text-color-secondary);
}

.deeplink-overlay {
  position: fixed;
  inset: 0;
  background: color-mix(in srgb, var(--surface-ground) 80%, rgba(15, 23, 42, 0.75));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: #fff;
  z-index: 1000;
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
