<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <div class="p-5 border-b border-gray-200 text-left">
      <h2 class="text-xl font-semibold text-gray-800">Individual Sales</h2>
      <span class="text-sm text-gray-500 block mt-1">
        Showing {{ salesData.length }} {{ salesData.length === 1 ? 'record' : 'records' }}
      </span>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 text-left">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th class="px-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th class="px-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th class="px-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
            <th class="px-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th class="px-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th class="px-6 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr 
            v-for="(sale, index) in salesData" 
            :key="sale.id || index" 
            class="hover:bg-gray-50 transition-colors duration-200"
          >
            <td class="px-6 py-2 whitespace-nowrap text-xs text-gray-500">{{ formatDateForDisplay(sale.date) }}</td>
            <td class="px-6 py-2 whitespace-nowrap text-xs font-medium text-gray-900">{{ sale.product }}</td>
            <td class="px-6 py-2 whitespace-nowrap text-xs text-gray-500">{{ sale.quantity }}</td>
            <td class="px-6 py-2 whitespace-nowrap text-xs text-gray-500">${{ sale.unitPrice }}</td>
            <td class="px-6 py-2 whitespace-nowrap text-xs text-gray-500">${{ (sale.quantity * sale.unitPrice).toFixed(2) }}</td>
            <td class="px-6 py-2 whitespace-nowrap text-xs text-gray-500">{{ sale.description || '-' }}</td>
            <td class="px-6 py-2 whitespace-nowrap text-xs font-medium text-right">
              <button 
                @click="$emit('confirm-delete', index)"
                class="text-red-600 hover:text-red-800 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                title="Delete"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7
                       m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  salesData: Array
})

const emit = defineEmits(['confirm-delete'])

function formatDateForDisplay(dateString) {
  if (!dateString) return ''
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>
