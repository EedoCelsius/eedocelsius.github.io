<template>
  <div class="home-view preview-page">
    <section class="hero">
      <h1>{{ t('home.title') }}</h1>
      <p>{{ t('home.description') }}</p>
    </section>

    <section class="component-grid">
      <article
        v-for="metadata in catalog"
        :key="metadata.slug"
        class="component-card"
      >
        <header>
          <span class="component-label">{{ metadata.name }}</span>
          <h2>{{ componentTitle(metadata) }}</h2>
        </header>
        <p class="component-summary">
          {{ componentSummary(metadata) }}
        </p>
        <RouterLink :to="`/preview/${metadata.slug}`" class="preview-link">
          {{ t('home.previewCta') }}
          <i class="pi pi-arrow-right" />
        </RouterLink>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { ComponentMetadata } from '@/components/library';
import { componentCatalog } from '@/components/library';

const { t } = useI18n();

const catalog = computed(() => componentCatalog);

const translationOrFallback = (key: string, fallback: string) => {
  const translated = t(key);
  return translated === key ? fallback : translated;
};

const componentTitle = (metadata: ComponentMetadata) =>
  translationOrFallback(`home.${metadata.i18nKey}.title`, metadata.name);

const componentSummary = (metadata: ComponentMetadata) =>
  translationOrFallback(`home.${metadata.i18nKey}.summary`, metadata.description);
</script>

<style scoped>
.hero {
  margin-bottom: 2.5rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.component-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.component-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #6366f1;
  text-transform: uppercase;
}

.component-summary {
  flex: 1;
  color: #425466;
  line-height: 1.6;
}

.preview-link {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #1e40af;
  text-decoration: none;
}
</style>
