<template>
  <article class="qr-card surface-card">
    <div class="qr-card__media" :style="{ backgroundColor: props.lightColor }">
      <img v-if="qrDataUrl" :src="qrDataUrl" alt="QR code" class="qr-card__image" />
      <div v-if="props.icon" class="qr-card__icon" :style="{ color: props.darkColor }">
        <i :class="['pi', props.icon]" />
      </div>
    </div>
    <div class="qr-card__body">
      <p class="qr-card__text">{{ props.content }}</p>
      <slot />
    </div>
  </article>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import QRCode from 'qrcode';

type Props = {
  content: string;
  lightColor?: string;
  darkColor?: string;
  icon?: string;
};

const props = withDefaults(defineProps<Props>(), {
  content: 'https://component-lab.dev',
  lightColor: '#ffffff',
  darkColor: '#111827',
  icon: '',
});

const qrDataUrl = ref<string>('');

const generateCode = async () => {
  if (!props.content) {
    qrDataUrl.value = '';
    return;
  }

  try {
    qrDataUrl.value = await QRCode.toDataURL(props.content, {
      color: {
        light: props.lightColor,
        dark: props.darkColor,
      },
      margin: 2,
      scale: 8,
    });
  } catch (error) {
    console.error('Failed to generate QR code', error);
    qrDataUrl.value = '';
  }
};

watch(
  () => [props.content, props.lightColor, props.darkColor],
  () => {
    generateCode();
  },
  { immediate: true }
);

onMounted(() => {
  if (!qrDataUrl.value) {
    generateCode();
  }
});
</script>

<style scoped>
.qr-card {
  border-radius: 1.25rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: 0 16px 50px -40px rgba(15, 23, 42, 0.6);
}

.qr-card__media {
  position: relative;
  border-radius: 1rem;
  padding: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.qr-card__image {
  width: 100%;
  max-width: 220px;
  border-radius: 0.75rem;
}

.qr-card__icon {
  position: absolute;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 1rem;
  background-color: color-mix(in srgb, var(--surface-0) 90%, transparent);
  display: grid;
  place-items: center;
  font-size: 1.75rem;
  box-shadow: 0 12px 30px -18px rgba(15, 23, 42, 0.45);
}

html.dark-mode .qr-card__icon {
  background-color: color-mix(in srgb, var(--surface-0) 70%, transparent);
  box-shadow: 0 12px 34px -18px rgba(8, 14, 24, 0.7);
}

.qr-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.qr-card__text {
  margin: 0;
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--text-color);
}
</style>
