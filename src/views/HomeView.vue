<template>
  <div class="page surface-alt">
    <section class="hero app-surface">
      <div class="hero-content">
        <h1 class="section-title">{{ t('home.heroTitle') }}</h1>
        <p class="section-subtitle">{{ t('home.heroSubtitle') }}</p>
        <div class="meta">
          <i class="pi pi-flask"></i>
          <span>{{ componentCountLabel }}</span>
        </div>
      </div>
    </section>

    <section class="components app-surface">
      <div class="section-heading">
        <h2>{{ t('navigation.components') }}</h2>
        <p class="text-muted">{{ t('app.description') }}</p>
      </div>
      <div class="component-grid">
        <Card v-for="entry in localizedComponents" :key="entry.id" class="component-card">
          <template #title>
            <div class="card-title">{{ entry.name }}</div>
          </template>
          <template #content>
            <p class="text-muted">{{ entry.description }}</p>
          </template>
          <template #footer>
            <RouterLink :to="`/components/${entry.id}`">
              <Button
                icon="pi pi-compass"
                :label="t('navigation.components')"
                class="p-button-sm"
              />
            </RouterLink>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { RouterLink } from 'vue-router';
import { components } from '../components/lab/registry';

const { t, locale } = useI18n();

const localizedComponents = computed(() =>
  components.map((entry) => ({
    id: entry.id,
    name: entry.name[locale.value as 'en' | 'ko'] ?? entry.name.en,
    description: entry.description[locale.value as 'en' | 'ko'] ?? entry.description.en
  }))
);

const componentCountLabel = computed(() => {
  const count = components.length;
  if (locale.value === 'ko') {
    return t('home.componentCount', { count });
  }
  const suffix = count === 1 ? '' : 's';
  return `${count} component${suffix}`;
});
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
}

.hero {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hero .meta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  background: rgba(99, 102, 241, 0.12);
  color: var(--accent-color);
  font-weight: 500;
  width: fit-content;
}

.section-heading {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.component-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  font-weight: 600;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .page {
    padding: 1.5rem 1rem;
  }
}
</style>
