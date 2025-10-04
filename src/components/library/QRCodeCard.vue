<template>
  <div class="qr-card surface-card">
    <div class="qr-card-header">
      <span class="label">Component Lab</span>
      <i class="pi pi-qrcode"></i>
    </div>
    <div class="qr-card-body">
      <div class="qr-wrapper">
        <Transition name="fade" mode="out-in">
          <img v-if="qrCodeUrl" :key="qrCodeUrl" :src="qrCodeUrl" alt="QR code" class="qr-image" />
          <div v-else key="loading" class="qr-placeholder">
            <i class="pi pi-spin pi-spinner"></i>
          </div>
        </Transition>
        <div v-if="icon" class="qr-icon">
          <img :src="icon" alt="Icon" />
        </div>
      </div>
      <p class="qr-content">{{ content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import QRCode from 'qrcode';

const props = defineProps({
  content: {
    type: String,
    required: true
  },
  lightColor: {
    type: String,
    default: '#ffffff'
  },
  darkColor: {
    type: String,
    default: '#000000'
  },
  icon: {
    type: String,
    default: ''
  }
});

const qrCodeUrl = ref('');

async function generateQRCode() {
  try {
    qrCodeUrl.value = await QRCode.toDataURL(props.content, {
      color: {
        light: props.lightColor,
        dark: props.darkColor
      },
      margin: 1,
      width: 280
    });
  } catch (error) {
    console.error('Failed to generate QR code', error);
  }
}

onMounted(generateQRCode);

watch(
  () => [props.content, props.lightColor, props.darkColor],
  () => {
    generateQRCode();
  }
);
</script>

<style scoped>
.qr-card {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.qr-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
  color: var(--color-text-muted);
}

.qr-card-header .label {
  font-weight: 600;
  color: var(--color-text);
}

.qr-card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.qr-wrapper {
  position: relative;
  width: 240px;
  height: 240px;
  border-radius: var(--radius-medium);
  overflow: hidden;
  background: rgba(92, 124, 250, 0.08);
  display: grid;
  place-items: center;
}

.qr-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.qr-placeholder {
  font-size: 2rem;
  color: var(--color-accent);
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
}

.qr-icon {
  position: absolute;
  width: 72px;
  height: 72px;
  border-radius: 20px;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: var(--color-surface);
  box-shadow: var(--shadow-soft);
}

.qr-icon img {
  width: 42px;
  height: 42px;
}

.qr-content {
  margin: 0;
  text-align: center;
  font-size: 0.9rem;
  color: var(--color-text-muted);
  word-break: break-word;
}
</style>
