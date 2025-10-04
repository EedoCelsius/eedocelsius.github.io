<template>
  <Button
    class="theme-toggle"
    :icon="isDark ? 'pi pi-moon' : 'pi pi-sun'"
    :label="t('app.themeToggle')"
    text
    rounded
    @click="toggleTheme"
  />
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n';
import { useTheme } from '@/composables/useTheme';

const { t } = useI18n();
const { isDark, toggleTheme } = useTheme();
</script>

<style scoped>
.theme-toggle {
  color: var(--surface-700);
}

html.dark-mode .theme-toggle {
  color: var(--surface-100);
}
</style>
