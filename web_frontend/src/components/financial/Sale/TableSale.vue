<template>
  <div class="bg-white rounded-lg shadow-lg shadow-gray-250 overflow-hidden"> 
    <div class="overflow-x-auto ">
      <table class="min-w-full divide-y divide-gray-200 text-left">
        <thead class="bg-green-600">
          <tr>
            <th class="px-6 py-2 text-xs font-medium text-white uppercase tracking-wider">Date</th>
            <th class="px-6 py-2 text-xs font-medium text-white uppercase tracking-wider">Product</th>
            <th class="px-6 py-2 text-xs font-medium text-white uppercase tracking-wider">Quantity</th>
            <th class="px-6 py-2 text-xs font-medium text-white uppercase tracking-wider">Unit Price</th>
            <th class="px-6 py-2 text-xs font-medium text-white uppercase tracking-wider">Total</th>
            <th class="px-6 py-2 text-xs font-medium text-white uppercase tracking-wider">Description</th>
            <th class="px-6 py-2 text-right text-xs font-medium text-white uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(sale, index) in salesData" :key="index" class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-6 py-2 whitespace-nowrap text-xs text-gray-500">{{ formatDateForDisplay(sale.date) }}</td>
            <td class="px-6 py-2 whitespace-nowrap text-xs font-medium text-gray-900">{{ sale.product }}</td>
            <td class="px-6 py-2 whitespace-nowrap text-xs text-gray-500">{{ sale.quantity }}</td>
            <td class="px-6 py-2 whitespace-nowrap text-xs text-gray-500">${{ sale.unitPrice.toFixed(2) }}</td>
            <td class="px-6 py-2 whitespace-nowrap text-xs text-gray-500">${{ (sale.quantity * sale.unitPrice).toFixed(2) }}</td>
            <td class="px-6 py-2 whitespace-nowrap text-xs text-gray-500">{{ sale.description || '-' }}</td>
            <td class="px-6 py-2 whitespace-nowrap text-xs font-medium text-right">
              <div class="relative">
                <button 
                  @click="$emit('toggle-actions', index)"
                  class="text-gray-600 hover:text-gray-800 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                  title="Show Actions"
                >
                  <svg class="w-5 h-5" fill="#4B5563" viewBox="0 0 24 24">
                    <circle cx="12" cy="5" r="2"/>
                    <circle cx="12" cy="12" r="2"/>
                    <circle cx="12" cy="19" r="2"/>
                  </svg>
                </button>
                <div v-if="activeIndex === index" class="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <button 
                    @click="$emit('edit-sale', index)"
                    class="w-full text-left px-4 py-1 text-blue-600 hover:bg-blue-50 flex items-center gap-2 rounded-t-md transition-colors duration-200"
                  >
                    <!-- edit icon -->
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Edit
                  </button>
                  <button 
                    @click="$emit('confirm-delete', index)"
                    class="w-full text-left px-4 py-1 text-red-600 hover:bg-red-50 flex items-center gap-2 rounded-b-md transition-colors duration-200"
                  >
                    <!-- delete icon -->
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  salesData: Array,
  activeIndex: [Number, null]
})

const emit = defineEmits(['toggle-actions', 'edit-sale', 'confirm-delete'])

function formatDateForDisplay(dateString) {
  if (!dateString) return ''
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>
