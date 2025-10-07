<script lang="ts">
import { defaultProps as groupDefaults } from '@library/components/Group.vue'
import type { ComponentDemoConfig } from '@/demos/types'

export const demoConfig: ComponentDemoConfig = {
  defaultProps: groupDefaults,
  properties: [],
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import Button from 'primevue/button'
import { Group, type GroupProps } from '@library/components'

type Option = {
  label: string
  value: string
}

const props = defineProps<GroupProps>()

const airports: Option[] = [
  { label: '서울 (ICN)', value: 'ICN' },
  { label: '부산 (PUS)', value: 'PUS' },
  { label: '제주 (CJU)', value: 'CJU' },
  { label: '도쿄 (HND)', value: 'HND' },
]

const travelClasses: Option[] = [
  { label: '일반석', value: 'economy' },
  { label: '프리미엄 일반석', value: 'premium' },
  { label: '비즈니스석', value: 'business' },
]

const origin = ref(airports[0]?.value ?? '')
const destination = ref(airports[2]?.value ?? airports[0]?.value ?? '')
const travelClass = ref(travelClasses[0]?.value ?? '')
const departureDate = ref(new Date())

const dropdownPT = {
  root: { class: 'flex-1 min-w-[12rem] min-h-[3.25rem]' },
}

const calendarPT = {
  root: { class: 'flex-1 min-w-[12rem] min-h-[3.25rem]' },
}
</script>

<template>
  <div class="flex justify-center">
    <Group
      v-bind="props"
      class="group-demo inline-flex w-full max-w-4xl divide-x text-sm shadow-soft"
      role="group"
      aria-label="항공권 검색 필터"
    >
      <Dropdown
        v-model="origin"
        :options="airports"
        option-label="label"
        option-value="value"
        placeholder="출발지"
        :pt="dropdownPT"
      />
      <Dropdown
        v-model="destination"
        :options="airports"
        option-label="label"
        option-value="value"
        placeholder="도착지"
        :pt="dropdownPT"
      />
      <Calendar
        v-model="departureDate"
        show-icon
        icon-display="input"
        date-format="yy.mm.dd"
        update-model-type="date"
        :pt="calendarPT"
      />
      <Dropdown
        v-model="travelClass"
        :options="travelClasses"
        option-label="label"
        option-value="value"
        placeholder="좌석 등급"
        :pt="dropdownPT"
      />
      <Button
        type="button"
        icon="pi pi-search"
        label="검색"
        class="flex items-center gap-2 px-6 text-sm font-semibold !rounded-none"
      />
    </Group>
  </div>
</template>
