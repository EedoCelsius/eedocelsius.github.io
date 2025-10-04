<template>
  <article class="deeplink-card surface-card">
    <div class="deeplink-meta">
      <div v-if="icon" class="deeplink-icon">
        <img :src="icon" :alt="`${appName} icon`" />
      </div>
      <div class="deeplink-content">
        <h4>{{ appName }}</h4>
        <p>{{ t('deeplink.overview') }}</p>
        <small class="deeplink-url">{{ deeplinkUrl }}</small>
      </div>
    </div>
    <Tag icon="pi pi-link" value="trigger()" severity="info" />
  </article>

  <transition name="fade">
    <div v-if="isLoadingOverlay" class="overlay-backdrop">
      <div class="overlay-panel">
        <ProgressSpinner style="width: 54px; height: 54px" strokeWidth="4" />
        <div>
          <h3 style="margin: 0;">{{ t('deeplink.mobile.loading', { app: appName }) }}</h3>
          <p style="margin: 0; color: var(--text-color-secondary);">
            {{ t('deeplink.mobile.timeoutLabel', { seconds: (sanitizedTimeout / 1000).toFixed(1) }) }}
          </p>
        </div>
      </div>
    </div>
  </transition>

  <Dialog
    v-model:visible="desktopDialogVisible"
    modal
    :header="t('deeplink.desktop.title')"
    :style="{ width: '420px' }"
  >
    <div class="desktop-dialog">
      <div v-if="qrCodeDataUrl" class="qr-wrapper">
        <img class="qr-code" :src="qrCodeDataUrl" :alt="t('deeplink.qr.alt', { app: appName })" />
        <img v-if="icon" class="qr-icon" :src="icon" :alt="`${appName} icon`" />
      </div>
      <div v-else class="qr-fallback">
        <i class="pi pi-exclamation-triangle"></i>
        <p>{{ t('deeplink.desktop.help') }}</p>
      </div>
      <p>{{ t('deeplink.desktop.description', { app: appName }) }}</p>
      <small class="helper">{{ t('deeplink.desktop.help') }}</small>
    </div>
    <template #footer>
      <Button :label="t('deeplink.desktop.confirm')" icon="pi pi-check" @click="desktopDialogVisible = false" />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="mobileFallbackVisible"
    modal
    :header="t('deeplink.mobile.fallbackTitle', { app: appName })"
    :style="{ width: '420px' }"
  >
    <p>{{ t('deeplink.mobile.fallbackDescription', { app: appName }) }}</p>
    <template #footer>
      <Button :label="t('deeplink.mobile.tryAgain')" icon="pi pi-redo" @click="retryMobileFlow" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ProgressSpinner from 'primevue/progressspinner';
import Tag from 'primevue/tag';
import QRCode from 'qrcode';
import { computed, onBeforeUnmount, ref } from 'vue';
import { useI18n } from 'vue-i18n';

interface DeeplinkExperienceProps {
  appName: string;
  deeplinkUrl: string;
  icon?: string;
  timeout?: number;
}

const props = withDefaults(defineProps<DeeplinkExperienceProps>(), {
  appName: 'My App',
  deeplinkUrl: '',
  icon: '',
  timeout: 1.5,
});

const { t } = useI18n();

const desktopDialogVisible = ref(false);
const mobileFallbackVisible = ref(false);
const isLoadingOverlay = ref(false);
const qrCodeDataUrl = ref<string | null>(null);

const sanitizedTimeout = computed(() => Math.max(Number(props.timeout ?? 1.5), 0.5) * 1000);

let fallbackTimer: number | undefined;

function clearFallbackTimer() {
  if (fallbackTimer) {
    window.clearTimeout(fallbackTimer);
    fallbackTimer = undefined;
  }
}

function isMobileDevice() {
  if (typeof window === 'undefined') {
    return false;
  }
  const userAgent = window.navigator.userAgent || '';
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}

async function createQrCode(url: string) {
  try {
    qrCodeDataUrl.value = await QRCode.toDataURL(url, {
      width: 280,
      margin: 1,
      color: {
        dark: '#111827',
        light: '#ffffff',
      },
    });
  } catch (error) {
    console.error('Failed to generate QR code', error);
    qrCodeDataUrl.value = null;
  }
}

function openDeeplink() {
  if (typeof window === 'undefined' || !props.deeplinkUrl) {
    return;
  }
  window.location.href = props.deeplinkUrl;
}

async function trigger() {
  clearFallbackTimer();
  desktopDialogVisible.value = false;
  mobileFallbackVisible.value = false;
  isLoadingOverlay.value = false;

  if (!props.deeplinkUrl) {
    return;
  }

  if (!isMobileDevice()) {
    await createQrCode(props.deeplinkUrl);
    desktopDialogVisible.value = true;
    return;
  }

  isLoadingOverlay.value = true;
  openDeeplink();
  fallbackTimer = window.setTimeout(() => {
    isLoadingOverlay.value = false;
    mobileFallbackVisible.value = true;
  }, sanitizedTimeout.value);
}

function retryMobileFlow() {
  mobileFallbackVisible.value = false;
  trigger();
}

onBeforeUnmount(() => {
  clearFallbackTimer();
});

defineExpose({
  trigger,
});
</script>

<style scoped>
.deeplink-card {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.deeplink-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.deeplink-icon img {
  width: 64px;
  height: 64px;
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.18);
  border: 4px solid var(--surface-0);
  object-fit: cover;
}

.deeplink-content h4 {
  margin: 0 0 0.35rem 0;
  font-size: 1.35rem;
}

.deeplink-content p {
  margin: 0;
  color: var(--text-color-secondary);
}

.deeplink-url {
  display: inline-block;
  margin-top: 0.4rem;
  color: var(--brand-primary);
  font-weight: 600;
}

.desktop-dialog {
  display: grid;
  gap: 1rem;
  text-align: center;
}

.desktop-dialog p {
  margin: 0;
}

.desktop-dialog .helper {
  color: var(--text-color-secondary);
}

.qr-fallback {
  display: grid;
  place-items: center;
  gap: 0.5rem;
  color: var(--text-color-secondary);
  font-weight: 600;
}

.qr-fallback .pi {
  font-size: 1.4rem;
  color: var(--brand-primary);
}
</style>
