<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { ControlDefinition, LocaleCopy } from '@/library/catalog'
import type { SupportedLocale } from '@/i18n'

defineProps<{
  section: { id: string; group?: ControlDefinition['group']; controls: ControlDefinition[] }
  isCollapsed: boolean
  hasGroup: boolean
}>()

const emit = defineEmits<{
  (event: 'toggle'): void
}>()

const { locale } = useI18n()

const localize = (copy: LocaleCopy) => copy[locale.value as SupportedLocale] ?? copy.en

const handleToggle = () => {
  emit('toggle')
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
