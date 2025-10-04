<template>
  <section class="home">
    <div class="hero">
      <div class="hero-text">
        <p class="hero-kicker">{{ t('app.tagline') }}</p>
        <h1>{{ t('home.heroTitle') }}</h1>
        <p class="hero-description">{{ t('home.heroDescription') }}</p>
        <RouterLink to="/playground" class="hero-cta">
          {{ t('home.cta') }}
          <i class="pi pi-arrow-right" aria-hidden="true"></i>
        </RouterLink>
      </div>
      <div class="hero-preview">
        <QrCodeCard
          content="https://component-lab.dev"
          light-color="#f0f4ff"
          dark-color="#1c2560"
          icon="https://api.iconify.design/mdi:test-tube.svg?color=%235c7cfa"
        >
          <div class="hero-card-content">
            <h2>{{ t('components.qrCodeCard.name') }}</h2>
            <p>{{ t('components.qrCodeCard.description') }}</p>
          </div>
        </QrCodeCard>
      </div>
    </div>

    <div class="feature-grid">
      <article class="feature" v-for="feature in features" :key="feature.title">
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </article>
    </div>

    <section class="latest">
      <header class="latest-header">
        <h2>{{ t('home.latestComponents') }}</h2>
        <RouterLink to="/playground" class="subtle-link">
          {{ t('home.cta') }}
        </RouterLink>
      </header>
      <div class="component-list">
        <article
          v-for="definition in componentDefinitions"
          :key="definition.id"
          class="component-card"
        >
          <h3>{{ t(definition.nameKey) }}</h3>
          <p>{{ t(definition.descriptionKey) }}</p>
        </article>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import QrCodeCard from '@/components/QrCodeCard.vue';
import { componentDefinitions } from '@/data/componentRegistry';

const { t } = useI18n();

const features = computed(() => [
  {
    title: t('home.featureShowcase'),
    description: t('home.featureShowcaseDesc')
  },
  {
    title: t('home.featureLocalisation'),
    description: t('home.featureLocalisationDesc')
  },
  {
    title: t('home.featureDesign'),
    description: t('home.featureDesignDesc')
  }
]);
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.hero {
  display: grid;
  gap: 2.5rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.hero-kicker {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--accent-color);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero h1 {
  margin: 0;
  font-size: clamp(2.5rem, 5vw, 3.2rem);
  line-height: 1.1;
}

.hero-description {
  margin: 0;
  font-size: 1.05rem;
  max-width: 32ch;
  color: var(--text-muted);
}

.hero-cta {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  border-radius: 999px;
  background: var(--accent-color);
  color: white;
  text-decoration: none;
  font-weight: 600;
  box-shadow: 0 16px 30px -20px var(--accent-color);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hero-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 24px 45px -22px var(--accent-color);
}

.hero-preview {
  justify-self: center;
  width: min(480px, 100%);
}

.hero-card-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hero-card-content h2 {
  margin: 0;
}

.hero-card-content p {
  margin: 0;
  color: var(--text-muted);
}

.feature-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.feature {
  padding: 1.5rem;
  border-radius: 1.25rem;
  background: color-mix(in srgb, var(--surface-card) 88%, transparent);
  border: 1px solid var(--border-subtle);
  box-shadow: 0 16px 30px -28px rgba(15, 23, 42, 0.45);
}

.feature h3 {
  margin: 0 0 0.75rem;
}

.feature p {
  margin: 0;
  color: var(--text-muted);
}

.latest {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.latest-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.subtle-link {
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 500;
}

.component-list {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.component-card {
  padding: 1.5rem;
  border-radius: 1.25rem;
  background: color-mix(in srgb, var(--surface-card) 92%, transparent);
  border: 1px solid var(--border-subtle);
}

.component-card h3 {
  margin: 0 0 0.75rem;
}

.component-card p {
  margin: 0;
  color: var(--text-muted);
}

@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .hero-text {
    order: 2;
    text-align: center;
    align-items: center;
  }

  .hero-description {
    max-width: 100%;
  }

  .hero-cta {
    align-self: center;
  }
}
</style>
