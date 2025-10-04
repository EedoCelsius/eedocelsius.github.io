<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ComponentPreviewCard from '@/components/common/ComponentPreviewCard.vue'
import { libraryComponents } from '@/component-registry'

const router = useRouter()
const { t } = useI18n()

const previewComponents = computed(() => libraryComponents)

const goToComponents = () => {
  router.push({ name: 'components' })
}
</script>

<template>
  <section class="home-page">
    <div class="hero surface-card border-round-3xl shadow-2 p-5 mb-5">
      <div class="grid align-items-center">
        <div class="col-12 md:col-7">
          <h1 class="text-4xl md:text-5xl font-bold line-height-3 mb-3">
            {{ t('home.heroTitle') }}
          </h1>
          <p class="text-lg text-color-secondary mb-4">{{ t('home.heroSubtitle') }}</p>
          <Button class="p-button-rounded" size="large" @click="goToComponents">
            {{ t('home.exploreButton') }}
          </Button>
        </div>
        <div class="col-12 md:col-5 text-center">
          <img
            src="https://illustrations.popsy.co/gray/web-design.svg"
            alt="Design illustration"
            class="hero-illustration"
          />
        </div>
      </div>
    </div>

    <section>
      <div class="section-header mb-3">
        <h2 class="m-0">{{ t('home.previewSectionTitle') }}</h2>
        <p class="m-0 text-color-secondary">{{ t('home.previewSectionSubtitle') }}</p>
      </div>
      <div class="grid">
        <div v-for="definition in previewComponents" :key="definition.slug" class="col-12 md:col-6">
          <ComponentPreviewCard :definition="definition" />
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.hero {
  background: radial-gradient(circle at top left, color-mix(in srgb, var(--primary-color) 12%, transparent) 0%,
      transparent 60%),
    var(--surface-card);
}

.hero-illustration {
  max-width: min(320px, 100%);
}

.section-header {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

@media screen and (max-width: 768px) {
  .home-page {
    gap: 2.5rem;
  }

  .hero {
    padding: 2.5rem 1.75rem;
  }
}
</style>
