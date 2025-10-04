<template>
  <a
    :href="href"
    class="lab-link"
    :target="targetAttr"
    :rel="relAttr"
  >
    <span class="lab-link__label">{{ label }}</span>
    <i :class="['pi', resolvedIcon]" aria-hidden="true"></i>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  href: {
    type: String,
    required: true
  },
  openInNewTab: {
    type: Boolean,
    default: true
  },
  icon: {
    type: String,
    default: ''
  }
});

const resolvedIcon = computed(() => props.icon || 'pi-arrow-up-right');

const targetAttr = computed(() => (props.openInNewTab ? '_blank' : undefined));
const relAttr = computed(() => (props.openInNewTab ? 'noopener noreferrer' : undefined));
</script>

<style scoped>
.lab-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  color: var(--text-primary);
  text-decoration: none;
  background: color-mix(in srgb, var(--accent-color) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent-color) 45%, transparent);
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 8px 20px -16px rgba(76, 99, 171, 0.6);
}

.lab-link:hover {
  transform: translateY(-1px);
  background: color-mix(in srgb, var(--accent-color) 20%, transparent);
}

.lab-link__label {
  font-weight: 500;
  letter-spacing: 0.01em;
}
</style>
