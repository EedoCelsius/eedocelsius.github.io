<template>
  <footer class="app-footer">
    <div class="footer-inner surface-card">
      <p>© {{ new Date().getFullYear() }} Component Lab. Crafted with calm energy.</p>
      <span class="text-muted">Made for personal exploration with PrimeVue &amp; Vue.</span>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  padding: 4rem 1.5rem 2rem;
  display: flex;
  justify-content: center;
}

.footer-inner {
  width: min(1080px, 100%);
  padding: 1.5rem;
  border-radius: var(--radius-large);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
}

.footer-inner p {
  margin: 0;
}
</style>
