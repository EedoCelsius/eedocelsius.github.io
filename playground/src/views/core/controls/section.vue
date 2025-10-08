<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Panel from 'primevue/panel'
import type { ControlDefinition, GroupDefinition, LocaleCopy } from '@/library/types'
import type { SupportedLocale } from '@/i18n'

const props = defineProps<{
  section: { id: string; group?: GroupDefinition; controls: ControlDefinition[] }
}>()

const { locale } = useI18n()

const hasGroup = computed(() => Boolean(props.section.group))
const isCollapsed = ref(hasGroup.value)

watch(
  hasGroup,
  (value) => {
    if (!value) {
      isCollapsed.value = false
    }
  }
)

const localize = (copy: LocaleCopy) => copy[locale.value as SupportedLocale] ?? copy.en

</script>

<template>
  <div class="flex flex-col gap-4">
    <Panel
      v-if="hasGroup && section.group"
      toggleable
      v-model:collapsed="isCollapsed"
      :header="localize(section.group.label)"
    >
      <div class="flex flex-col gap-4">
        <slot />
      </div>
    </Panel>
    <div v-else class="flex flex-col gap-4">
      <slot />
    </div>
  </div>
</template>
