<template>
  <div class="home">
    <section class="hero container-narrow">
      <div class="hero__content surface-card">
        <h1>{{ t('app.title') }}</h1>
        <p class="hero__tagline">{{ t('app.tagline') }}</p>
        <p class="hero__description">{{ t('app.description') }}</p>
        <div class="hero__actions">
          <RouterLink to="/playground">
            <Button size="large" icon="pi pi-arrow-right" icon-pos="right" :label="t('home.heroCta')" />
          </RouterLink>
        </div>
      </div>
    </section>
    <section class="component-grid container-narrow">
      <header class="component-grid__header">
        <h2>{{ t('home.componentsTitle') }}</h2>
        <p class="text-secondary">{{ t('home.componentsSubtitle') }}</p>
      </header>
      <div class="component-grid__items">
        <article
          v-for="item in componentCards"
          :key="item.id"
          class="component-card surface-card"
        >
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <RouterLink :to="item.to" class="component-card__link">
            <span>{{ t('nav.playground') }}</span>
            <i class="pi pi-arrow-right" />
          </RouterLink>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { componentRegistry } from '@/modules/componentRegistry';

const { t } = useI18n();

const componentCards = computed(() =>
  componentRegistry.map((item) => ({
    id: item.id,
    title: t(item.nameKey),
    description: t(item.descriptionKey),
    to: { name: 'playground', params: { componentId: item.id } },
  }))
);
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 3rem 0 4rem;
}

.hero__content {
  padding: 3rem;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 32px 70px -60px rgba(15, 23, 42, 0.7);
}

.hero__content::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(92, 124, 250, 0.25), transparent 60%);
  pointer-events: none;
}

.hero__content h1 {
  margin: 0;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  letter-spacing: -0.03em;
}

.hero__tagline {
  margin: 0;
  font-size: 1.25rem;
  color: var(--primary-color);
  font-weight: 600;
}

.hero__description {
  margin: 0;
  max-width: 50ch;
  color: var(--text-color-secondary);
  line-height: 1.6;
}

.hero__actions {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
}

.hero__actions a {
  text-decoration: none;
}

.component-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.component-grid__items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}

.component-card {
  padding: 1.75rem;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 18px 50px -48px rgba(15, 23, 42, 0.75);
}

.component-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 60px -48px rgba(15, 23, 42, 0.8);
}

.component-card h3 {
  margin: 0;
  font-size: 1.1rem;
}

.component-card p {
  margin: 0;
  color: var(--text-color-secondary);
  flex: 1;
}

.component-card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  font-weight: 600;
  text-decoration: none;
}

@media (max-width: 768px) {
  .hero__content {
    padding: 2.5rem 1.75rem;
  }
}
</style>
