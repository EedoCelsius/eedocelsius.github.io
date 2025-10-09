<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Accordion from 'primevue/accordion'
import AccordionContent from 'primevue/accordioncontent'
import AccordionHeader from 'primevue/accordionheader'
import AccordionPanel from 'primevue/accordionpanel'
import type { ControlDefinition, GroupDefinition, LocaleCopy } from '@/library/types'
import type { SupportedLocale } from '@/i18n'

const props = defineProps<{
  section: { id: string; group?: GroupDefinition; controls: ControlDefinition[] }
}>()

const { locale } = useI18n()

const hasGroup = computed(() => Boolean(props.section.group))

const localize = (copy: LocaleCopy) => copy[locale.value as SupportedLocale] ?? copy.en
</script>

<template>
  <div v-if="hasGroup && section.group" class="flex flex-col gap-4">
    <Accordion>
      <AccordionPanel :value="section.id">
        <AccordionHeader>
          {{ localize(section.group.label) }}
        </AccordionHeader>
        <AccordionContent>
          <div class="flex flex-col gap-4">
            <slot />
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
  <div v-else class="flex flex-col gap-4">
    <slot />
  </div>
</template>
