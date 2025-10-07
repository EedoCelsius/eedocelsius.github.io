<script lang="ts">
import { defaultProps as groupDefaults } from '@library/components/Group.vue'
import type { ComponentDemoConfig } from '@/demos/types'

export const demoConfig: ComponentDemoConfig = {
  defaultProps: groupDefaults,
  properties: [
    {
      key: 'as',
      type: 'text',
      label: { en: 'Element tag', ko: '요소 태그' },
      helperText: {
        en: 'Specify which HTML element should wrap the group.',
        ko: '그룹을 감싸는 HTML 요소를 지정합니다.',
      },
    },
  ],
}
</script>

<script setup lang="ts">
import { Group, type GroupProps } from '@library/components'

const props = defineProps<GroupProps>()
</script>

<template>
  <div class="flex justify-center">
    <Group
      v-bind="props"
      class="group-demo inline-flex divide-x divide-surface-200 rounded-2xl border border-surface-200 bg-surface-0 text-sm font-semibold text-surface-600 shadow-soft"
      role="group"
      aria-label="Payment frequency"
    >
      <button
        type="button"
        class="px-5 py-3 transition hover:bg-surface-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-200"
      >
        Monthly
      </button>
      <button
        type="button"
        class="bg-primary-600 px-5 py-3 text-white transition hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-200"
        aria-pressed="true"
      >
        Quarterly
      </button>
      <button
        type="button"
        class="px-5 py-3 transition hover:bg-surface-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-200"
      >
        Annually
      </button>
    </Group>
  </div>
</template>

