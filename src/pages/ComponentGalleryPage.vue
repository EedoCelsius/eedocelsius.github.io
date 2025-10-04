<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ComponentPreviewCard from '@/components/common/ComponentPreviewCard.vue'
import { libraryComponents } from '@/component-registry'

const { t } = useI18n()

const components = computed(() => libraryComponents)
</script>

<template>
  <section class="component-gallery">
    <header class="mb-4">
      <h1 class="text-3xl font-bold mb-2">{{ t('componentsPage.title') }}</h1>
      <p class="text-lg text-color-secondary m-0">{{ t('componentsPage.subtitle') }}</p>
    </header>

    <div class="grid">
      <div v-for="definition in components" :key="definition.slug" class="col-12">
        <ComponentPreviewCard :definition="definition" />
        <div class="flex justify-content-end mt-3">
          <RouterLink :to="{ name: 'component-detail', params: { slug: definition.slug } }">
            <Button icon="pi pi-arrow-right" icon-pos="right" link>
              {{ t('component.playgroundTitle') }}
            </Button>
          </RouterLink>
        </div>
        <Divider />
      </div>
    </div>
  </section>
</template>

<style scoped>
.component-gallery {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
