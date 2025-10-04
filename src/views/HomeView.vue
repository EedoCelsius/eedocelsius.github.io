<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { componentCatalog } from '../data/componentCatalog';

const { t } = useI18n();

const catalog = computed(() => componentCatalog.map((component) => ({
  ...component,
  name: t(component.nameKey),
  description: t(component.descriptionKey)
})));
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div>
      <p class="hero-kicker">Component Playground</p>
      <h1 id="hero-title">{{ t('home.hero.title') }}</h1>
      <p>{{ t('home.hero.subtitle') }}</p>
    </div>
  </section>

  <h2 class="section-title">{{ t('home.componentsTitle') }}</h2>
  <section class="components-grid">
    <article v-for="component in catalog" :key="component.id" class="component-card">
      <header>
        <h3>{{ component.name }}</h3>
      </header>
      <p>{{ component.description }}</p>
      <ul class="component-tags">
        <li v-for="tag in component.tags" :key="tag" class="component-tag">#{{ tag }}</li>
      </ul>
      <div class="card-footer">
        <RouterLink class="card-link" :to="component.route">
          <span>{{ t('home.openPlayground') }}</span>
          <i class="pi pi-arrow-right" aria-hidden="true"></i>
        </RouterLink>
      </div>
    </article>
  </section>
  <p class="section-note">{{ t('home.comingSoon') }}</p>
</template>

<style scoped>
.hero-kicker {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--accent);
  margin: 0 0 0.35rem;
}

.section-note {
  margin-top: 1.5rem;
  color: var(--text-muted);
}
</style>
