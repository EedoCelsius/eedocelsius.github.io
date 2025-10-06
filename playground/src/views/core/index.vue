<script setup lang="ts">
import { computed, ref } from 'vue'
import type { LabComponentDefinition } from '@/library/catalog'
import { getComponentDefinition } from '@/library/catalog'
import PlaygroundControls from './controls.vue'
import PlaygroundNotFound from './notFound.vue'
import PlaygroundPreview from './preview.vue'

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
  <PlaygroundNotFound v-if="!definition" />
  <div v-else class="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_22rem]">
    <PlaygroundPreview
      :definition="definition"
      :resolved-component-props="resolvedComponentProps"
    />
    <PlaygroundControls
      :definition="definition"
      @update:resolved-props="handleResolvedPropsUpdate"
    />
  </div>
</template>
