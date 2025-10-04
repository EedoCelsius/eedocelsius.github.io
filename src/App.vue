<template>
  <div class="app-shell">
    <header class="app-header surface-section">
      <div class="header-content">
        <RouterLink class="brand" to="/">
          <img class="brand-logo" alt="Logo" src="/logo.svg" />
          <div class="brand-text">
            <h1>Experience Components</h1>
            <p>{{ $t('app.tagline') }}</p>
          </div>
        </RouterLink>
        <nav class="header-actions">
          <RouterLink class="p-button p-button-text" to="/preview/deeplink-experience">
            {{ $t('app.previewDeeplink') }}
          </RouterLink>
          <a
            class="p-button p-button-text"
            href="https://github.com/eedocelsius"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  border-bottom: 1px solid var(--surface-border);
}

.header-content {
  margin: 0 auto;
  padding: 1.5rem;
  width: min(1100px, 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  gap: 1rem;
}

.brand-logo {
  width: 48px;
  height: 48px;
}

.brand-text h1 {
  margin: 0;
  font-size: 1.5rem;
}

.brand-text p {
  margin: 0;
  color: var(--text-color-secondary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.app-main {
  flex: 1;
  padding: 2rem 1.5rem 3rem;
  width: min(1100px, 100%);
  margin: 0 auto;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-actions {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
