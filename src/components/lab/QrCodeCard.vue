<template>
  <div class="mx-auto flex w-full max-w-sm flex-col items-center gap-5 rounded-3xl bg-gradient-to-br from-white/90 via-primary-50/70 to-primary-100/70 p-8 text-center shadow-lg dark:from-slate-900/90 dark:via-slate-900/80 dark:to-primary-900/20">
    <div class="relative h-44 w-44 overflow-hidden rounded-2xl bg-white/90 p-3 shadow-inner dark:bg-slate-900/80">
      <img v-if="qrDataUrl" :src="qrDataUrl" alt="QR code" class="h-full w-full object-contain" />
      <div
        v-if="icon"
        class="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-white/90 p-2 shadow-lg dark:bg-slate-900/80"
      >
        <img :src="icon" alt="icon" class="h-full w-full object-contain" />
      </div>
    </div>
    <div class="space-y-2">
      <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">{{ title }}</h3>
      <p class="text-sm text-muted">{{ subtitle }}</p>
    </div>
    <div class="w-full rounded-2xl bg-white/80 p-4 text-left text-xs text-slate-500 shadow-inner dark:bg-slate-900/80 dark:text-slate-400">
      <span class="font-semibold text-slate-700 dark:text-slate-100">{{ $t('lab.components.qrCard.props.content') }}:</span>
      <p class="mt-1 break-all">{{ displayContent }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import QRCode from 'qrcode';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  content: {
    type: String,
    default: 'https://component.lab'
  },
  lightColor: {
    type: String,
    default: '#ffffff'
  },
  darkColor: {
    type: String,
    default: '#1f2937'
  },
  icon: {
    type: String,
    default: ''
  }
});

const { t } = useI18n();
const qrDataUrl = ref('');

const generateQr = async () => {
  try {
    const value = props.content && props.content.trim() ? props.content : 'https://component.lab';
    qrDataUrl.value = await QRCode.toDataURL(value, {
      color: {
        light: props.lightColor || '#ffffff',
        dark: props.darkColor || '#1f2937'
      },
      margin: 1
    });
  } catch (error) {
    console.error('QR generation failed', error);
    qrDataUrl.value = '';
  }
};

watch(
  () => [props.content, props.lightColor, props.darkColor],
  () => {
    generateQr();
  },
  { immediate: true }
);

const title = computed(() => t('lab.components.qrCard.name'));
const subtitle = computed(() => t('lab.components.qrCard.description'));
const displayContent = computed(() => (props.content && props.content.trim() ? props.content : 'https://component.lab'));
</script>
