<template>
  <article class="qr-card" role="img" :aria-label="ariaLabel">
    <div class="qr-preview">
      <canvas ref="canvasRef" class="qr-canvas" :width="size" :height="size"></canvas>
      <div v-if="icon" class="qr-icon">
        <img :src="icon" alt="" />
      </div>
    </div>
    <div class="qr-details">
      <slot>
        <p class="qr-text">{{ content }}</p>
      </slot>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import QRCode from 'qrcode';

const props = defineProps({
  content: {
    type: String,
    required: true
  },
  lightColor: {
    type: String,
    default: '#f0f4ff'
  },
  darkColor: {
    type: String,
    default: '#1c2560'
  },
  icon: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 224
  }
});

const canvasRef = ref<HTMLCanvasElement | null>(null);

const ariaLabel = computed(() => `QR code for ${props.content}`);

async function renderQr() {
  if (!canvasRef.value) {
    return;
  }

  try {
    await QRCode.toCanvas(canvasRef.value, props.content, {
      width: props.size,
      margin: 2,
      color: {
        dark: props.darkColor,
        light: props.lightColor
      }
    });
  } catch (error) {
    console.error('Failed to render QR code', error);
  }
}

onMounted(renderQr);

watch(
  () => [props.content, props.lightColor, props.darkColor, props.size],
  () => {
    renderQr();
  }
);
</script>

<style scoped>
.qr-card {
  display: grid;
  grid-template-columns: minmax(0, auto) minmax(0, 1fr);
  gap: 1.5rem;
  padding: 1.75rem;
  border-radius: 1.5rem;
  background: var(--surface-card);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-soft);
  align-items: center;
}

.qr-preview {
  position: relative;
  width: fit-content;
}

.qr-canvas {
  display: block;
  border-radius: 1.25rem;
}

.qr-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 3.5rem;
  height: 3.5rem;
  transform: translate(-50%, -50%);
  border-radius: 1rem;
  background: color-mix(in srgb, var(--surface-card) 82%, transparent);
  display: grid;
  place-items: center;
  box-shadow: 0 12px 24px -18px rgba(15, 23, 42, 0.45);
}

.qr-icon img {
  max-width: 2.4rem;
  max-height: 2.4rem;
  object-fit: contain;
}

.qr-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: var(--text-primary);
}

.qr-text {
  font-size: 1.05rem;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .qr-card {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .qr-preview {
    justify-self: center;
  }
}
</style>
