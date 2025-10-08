<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
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

const handleToggle = () => {
  if (!hasGroup.value) {
    return
  }

  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <Button
      v-if="hasGroup && section.group"
      type="button"
      :label="localize(section.group.label)"
      :icon="isCollapsed ? 'pi pi-angle-down' : 'pi pi-angle-up'"
      icon-pos="right"
      text
      class="justify-between"
      :aria-expanded="isCollapsed ? 'false' : 'true'"
      @click="handleToggle"
    />
    <div v-show="!hasGroup || !isCollapsed" class="flex flex-col gap-4">
      <slot />
    </div>
  </div>
</template>
