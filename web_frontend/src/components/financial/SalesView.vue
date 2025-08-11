<template>
  <div class="p-2 min-h-screen text-left">
    <CardSale 
      :totalSales="totalSales" 
      :totalQuantity="totalQuantity" 
      :averagePrice="averagePrice" 
    />

    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Sales Records</h1>
      <button 
        @click="openAddModal"
        class="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg flex items-center gap-2 shadow-md transition-all duration-200"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        Add Sale
      </button>
    </div>

    <TableSale
      :salesData="salesData" 
      :activeIndex="activeIndex" 
      @toggle-actions="toggleActions" 
      @edit-sale="editSale" 
      @confirm-delete="confirmDelete" 
    />

    <ModalSale 
      :show="showModal" 
      :isEditing="isEditing" 
      :saleData="currentSale" 
      @close="closeModal" 
      @save="isEditing ? updateSale : addNewSale" 
    />

    <!-- Delete Confirmation Modal same as before -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 ease-in-out">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800">Confirm Deletion</h2>
        <p class="mb-6 text-gray-600">Are you sure you want to delete this sale record? This action cannot be undone.</p>
        <div class="flex justify-end space-x-4">
          <button 
            @click="cancelDelete"
            class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700 transition duration-200">
            Cancel
          </button>
          <button 
            @click="deleteSale"
            class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import ModalSale from './Sale/ModalSale.vue'
import TableSale from './Sale/TableSale.vue'
import CardSale from './Sale/CardSale.vue'

const salesData = ref([
  { 
    product: 'Laptop', 
    quantity: 3, 
    unitPrice: 1200, 
    description: 'Client order',
    date: new Date().toISOString().split('T')[0]
  },
  { 
    product: 'Smartphone', 
    quantity: 5, 
    unitPrice: 600, 
    description: '',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0]
  },
  { 
    product: 'Tablet', 
    quantity: 2, 
    unitPrice: 400, 
    description: 'Discounted',
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0]
  },
])

const showModal = ref(false)
const isEditing = ref(false)
const currentSaleIndex = ref(null)
const currentSale = reactive({
  product: '',
  quantity: 1,
  unitPrice: 0,
  description: '',
  date: new Date().toISOString().split('T')[0]
})
const activeIndex = ref(null)
const showDeleteModal = ref(false)
const deleteIndex = ref(null)

const totalSales = computed(() => salesData.value.reduce((acc, sale) => acc + sale.quantity * sale.unitPrice, 0))
const totalQuantity = computed(() => salesData.value.reduce((acc, sale) => acc + sale.quantity, 0))
const averagePrice = computed(() => totalQuantity.value === 0 ? 0 : totalSales.value / totalQuantity.value)

function formatDateForDisplay(dateString) {
  if (!dateString) return ''
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

function openAddModal() {
  isEditing.value = false
  Object.assign(currentSale, {
    product: '',
    quantity: 1,
    unitPrice: 0,
    description: '',
    date: new Date().toISOString().split('T')[0]
  })
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function addNewSale(sale) {
  salesData.value.push(sale)
  closeModal()
}

function editSale(index) {
  const sale = salesData.value[index]
  Object.assign(currentSale, sale)
  currentSaleIndex.value = index
  isEditing.value = true
  showModal.value = true
  activeIndex.value = null
}

function updateSale(sale) {
  if (currentSaleIndex.value !== null) {
    salesData.value[currentSaleIndex.value] = sale
    closeModal()
  }
}

function toggleActions(index) {
  activeIndex.value = activeIndex.value === index ? null : index
}

function confirmDelete(index) {
  deleteIndex.value = index
  showDeleteModal.value = true
  activeIndex.value = null
}

function cancelDelete() {
  showDeleteModal.value = false
  deleteIndex.value = null
}

function deleteSale() {
  if (deleteIndex.value !== null) {
    salesData.value.splice(deleteIndex.value, 1)
    cancelDelete()
  }
}
</script>
