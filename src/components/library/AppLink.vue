<template>
  <a
    :href="href"
    class="app-link"
    :class="[`tone-${tone}`]"
    :target="openInNewTab ? '_blank' : '_self'"
    :rel="openInNewTab ? 'noopener noreferrer' : undefined"
  >
    <span class="label">{{ label }}</span>
    <i class="pi pi-arrow-up-right"></i>
  </a>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';

defineProps({
  href: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  tone: {
    type: String as PropType<'primary' | 'subtle'>,
    default: 'primary'
  },
  openInNewTab: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
.app-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.1rem;
  border-radius: 999px;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  border: 1px solid transparent;
}

.app-link .label {
  font-size: 0.95rem;
}

.tone-primary {
  background: var(--color-accent);
  color: #fff;
  box-shadow: 0 12px 24px rgba(92, 124, 250, 0.25);
}

.tone-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 32px rgba(92, 124, 250, 0.3);
}

.tone-subtle {
  background: transparent;
  border-color: var(--color-border);
  color: var(--color-text);
}

.tone-subtle:hover {
  background: var(--color-accent-soft);
  border-color: transparent;
}
</style>
