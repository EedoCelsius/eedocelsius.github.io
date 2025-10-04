<template>
  <button
    class="inline-flex items-center gap-2 rounded-full border border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/70 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:border-primary-300 dark:hover:border-primary-500 transition"
    @click="toggleTheme"
    :aria-label="$t('actions.toggleTheme')"
  >
    <i class="pi" :class="isDark ? 'pi-moon' : 'pi-sun'" aria-hidden="true"></i>
    <span>{{ isDark ? 'Dark' : 'Light' }}</span>
  </button>
</template>

<script setup>
import { useTheme } from '../../composables/useTheme';

const { isDark, toggleTheme } = useTheme();
</script>
