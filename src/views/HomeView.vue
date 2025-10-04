<template>
  <div class="home-view">
    <section class="hero component-lab-card">
      <div class="hero-content">
        <h1>{{ t('home.heroTitle') }}</h1>
        <p>{{ t('home.heroSubtitle') }}</p>
        <div class="hero-actions">
          <Button
            size="large"
            :label="t('home.getStarted')"
            icon="pi pi-play"
            @click="goToFirstComponent"
            :disabled="!firstComponentSlug"
          />
          <Tag severity="info" :value="t('home.componentCount', { count: componentCount })" />
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <i class="pi pi-qrcode" />
        <i class="pi pi-mobile" />
        <i class="pi pi-bolt" />
      </div>
    </section>

    <section class="component-section">
      <header class="section-header">
        <h2 class="component-lab-section-title">{{ t('nav.components') }}</h2>
        <p class="section-subtitle">
          {{ componentCount ? t('home.componentCount', { count: componentCount }) : t('home.comingSoon') }}
        </p>
      </header>

      <div class="component-lab-grid columns-2">
        <article
          v-for="component in componentCards"
          :key="component.slug"
          class="component-card component-lab-card"
        >
          <div class="card-headline">
            <h3>{{ component.name }}</h3>
            <p>{{ component.summary }}</p>
          </div>
          <RouterLink :to="{ name: 'component-playground', params: { slug: component.slug } }">
            <Button
              class="card-button"
              icon="pi pi-flask"
              :label="t('home.getStarted')"
            />
          </RouterLink>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import { componentRegistry } from '../lab/componentsRegistry';

const router = useRouter();
const { t } = useI18n();

const componentCards = computed(() =>
  componentRegistry.map((item) => ({
    slug: item.slug,
    name: t(item.nameKey),
    summary: t(item.summaryKey),
  })),
);

const componentCount = computed(() => componentRegistry.length);
const firstComponentSlug = componentRegistry[0]?.slug ?? '';

function goToFirstComponent() {
  if (!firstComponentSlug) return;
  router.push({ name: 'component-playground', params: { slug: firstComponentSlug } });
}
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.hero {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  align-items: center;
}

.hero-content h1 {
  font-size: clamp(2rem, 4vw, 2.5rem);
  margin: 0 0 1rem;
}

.hero-content p {
  margin: 0 0 1.5rem;
  color: var(--text-color-secondary);
  font-size: 1.05rem;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-visual {
  display: grid;
  place-items: center;
  gap: 1rem;
  font-size: 2.5rem;
  color: var(--primary-color);
}

.hero-visual i {
  font-size: clamp(2rem, 5vw, 3rem);
  opacity: 0.85;
}

.component-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.section-subtitle {
  color: var(--text-color-secondary);
}

.component-card {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  justify-content: space-between;
}

.card-headline h3 {
  margin: 0 0 0.5rem;
}

.card-headline p {
  margin: 0;
  color: var(--text-color-secondary);
}

.card-button :deep(.p-button-label) {
  font-weight: 600;
}
</style>
