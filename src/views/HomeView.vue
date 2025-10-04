<template>
  <section class="home">
    <div class="intro">
      <h2>{{ $t('app.componentExplorer') }}</h2>
      <p>{{ $t('home.subtitle') }}</p>
    </div>
    <div class="component-grid">
      <Card
        v-for="component in flatComponents"
        :key="component.key"
        class="component-card"
      >
        <template #title>{{ component.name }}</template>
        <template #subtitle>{{ component.description }}</template>
        <template #footer>
          <RouterLink
            class="p-button p-button-rounded p-button-outlined"
            :to="{ name: 'component-preview', params: { componentKey: component.key } }"
          >
            {{ $t('app.openPlayground') }}
          </RouterLink>
        </template>
      </Card>
    </div>
    <Message severity="info" :closable="false">{{ $t('home.comingSoon') }}</Message>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import Card from 'primevue/card';
import Message from 'primevue/message';
import { RouterLink } from 'vue-router';
import { componentGroups } from '../data/components.js';

const flatComponents = computed(() => componentGroups.flatMap((group) => group.items));
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.intro h2 {
  margin-bottom: 0.5rem;
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.component-card {
  height: 100%;
}
</style>
