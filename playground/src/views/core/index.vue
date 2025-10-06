<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue'
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
const componentKey = computed(() => props.componentId)

const entry = findCatalogComponent(componentKey.value)

if (entry) {
  const demo = await loadPlaygroundDemo(componentKey.value)

  if (demo) {
    definition.value = { ...entry, ...demo }
  }
}
</script>

<template>
  <div
    v-if="definition"
    :key="componentKey"
    class="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_22rem]"
  >
    <Preview
      :key="definition.id"
      :definition="definition"
      :demo-props="demoProps"
    />
    <Controls
      :key="definition.id"
      :definition="definition"
      v-model:props="demoProps"
    />
  </div>
  <NotFound v-else />
</template>
