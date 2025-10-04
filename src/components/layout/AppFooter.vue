<template>
  <footer class="app-footer">
    <div class="app-footer__inner">
      <span>&copy; {{ new Date().getFullYear() }} Component Lab.</span>
      <span class="muted">Made with PrimeVue · Vue Router · Vue I18n</span>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  margin-top: auto;
  padding: 2rem 1.5rem 3rem;
  background: color-mix(in srgb, var(--surface-100) 80%, transparent);
  border-top: 1px solid color-mix(in srgb, var(--surface-300) 40%, transparent);
}

.app-footer__inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--text-color-secondary);
  font-size: 0.9rem;
}

.muted {
  font-size: 0.85rem;
}
</style>
