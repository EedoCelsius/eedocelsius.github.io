<script setup lang="ts">
import { computed, ref } from 'vue'
import type { LabComponentDefinition } from '@/library/catalog'
import { getComponentDefinition } from '@/library/catalog'
import Controls from './controls/index.vue'
import NotFound from './notFound.vue'
import Preview from './preview.vue'

const props = defineProps<{
  componentId: string
}>()

const definition = computed<LabComponentDefinition | undefined>(() => getComponentDefinition(props.componentId))

const resolvedComponentProps = ref<Record<string, unknown>>({})

const handleResolvedPropsUpdate = (nextResolvedProps: Record<string, unknown>) => {
  resolvedComponentProps.value = nextResolvedProps
}
</script>

<template>
  <div v-if="definition" class="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_22rem]">
    <Preview
      :definition="definition"
      :resolved-component-props="resolvedComponentProps"
    />
    <Controls
      :definition="definition"
      @update:resolved-props="handleResolvedPropsUpdate"
    />
  </div>
  <NotFound v-else />
</template>
