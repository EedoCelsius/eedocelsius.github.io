<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { defineAsyncComponent } from 'vue'
import type { LibraryComponentDefinition } from '@/component-registry/types'

const props = defineProps<{ definition: LibraryComponentDefinition }>()

const { t } = useI18n()

const ComponentPreview = computed(() => defineAsyncComponent(props.definition.component))
const tags = computed(() => {
  const translated = t(`${props.definition.i18nKey}.tags`, {
    returnObjects: true,
  }) as unknown
  return Array.isArray(translated) ? (translated as string[]) : props.definition.tags
})
</script>

<template>
  <Card class="component-preview-card">
    <template #title>
      <div class="flex align-items-center justify-content-between">
        <div>
          <h3 class="m-0">{{ t(`${definition.i18nKey}.name`) }}</h3>
          <p class="m-0 text-color-secondary text-sm">
            {{ t(`${definition.i18nKey}.shortDescription`) }}
          </p>
        </div>
      </div>
    </template>
    <template #content>
      <div class="flex flex-wrap gap-2 mb-3">
        <Tag v-for="tag in tags" :key="tag" :value="tag" severity="secondary" />
      </div>
      <div class="preview-container surface-section border-round-lg">
        <Suspense>
          <component :is="ComponentPreview" v-bind="definition.defaultProps" />
        </Suspense>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.component-preview-card {
  height: 100%;
}

.preview-container {
  width: 100%;
  min-height: 320px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
