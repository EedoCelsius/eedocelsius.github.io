<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElCollapse, ElCollapseItem, ElSpace } from 'element-plus'
import type { ControlDefinition, GroupDefinition, LocaleCopy } from '@/library/types'
import type { SupportedLocale } from '@/i18n'

const props = defineProps<{
  section: { id: string; group?: GroupDefinition; controls: ControlDefinition[] }
}>()

const { locale } = useI18n()

const hasGroup = computed(() => Boolean(props.section.group))
const activeNames = ref<Array<string | number>>(hasGroup.value ? [] : [props.section.id])

watch(hasGroup, (value) => {
  activeNames.value = value ? [] : [props.section.id]
})

const localize = (copy: LocaleCopy) => copy[locale.value as SupportedLocale] ?? copy.en
</script>

<template>
  <div>
    <ElCollapse v-if="hasGroup && section.group" v-model="activeNames">
      <ElCollapseItem :title="localize(section.group.label)" :name="section.id">
        <ElSpace direction="vertical" fill>
          <slot />
        </ElSpace>
      </ElCollapseItem>
    </ElCollapse>
    <ElSpace v-else direction="vertical" fill>
      <slot />
    </ElSpace>
  </div>
</template>
