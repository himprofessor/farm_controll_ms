<template>
  <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">{{ $t('inventory.title') }}</h1>
      <p class="text-gray-600 mt-1">{{ $t('inventory.subtitle') }}</p>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>