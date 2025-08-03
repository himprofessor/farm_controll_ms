
<template>
  <div v-if="isVisible" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
      <h2 class="text-xl font-bold mb-4 text-gray-900">{{ title || $t('confirmationDialog.title') }}</h2>
      <p class="text-gray-600 mb-6">{{ message }}</p>
      <div class="flex justify-end space-x-3">
        <button
          v-if="showCancel"
          @click="$emit('cancel')"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          {{ $t('confirmationDialog.cancel') }}
        </button>
        <button
          @click="$emit('confirm')"
          class="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
        >
          {{ $t('confirmationDialog.confirm') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { $t } = useI18n()

defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: null,
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
})

defineEmits(['confirm', 'cancel'])
</script>
