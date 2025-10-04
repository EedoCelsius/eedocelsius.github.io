<template>
  <Dropdown
    v-model="selectedLocale"
    :options="options"
    option-label="label"
    option-value="value"
    class="language-switcher"
    :aria-label="t('app.language')"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Dropdown from 'primevue/dropdown';
import { useI18n } from 'vue-i18n';
import { availableLocales, setLocale, type LocaleKey } from '@/locales';

const { locale, t } = useI18n();

const options = availableLocales;

const selectedLocale = computed<LocaleKey>({
  get: () => locale.value as LocaleKey,
  set: (value) => {
    if (value) {
      setLocale(value);
    }
  },
});
</script>

<style scoped>
.language-switcher {
  min-width: 9rem;
}
</style>
