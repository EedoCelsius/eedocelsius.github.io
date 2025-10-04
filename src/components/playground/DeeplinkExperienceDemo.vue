<template>
  <div class="deeplink-demo">
    <DeeplinkExperience
      ref="deeplinkRef"
      :app-name="appName"
      :deeplink-url="deeplinkUrl"
      :icon="icon"
      :timeout="timeout"
    />

    <div class="demo-actions">
      <Button icon="pi pi-external-link" :label="launchLabel" @click="trigger" />
      <Button
        icon="pi pi-refresh"
        :label="resetLabel"
        severity="secondary"
        outlined
        @click="reset"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Button from 'primevue/button';
import DeeplinkExperience from '../deeplink/DeeplinkExperience.vue';

interface Props {
  appName: string;
  deeplinkUrl: string;
  icon?: string;
  timeout: number;
}

const props = defineProps<Props>();
const { t } = useI18n();

const deeplinkRef = ref<InstanceType<typeof DeeplinkExperience> | null>(null);
const emit = defineEmits(['reset']);

const launchLabel = computed(() => t('controls.launch'));
const resetLabel = computed(() => t('controls.reset'));

const trigger = () => {
  deeplinkRef.value?.trigger();
};

const reset = () => {
  emit('reset');
};

const appName = computed(() => props.appName);
const deeplinkUrl = computed(() => props.deeplinkUrl);
const icon = computed(() => props.icon);
const timeout = computed(() => props.timeout);
</script>

<style scoped>
.deeplink-demo {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.demo-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
