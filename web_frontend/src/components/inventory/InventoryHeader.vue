<template>
  <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">{{ $t('inventory.title') }}</h1>
      <p class="text-gray-600 mt-1">{{ $t('inventory.subtitle') }}</p>
    </div>
    <button
      @click="$emit('add-item')"
      class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-colors duration-200 flex items-center space-x-2 mt-4 md:mt-0"
    >
      <Plus class="w-5 h-5" />
      <span>{{ $t('inventory.addItem') }}</span>
    </button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { Plus } from 'lucide-vue-next'

const { t: $t } = useI18n()

defineEmits(['add-item'])
</script>