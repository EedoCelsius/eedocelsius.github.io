<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { ComponentDemo } from '@/demos/types'
import { getComponentDemo } from '@/demos'
import type { LabComponentSummary } from '@/library/catalog'
import { getComponentSummary } from '@/library/catalog'
import type { PlaygroundPropValue } from '@/library/types'
import Controls from './controls/index.vue'
import NotFound from './notFound.vue'
import Preview from './preview.vue'

const props = defineProps<{
  componentId: string
}>()

const summary = computed<LabComponentSummary | undefined>(() => getComponentSummary(props.componentId))
const demo = computed<ComponentDemo | undefined>(() => getComponentDemo(props.componentId))

const demoProps = ref<Record<string, PlaygroundPropValue>>({})

watch(
  () => props.componentId,
  () => {
    demoProps.value = {}
  }
)
</script>

<template>
  <div v-if="summary && demo" class="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_22rem]">
    <Preview
      :key="summary.id"
      :summary="summary"
      :demo="demo"
      :demo-props="demoProps"
    />
    <Controls
      :key="summary.id"
      :demo="demo"
      v-model:props="demoProps"
    />
  </div>
  <NotFound v-else />
</template>
