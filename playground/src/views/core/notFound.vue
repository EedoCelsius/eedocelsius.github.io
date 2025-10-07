<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElButton, ElResult } from 'element-plus'

const { t } = useI18n()
</script>

<template>
  <ElResult
    icon="info"
    :title="t('playground.notFoundTitle')"
    :sub-title="t('playground.notFoundDescription')"
  >
    <template #extra>
      <RouterLink to="/">
        <ElButton type="primary">{{ t('playground.backHome') }}</ElButton>
      </RouterLink>
    </template>
  </ElResult>
</template>
