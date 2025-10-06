<script setup lang="ts">
import { computed, ref } from 'vue'
import type { LabComponentDefinition, PlaygroundPropValue } from '@/library/catalog'
import { getComponentDefinition } from '@/library/catalog'
import Controls from './controls/index.vue'
import NotFound from './notFound.vue'
import Preview from './preview.vue'

const props = defineProps<{
  componentId: string
}>()

const definition = computed<LabComponentDefinition | undefined>(() => getComponentDefinition(props.componentId))

const componentProps = ref<Record<string, PlaygroundPropValue>>({})
</script>

<template>
  <div v-if="definition" class="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_22rem]">
    <Preview
      :definition="definition"
      :component-props="componentProps"
    />
    <Controls
      :definition="definition"
      v-model:props="componentProps"
    />
  </div>
  <NotFound v-else />
</template>
