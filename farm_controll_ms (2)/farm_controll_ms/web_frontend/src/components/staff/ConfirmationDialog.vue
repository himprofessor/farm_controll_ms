<template>
  <div v-if="isVisible" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
      <h2 class="text-xl font-bold mb-4 text-gray-900">Confirm Action</h2>
      <p class="text-gray-700 mb-6">{{ message }}</p>
      <div class="flex justify-end space-x-3">
        <button @click="$emit('cancel')"
                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Cancel
        </button>
        <button @click="$emit('confirm')"
                class="px-4 py-2 bg-red-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isVisible: {
    type: Boolean,
    required: true
  },
  message: {
    type: String,
    default: 'Are you sure you want to proceed with this action?'
  }
})

defineEmits(['confirm', 'cancel'])
</script>