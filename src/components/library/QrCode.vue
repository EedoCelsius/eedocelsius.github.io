<script setup lang="ts">
import { computed } from 'vue'
import QrcodeVue from 'qrcode.vue'

const props = withDefaults(
  defineProps<{
    content: string
    lightColor?: string
    darkColor?: string
    icon?: string
  }>(),
  {
    lightColor: 'var(--p-surface-0)',
    darkColor: 'var(--p-surface-900)',
    icon: '',
  }
)

const hasIcon = computed(() => Boolean(props.icon?.trim()))
</script>

<template>
  <section class="flex flex-col items-center text-center">
    <div class="relative rounded-3xl border border-surface-200 bg-surface-0 p-4 shadow-sm dark:border-surface-700 dark:bg-surface-900">
      <QrcodeVue
        :value="props.content"
        :size="220"
        :foreground="props.darkColor"
        :background="props.lightColor"
        level="H"
        class="block"
      />
      <div
        v-if="hasIcon"
        class="absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <span
          class="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-surface-0/80 bg-surface-0/90 shadow-lg backdrop-blur dark:border-surface-900/70 dark:bg-surface-900/80"
        >
          <img :src="props.icon" alt="" class="h-10 w-10 object-contain" />
        </span>
      </div>
    </div>
  </section>
</template>
