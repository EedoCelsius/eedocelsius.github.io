<template>
  <div class="deeplink-experience surface-card">
    <div class="content">
      <div class="app-meta">
        <span class="app-icon" v-if="iconToShow">
          <img :src="iconToShow" :alt="appname" />
        </span>
        <div>
          <h4>{{ appname }}</h4>
          <p>{{ deeplinkURL }}</p>
        </div>
      </div>
      <p class="description">
        {{ t('deeplink.mobileFallbackMessage', { timeout: (timeout / 1000).toFixed(1) }) }}
      </p>
      <div class="actions">
        <Button icon="pi pi-external-link" :label="t('app.trigger')" @click="trigger" />
      </div>
    </div>

    <Dialog
      v-model:visible="state.showDesktopDialog"
      modal
      :header="t('deeplink.desktopTitle')"
      class="desktop-dialog"
      :style="{ width: 'min(90vw, 420px)' }"
    >
      <div class="desktop-body">
        <p>{{ t('deeplink.desktopMessage', { app: appname }) }}</p>
        <div class="qr-wrapper">
          <QrcodeVue :value="deeplinkURL" :size="220" level="H" />
          <img v-if="iconToShow" class="qr-icon" :src="iconToShow" :alt="appname" />
        </div>
        <small>{{ t('deeplink.desktopScan', { app: appname }) }}</small>
      </div>
      <template #footer>
        <Button :label="t('deeplink.close')" @click="state.showDesktopDialog = false" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="state.showInstallDialog"
      modal
      :header="t('deeplink.mobileFallbackTitle')"
      class="mobile-dialog"
      :style="{ width: 'min(90vw, 360px)' }"
    >
      <p>{{ t('deeplink.mobileFallbackMessage', { timeout: (timeout / 1000).toFixed(1) }) }}</p>
      <template #footer>
        <div class="dialog-actions">
          <Button severity="secondary" text :label="t('deeplink.close')" @click="closeInstallDialog" />
          <Button icon="pi pi-download" :label="t('deeplink.installCta')" @click="emitInstall" />
        </div>
      </template>
    </Dialog>

    <Transition name="fade">
      <div v-if="state.showMobileOverlay" class="mobile-overlay">
        <div class="overlay-card surface-section">
          <ProgressSpinner strokeWidth="4" style="width: 40px; height: 40px" />
          <p>{{ t('deeplink.mobileLaunching') }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, reactive, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ProgressSpinner from 'primevue/progressspinner';
import QrcodeVue from 'qrcode.vue';

const props = defineProps({
  appname: {
    type: String,
    required: true,
  },
  deeplinkURL: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: '',
  },
  timeout: {
    type: Number,
    default: 1500,
  },
});

const emit = defineEmits(['install']);

const { t } = useI18n();

const state = reactive({
  showDesktopDialog: false,
  showInstallDialog: false,
  showMobileOverlay: false,
});

let fallbackTimer = null;

const iconToShow = computed(() => props.icon || '');

const isMobile = computed(() => {
  if (typeof navigator === 'undefined') return false;
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];
  return toMatch.some((toMatchItem) => navigator.userAgent.match(toMatchItem));
});

function trigger() {
  clearTimer();
  if (isMobile.value) {
    launchOnMobile();
  } else {
    state.showDesktopDialog = true;
  }
}

function launchOnMobile() {
  state.showInstallDialog = false;
  state.showMobileOverlay = true;
  openDeeplink();
  fallbackTimer = window.setTimeout(() => {
    state.showMobileOverlay = false;
    state.showInstallDialog = true;
  }, props.timeout);
}

function openDeeplink() {
  const anchor = document.createElement('a');
  anchor.href = props.deeplinkURL;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

function closeInstallDialog() {
  state.showInstallDialog = false;
}

function emitInstall() {
  emit('install');
  state.showInstallDialog = false;
}

function clearTimer() {
  if (fallbackTimer) {
    clearTimeout(fallbackTimer);
    fallbackTimer = null;
  }
}

function reset() {
  clearTimer();
  state.showDesktopDialog = false;
  state.showInstallDialog = false;
  state.showMobileOverlay = false;
}

onBeforeUnmount(() => {
  clearTimer();
});

defineExpose({
  trigger,
  reset,
});
</script>

<style scoped>
.deeplink-experience {
  width: min(500px, 100%);
  border-radius: 1.25rem;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 20px 50px -40px rgba(15, 23, 42, 0.75);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.app-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.app-meta h4 {
  margin: 0;
}

.app-meta p {
  margin: 0;
  color: var(--text-color-secondary);
  font-size: 0.9rem;
  word-break: break-all;
}

.app-icon {
  width: 56px;
  height: 56px;
  border-radius: 20px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 12px 28px -18px rgba(15, 23, 42, 0.65);
}

.app-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.description {
  margin: 0;
  color: var(--text-color-secondary);
}

.actions {
  display: flex;
  justify-content: flex-end;
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
  display: inline-flex;
  padding: 1rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.08);
}

.qr-wrapper canvas,
.qr-wrapper svg {
  border-radius: 0.75rem;
}

.qr-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 56px;
  height: 56px;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 6px 22px -14px rgba(15, 23, 42, 0.75);
}

.dialog-actions {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 0.75rem;
}

.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.overlay-card {
  padding: 1.5rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  min-width: 220px;
  box-shadow: 0 24px 60px -32px rgba(15, 23, 42, 0.8);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
