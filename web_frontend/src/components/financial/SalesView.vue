<template>
  <div class="p-2 min-h-screen text-left">
    <CardSale 
      :totalSales="salesStore.totalSales" 
      :totalQuantity="salesStore.totalQuantity" 
      :averagePrice="salesStore.averagePrice" 
    />

    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Sales Records</h1>
      <button 
        @click="salesStore.openAddModal"
        class="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg flex items-center gap-2 shadow-md transition-all duration-200"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        Add Sale
      </button>
    </div>

    <TableSale
      :salesData="salesStore.salesData"
      :activeIndex="salesStore.activeIndex"
      @toggle-actions="salesStore.toggleActions"
      @edit-sale="salesStore.editSale"
      @confirm-delete="salesStore.confirmDelete"
    />

    <ModalSale 
      :show="salesStore.showModal" 
      :saleData="salesStore.currentSale"
      @close="salesStore.closeModal"
      @save="salesStore.addNewSale"
    />

    <div v-if="salesStore.showDeleteModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 ease-in-out">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800">Confirm Deletion</h2>
        <p class="mb-6 text-gray-600">Are you sure you want to delete this sale record? This action cannot be undone.</p>
        <div class="flex justify-end space-x-4">
          <button 
            @click="salesStore.cancelDelete"
            class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700 transition duration-200">
            Cancel
          </button>
          <button 
            @click="salesStore.deleteSale"
            class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { useSalesStore } from '@/stores/sale'
import ModalSale from './Sale/ModalSale.vue'
import TableSale from './Sale/TableSale.vue'
import CardSale from './Sale/CardSale.vue'

const salesStore = useSalesStore()

const formatDateForDisplay = (dateString) => {
  if (!dateString) return ''
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

onMounted(() => {
  salesStore.fetchSales()
})
</script>