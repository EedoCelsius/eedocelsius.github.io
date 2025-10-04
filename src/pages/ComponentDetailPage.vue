<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { getComponentDefinition } from '@/component-registry'

const props = defineProps<{ slug: string }>()

const { t } = useI18n()
const router = useRouter()

const definition = computed(() => getComponentDefinition(props.slug))
const PlaygroundComponent = computed(() =>
  definition.value ? defineAsyncComponent(definition.value.playground) : null,
)
const PreviewComponent = computed(() =>
  definition.value ? defineAsyncComponent(definition.value.component) : null,
)
const tags = computed(() => {
  if (!definition.value) {
    return []
  }

  const translated = t(`${definition.value.i18nKey}.tags`, {
    returnObjects: true,
  }) as unknown
  return Array.isArray(translated) ? (translated as string[]) : definition.value.tags
})

onMounted(() => {
  if (!definition.value) {
    router.replace({ name: 'not-found' })
  }
})
</script>

<template>
  <section v-if="definition" class="component-detail">
    <Button class="mb-3" link icon="pi pi-arrow-left" @click="router.push({ name: 'components' })">
      {{ t('component.goBack') }}
    </Button>

    <header class="mb-4">
      <h1 class="text-4xl font-bold mb-2">{{ t(`${definition.i18nKey}.name`) }}</h1>
      <p class="text-lg text-color-secondary m-0">{{ t(`${definition.i18nKey}.description`) }}</p>
    </header>

    <div class="flex flex-wrap gap-2 mb-4">
      <Tag v-for="tag in tags" :key="tag" :value="tag" severity="secondary" />
    </div>

    <section class="preview-section mb-5">
      <h2 class="text-2xl font-semibold mb-3">{{ t('component.previewTitle') }}</h2>
      <div class="preview-frame surface-card border-round-lg shadow-1 p-4">
        <Suspense>
          <component :is="PreviewComponent" v-if="PreviewComponent" v-bind="definition.defaultProps" />
        </Suspense>
      </div>
    </section>

    <section class="playground-section">
      <h2 class="text-2xl font-semibold mb-3">{{ t('component.playgroundTitle') }}</h2>
      <Suspense>
        <component :is="PlaygroundComponent" v-if="PlaygroundComponent" :definition="definition" />
      </Suspense>
    </section>
  </section>
</template>

<style scoped>
.component-detail {
  display: flex;
  flex-direction: column;
}

.preview-frame {
  min-height: 360px;
}
</style>
