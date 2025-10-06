<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import type { PlaygroundComponent, PlaygroundPropValue } from '@/library/types'
import { findCatalogComponent } from '@/library/catalog'
import { loadPlaygroundDemo } from '@/library/demos'
import Controls from './controls/index.vue'
import NotFound from './notFound.vue'
import Preview from './preview.vue'

const props = defineProps<{
  componentId: string
}>()

const definition = shallowRef<PlaygroundComponent | null>(null)
const demoProps = ref<Record<string, PlaygroundPropValue>>({})
const entry = findCatalogComponent(props.componentId)

if (entry) {
  const demo = await loadPlaygroundDemo(props.componentId)

  if (demo) {
    definition.value = { ...entry, ...demo }
  }
}
</script>

<template>
  <div v-if="definition" class="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_22rem]">
    <Preview :definition="definition" :demo-props="demoProps" />
    <Controls :definition="definition" v-model:props="demoProps" />
  </div>
  <NotFound v-else />
</template>
