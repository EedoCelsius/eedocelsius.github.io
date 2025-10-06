<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
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
    <button
      v-if="hasGroup && section.group"
      type="button"
      class="flex items-center justify-between text-left text-xs font-semibold uppercase tracking-[0.35em] text-surface-500 transition hover:text-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 dark:text-surface-400"
      :aria-expanded="isCollapsed ? 'false' : 'true'"
      @click="handleToggle"
    >
      <span>{{ localize(section.group.label) }}</span>
      <i class="pi text-sm" :class="isCollapsed ? 'pi-angle-down' : 'pi-angle-up'" aria-hidden="true"></i>
    </button>
    <div v-show="!hasGroup || !isCollapsed" class="flex flex-col gap-4">
      <slot />
    </div>
  </div>
</template>
