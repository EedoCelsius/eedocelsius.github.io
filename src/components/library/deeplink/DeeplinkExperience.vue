<script setup lang="ts">
import { computed, onBeforeUnmount, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import QrcodeVue from 'qrcode.vue'

const props = defineProps({
  appName: {
    type: String,
    required: true,
  },
  deeplinkUrl: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  timeout: {
    type: Number,
    default: 1.5,
    validator: (value: number) => value > 0,
  },
})

const emit = defineEmits<{
  triggered: [device: 'mobile' | 'desktop']
}>()

const { t } = useI18n()

const state = reactive({
  showDesktopDialog: false,
  showInstallDialog: false,
  showLoadingOverlay: false,
})

const isMobileDevice = () => {
  if (typeof navigator === 'undefined') {
    return false
  }

  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

let installTimer: ReturnType<typeof setTimeout> | null = null

const clearInstallTimer = () => {
  if (installTimer) {
    clearTimeout(installTimer)
    installTimer = null
  }
}

const triggerDeepLink = () => {
  const mobile = isMobileDevice()

  emit('triggered', mobile ? 'mobile' : 'desktop')

  if (mobile) {
    state.showLoadingOverlay = true
    state.showInstallDialog = false

    clearInstallTimer()
    installTimer = window.setTimeout(() => {
      state.showLoadingOverlay = false
      state.showInstallDialog = true
    }, props.timeout * 1000)

    requestAnimationFrame(() => {
      window.location.href = props.deeplinkUrl
    })
  } else {
    state.showDesktopDialog = true
  }
}

const closeDialogs = () => {
  state.showDesktopDialog = false
  state.showInstallDialog = false
  state.showLoadingOverlay = false
  clearInstallTimer()
}

const loadingTitle = computed(() =>
  t('components.deeplinkExperience.mobileLoadingTitle', { appName: props.appName }),
)
const loadingDescription = computed(() =>
  t('components.deeplinkExperience.mobileLoadingDescription'),
)
const desktopTitle = computed(() => t('components.deeplinkExperience.desktopDialogTitle'))
const desktopDescription = computed(() =>
  t('components.deeplinkExperience.desktopDialogDescription', { appName: props.appName }),
)
const desktopHint = computed(() =>
  t('components.deeplinkExperience.desktopDialogHint', { appName: props.appName }),
)
const desktopActionLabel = computed(() =>
  t('components.deeplinkExperience.desktopDialogAction'),
)
const installTitle = computed(() =>
  t('components.deeplinkExperience.mobileInstallTitle', { appName: props.appName }),
)
const installDescription = computed(() =>
  t('components.deeplinkExperience.mobileInstallDescription'),
)
const installActionLabel = computed(() =>
  t('components.deeplinkExperience.mobileInstallAction'),
)

onBeforeUnmount(() => {
  clearInstallTimer()
})

defineExpose({
  trigger: triggerDeepLink,
  close: closeDialogs,
})
</script>

<template>
  <div class="deeplink-experience surface-card border-round-2xl shadow-2 p-4">
    <div class="flex align-items-center gap-3 mb-3">
      <img :src="icon" :alt="appName" class="app-icon shadow-2" />
      <div>
        <h3 class="text-2xl m-0">{{ appName }}</h3>
        <p class="m-0 text-color-secondary">
          {{ t('components.deeplinkExperience.shortDescription') }}
        </p>
      </div>
    </div>

    <p class="text-color-secondary">
      {{ t('components.deeplinkExperience.description') }}
    </p>

    <div class="flex align-items-center justify-content-between flex-wrap gap-3">
      <div class="text-sm text-color-secondary">
        <i class="pi pi-mobile mr-2" />
        {{ t('components.deeplinkExperience.desktopDialogHint', { appName }) }}
      </div>
      <Button class="p-button-rounded" @click="triggerDeepLink">
        {{ t('components.deeplinkExperience.playground.trigger') }}
      </Button>
    </div>

    <Dialog
      v-model:visible="state.showDesktopDialog"
      modal
      :header="desktopTitle"
      class="max-w-26rem"
      :dismissable-mask="true"
      @hide="state.showDesktopDialog = false"
    >
      <p class="text-color-secondary mb-4">
        {{ desktopDescription }}
      </p>
      <div class="qr-wrapper">
        <div class="qr-container">
          <QrcodeVue :value="deeplinkUrl" :size="220" level="H" render-as="canvas" />
          <div class="qr-icon">
            <img :src="icon" :alt="appName" />
          </div>
        </div>
        <p class="text-sm text-color-secondary mt-3">{{ desktopHint }}</p>
      </div>
      <template #footer>
        <Button autofocus class="p-button-rounded" @click="state.showDesktopDialog = false">
          {{ desktopActionLabel }}
        </Button>
      </template>
    </Dialog>

    <Dialog
      v-model:visible="state.showInstallDialog"
      modal
      :header="installTitle"
      class="max-w-24rem"
      :dismissable-mask="true"
      @hide="state.showInstallDialog = false"
    >
      <p class="text-color-secondary">{{ installDescription }}</p>
      <template #footer>
        <Button class="p-button-rounded" @click="state.showInstallDialog = false">
          {{ installActionLabel }}
        </Button>
      </template>
    </Dialog>

    <transition name="fade">
      <div v-if="state.showLoadingOverlay" class="loading-overlay" role="status" aria-live="polite">
        <div class="loading-content surface-card border-round-2xl shadow-4 p-4 text-center">
          <ProgressSpinner stroke-width="4" style="width: 64px; height: 64px" />
          <h3 class="mt-3 mb-2">{{ loadingTitle }}</h3>
          <p class="m-0 text-color-secondary">{{ loadingDescription }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.deeplink-experience {
  position: relative;
  overflow: hidden;
}

.app-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  object-fit: cover;
  background-color: var(--surface-section);
}

.qr-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qr-container {
  position: relative;
  width: 220px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  background: var(--surface-card);
  border-radius: 24px;
  box-shadow: 0 1rem 2.5rem -1.5rem rgba(0, 0, 0, 0.35);
}

.qr-container canvas,
.qr-container svg {
  width: 100% !important;
  height: 100% !important;
}

.qr-icon {
  position: absolute;
  width: 72px;
  height: 72px;
  border-radius: 20px;
  overflow: hidden;
  background-color: var(--surface-card);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.75rem 2rem -1rem rgba(0, 0, 0, 0.35);
}

.qr-icon img {
  width: 56px;
  height: 56px;
  object-fit: cover;
}

.loading-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
  z-index: 20;
}

.loading-content {
  max-width: 320px;
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
