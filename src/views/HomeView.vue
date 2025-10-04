<template>
  <div class="home">
    <section class="hero surface-card">
      <div class="hero-content">
        <h1 class="section-title">{{ t('home.hero.title') }}</h1>
        <p class="section-subtitle">{{ t('home.hero.subtitle') }}</p>
        <div class="hero-actions">
          <RouterLink to="/components/qr-code-card">
            <Button
              class="hero-button"
              :label="t('componentsList.qrCodeCard.name')"
              icon="pi pi-compass"
            />
          </RouterLink>
          <RouterLink to="/components/app-link">
            <Button
              class="hero-button"
              :label="t('componentsList.appLink.name')"
              icon="pi pi-external-link"
              text
            />
          </RouterLink>
        </div>
      </div>
      <div class="hero-preview">
        <QRCodeCard
          content="https://component-lab.dev"
          light-color="#FFFFFF"
          dark-color="#233047"
          icon="/icons/lab-flask.svg"
        />
      </div>
    </section>

    <section id="components" class="components">
      <h2 class="section-title">{{ t('home.components.title') }}</h2>
      <p class="section-subtitle">{{ t('home.components.subtitle') }}</p>
      <div class="grid grid-cols-2 component-grid">
        <RouterLink
          v-for="definition in componentRegistry"
          :key="definition.id"
          :to="{ name: 'component-playground', params: { id: definition.id } }"
          class="component-card surface-card"
        >
          <div class="card-header">
            <span class="card-title">{{ t(definition.nameKey) }}</span>
            <i class="pi pi-arrow-right"></i>
          </div>
          <p class="card-description">{{ t(definition.descriptionKey) }}</p>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { componentRegistry } from '@/data/componentRegistry';
import QRCodeCard from '@/components/library/QRCodeCard.vue';

const { t } = useI18n();
</script>

<style scoped>
.home {
  width: min(1080px, 100%);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.hero {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  padding: 2.5rem;
  align-items: center;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.hero-button {
  width: 100%;
}

.hero-preview {
  display: flex;
  justify-content: center;
}

.component-grid {
  margin-top: 2rem;
}

.component-card {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.component-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 22px 40px rgba(22, 33, 70, 0.12);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 1.1rem;
}

.card-description {
  margin: 0;
  color: var(--color-text-muted);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero {
    padding: 1.75rem;
  }

  .hero-actions {
    flex-direction: column;
  }
}
</style>
