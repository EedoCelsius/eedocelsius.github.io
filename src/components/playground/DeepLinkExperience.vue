<script setup>
import { computed, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import QrcodeVue from 'qrcode.vue';

const props = defineProps({
  appName: {
    type: String,
    required: true
  },
  deeplinkUrl: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  },
  timeout: {
    type: Number,
    default: 1.5
  }
});

const { t } = useI18n();

const showDesktopDialog = ref(false);
const showInstallDialog = ref(false);
const showLoadingOverlay = ref(false);

let timeoutHandle;

const isMobile = () => {
  if (typeof navigator === 'undefined') {
    return false;
  }
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const normalizedTimeout = computed(() => Math.max(props.timeout ?? 1.5, 0.3) * 1000);

const clearTimer = () => {
  if (timeoutHandle) {
    clearTimeout(timeoutHandle);
    timeoutHandle = undefined;
  }
};

const trigger = () => {
  clearTimer();
  if (isMobile()) {
    showLoadingOverlay.value = true;
    showInstallDialog.value = false;
    if (typeof window !== 'undefined') {
      try {
        window.location.href = props.deeplinkUrl;
      } catch (error) {
        console.warn('Unable to navigate to deeplink', error);
      }
    }
    timeoutHandle = setTimeout(() => {
      showLoadingOverlay.value = false;
      showInstallDialog.value = true;
    }, normalizedTimeout.value);
  } else {
    showDesktopDialog.value = true;
  }
};

defineExpose({ trigger });

const closeDesktopDialog = () => {
  showDesktopDialog.value = false;
};

const closeInstallDialog = () => {
  showInstallDialog.value = false;
};

onUnmounted(() => {
  clearTimer();
});
</script>

<template>
  <div class="deeplink-experience">
    <slot>
      <Button icon="pi pi-external-link" :label="t('playground.deeplink.actions.trigger')" @click="trigger" />
    </slot>

    <Dialog
      v-model:visible="showDesktopDialog"
      modal
      :draggable="false"
      :header="t('deeplinkComponent.desktop.title')"
      :style="{ width: 'min(420px, 90vw)' }"
      :breakpoints="{ '960px': '95vw' }"
    >
      <div class="dialog-content">
        <p>{{ t('deeplinkComponent.desktop.description', { appName: props.appName }) }}</p>
        <div class="qr-wrapper" role="img" :aria-label="`${props.appName} deeplink QR`">
          <QrcodeVue :value="props.deeplinkUrl" :size="220" level="H" render-as="svg" />
          <div v-if="props.icon" class="qr-icon">
            <img :src="props.icon" :alt="`${props.appName} icon`" />
          </div>
        </div>
        <p class="dialog-hint">{{ t('deeplinkComponent.desktop.hint', { appName: props.appName }) }}</p>
        <div class="dialog-actions">
          <Button :label="t('deeplinkComponent.desktop.confirm')" @click="closeDesktopDialog" />
        </div>
      </div>
    </Dialog>

    <Dialog
      v-model:visible="showInstallDialog"
      modal
      :draggable="false"
      :header="t('deeplinkComponent.mobile.installTitle')"
      :style="{ width: 'min(360px, 90vw)' }"
    >
      <div class="dialog-content">
        <p>{{ t('deeplinkComponent.mobile.installMessage', { appName: props.appName }) }}</p>
        <div class="dialog-actions">
          <Button :label="t('deeplinkComponent.mobile.confirm')" @click="closeInstallDialog" />
        </div>
      </div>
    </Dialog>

    <transition name="fade">
      <div v-if="showLoadingOverlay" class="deeplink-overlay" role="alert" aria-live="assertive">
        <div class="deeplink-overlay__panel">
          <ProgressSpinner strokeWidth="6" style="width: 64px; height: 64px" />
          <p class="deeplink-overlay__text">{{ t('deeplinkComponent.mobile.loading', { appName: props.appName }) }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.dialog-content {
  display: grid;
  gap: 1rem;
  text-align: center;
  color: var(--text-secondary);
}

.dialog-hint {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.dialog-actions {
  display: flex;
  justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
