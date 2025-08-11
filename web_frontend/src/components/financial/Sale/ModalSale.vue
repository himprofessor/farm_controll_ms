<template>
  <div v-if="show" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 ease-in-out">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800">{{ isEditing ? 'Edit Sale' : 'Add New Sale' }}</h2>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input 
              v-model="localSale.date"
              type="date" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
              required>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Product</label>
            <input 
              v-model="localSale.product"
              type="text" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
              required>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <input 
              v-model.number="localSale.quantity"
              type="number" 
              min="1"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
              required>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Unit Price ($)</label>
            <input 
              v-model.number="localSale.unitPrice"
              type="number" 
              min="0.01"
              step="0.01"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
              required>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            v-model="localSale.description"
            rows="3"
            placeholder="Enter description or notes about the sale"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 resize-none"
          ></textarea>
        </div>

        <div class="flex justify-start space-x-4">
          <button 
            type="button"
            @click="$emit('close')"
            class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700 transition duration-200">
            Cancel
          </button>
          <button 
            type="submit"
            class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200">
            {{ isEditing ? 'Update' : 'Save' }} Sale
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, toRefs } from 'vue'

const props = defineProps({
  show: Boolean,
  isEditing: Boolean,
  saleData: Object
})

const emit = defineEmits(['close', 'save'])

// Local copy to edit form without mutating prop directly
const localSale = reactive({
  date: '',
  product: '',
  quantity: 1,
  unitPrice: 0,
  description: ''
})

watch(() => props.saleData, (newVal) => {
  if (newVal) {
    Object.assign(localSale, newVal)
  }
}, { immediate: true })

function handleSubmit() {
  emit('save', { ...localSale })
}
</script>
