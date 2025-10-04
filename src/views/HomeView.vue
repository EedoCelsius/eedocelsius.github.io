<template>
  <div class="fade-in">
    <section class="hero-section surface-card">
      <div>
        <p class="hero-title">
          <span class="pi pi-flask" style="margin-right: 0.5rem; color: var(--brand-primary);"></span>
          {{ t('home.hero.highlight') }}
        </p>
        <h1>{{ t('home.hero.title') }}</h1>
        <p class="hero-subtitle">{{ t('home.hero.subtitle') }}</p>
      </div>
    </section>

    <section class="component-grid">
      <article
        v-for="component in components"
        :key="component.slug"
        class="component-card"
      >
        <div>
          <h3>{{ component.name[currentLocale] }}</h3>
          <p>{{ t(component.descriptionKey) }}</p>
        </div>

        <div class="chip-set">
          <Chip
            v-for="tag in component.tags"
            :key="tag"
            :label="tag"
            class="shadow-2"
          />
        </div>

        <RouterLink :to="{ name: 'component-playground', params: { slug: component.slug } }">
          <Button
            :label="t('playground.documentation')"
            icon="pi pi-arrow-right"
            iconPos="right"
          />
        </RouterLink>
      </article>
    </section>

    <p class="hero-subtitle" style="margin-top: 2rem; text-align: center;">{{ t('home.componentList.comingSoon') }}</p>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Chip from 'primevue/chip';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { componentRegistry } from '../router/componentRegistry';

const { t, locale } = useI18n();

const components = componentRegistry;
const currentLocale = computed<'ko' | 'en'>(() => (locale.value.startsWith('ko') ? 'ko' : 'en'));
</script>
