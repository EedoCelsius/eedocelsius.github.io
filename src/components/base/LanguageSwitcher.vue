<template>
  <select
    class="rounded-full border border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/70 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary-400 dark:focus:ring-primary-500"
    v-model="localeRef"
    :aria-label="$t('actions.changeLanguage')"
  >
    <option value="en">English</option>
    <option value="ko">한국어</option>
  </select>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const localeRef = computed({
  get: () => locale.value,
  set: value => {
    locale.value = value;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('component-lab-locale', value);
    }
  }
});
</script>
