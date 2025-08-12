<template>
  <!-- Materials Inventory -->
  <div class="bg-white rounded-lg shadow p-4 mb-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-gray-800">Materials Inventory</h2>
      <button @click="openAdd" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow flex items-center space-x-1">
        <Plus class="w-4 h-4" /><span>Add Material</span>
      </button>
    </div>

    <!-- Add/Edit Material Modal -->
    <AddItemView
      v-if="showModal"
      :item="selectedMaterial"
      :categories="categories"
      @close="closeModal"
      @material-added="handleMaterialAdded"
      @material-updated="handleMaterialUpdated"
    />

    <!-- Confirm Delete Modal -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-4 w-80">
        <h3 class="text-lg font-bold text-gray-800 mb-2">Confirm Action</h3>
        <p class="text-gray-600 mb-2">Are you sure you want to delete {{ selectedMaterialToDelete.name }}?</p>
        <div class="flex justify-end space-x-2">
          <button @click="cancelDelete" class="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-800">Cancel</button>
          <button @click="confirmDelete" class="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded">Confirm</button>
        </div>
      </div>
    </div>

    <!-- Materials Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Min</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
            <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="material in items" :key="material.id" class="hover:bg-gray-50">
            <td class="px-4 py-2 text-sm font-medium text-gray-900">{{ material.name }}</td>
            <td class="px-4 py-2 text-sm text-gray-500">{{ material.category }}</td>
            <td class="px-4 py-2 text-sm text-gray-500">{{ material.currentStock }}</td>
            <td class="px-4 py-2 text-sm text-gray-500">{{ material.minStock }}</td>
            <td class="px-4 py-2 text-sm">
              <span :class="getStatusClass(material.status)">{{ material.status }}</span>
            </td>
            <td class="px-4 py-2 text-sm text-gray-500">{{ material.value }}</td>
            <td class="px-4 py-2 text-sm text-gray-500">{{ material.supplier }}</td>
            <td class="px-4 py-2 text-sm text-right relative">
              <button @click="showMenuId = showMenuId === material.id ? null : material.id" class="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500" :aria-expanded="showMenuId === material.id">
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="6" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="18" r="2" />
                </svg>
              </button>
              <div v-if="showMenuId === material.id" class="absolute right-0 mt-1 w-40 bg-white shadow-lg rounded-lg ring-1 ring-gray-100 z-50">
                <button @click="openEdit(material)" class="w-full text-left px-2 py-1 text-sm text-gray-800 hover:bg-blue-50 flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>Edit
                </button>
                <div class="border-t border-gray-200"></div>
                <button @click="showDeleteConfirm = true; selectedMaterialToDelete = material" class="w-full text-left px-2 py-1 text-sm text-red-500 hover:bg-red-50 flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0h4m-7 4v12m10-12v12" />
                  </svg>Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="items.length === 0" class="text-center py-4 text-gray-500">No items found.</div>
    </div>
  </div>

  <!-- Borrow Inventory -->
  <div class="bg-white rounded-lg shadow p-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-gray-800">Borrow Inventory</h2>
      <button @click="toggleBorrowForm" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow flex items-center space-x-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
        </svg>
        <span>Borrow</span>
      </button>
    </div>

    <!-- Feedback Messages -->
    <div v-if="successMessage" class="mb-4 text-green-600 text-sm">{{ successMessage }}</div>
    <div v-if="errorMessage" class="mb-4 text-red-600 text-sm">{{ errorMessage }}</div>
    <div v-if="isLoading" class="mb-4 text-gray-600 text-sm">Loading...</div>

    <!-- Borrow Form -->
    <BorrowForm v-if="showBorrowForm" @close="closeBorrowForm" @submitted="handleBorrowSubmitted" />

    <!-- Borrow Report Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Purpose</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Borrowed Date</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Returned Date</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Material ID</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Staff ID</th>
            <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="report in borrowReports" :key="report.id" class="hover:bg-gray-50">
            <td class="px-4 py-2 text-sm font-medium text-gray-900">{{ report.quantity }}</td>
            <td class="px-4 py-2 text-sm text-gray-500">{{ report.purpose }}</td>
            <td class="px-4 py-2 text-sm text-gray-500">{{ report.borrowed_date }}</td>
            <td class="px-4 py-2 text-sm text-gray-500">{{ report.returned_date || 'Not Returned' }}</td>
            <td class="px-4 py-2 text-sm text-gray-500">{{ report.material_id }}</td>
            <td class="px-4 py-2 text-sm text-gray-500">{{ report.staff_id }}</td>
            <td class="px-4 py-2 text-sm text-right relative">
              <button @click="showMenuId = showMenuId === report.id ? null : report.id" class="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500" :aria-expanded="showMenuId === report.id">
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="6" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="18" r="2" />
                </svg>
              </button>
              <div v-if="showMenuId === report.id" class="absolute right-0 mt-1 w-40 bg-white shadow-lg rounded-lg ring-1 ring-gray-100 z-50">
                <button @click="returnBorrow(report)" class="w-full text-left px-2 py-1 text-sm text-gray-800 hover:bg-blue-50 flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                  </svg>Return
                </button>
                <div class="border-t border-gray-200"></div>
                <button @click="showDeleteConfirm = true; selectedMaterialToDelete = report" class="w-full text-left px-2 py-1 text-sm text-red-500 hover:bg-red-50 flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0h4m-7 4v12m10-12v12" />
                  </svg>Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="borrowReports.length === 0" class="text-center py-4 text-gray-500">No borrow records found.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AddItemView from './AddItemView.vue'
import BorrowForm from './InventoryBorrowing.vue'
import { Plus } from 'lucide-vue-next'
import API from '@/plugin/axios'

const props = defineProps({ items: Array })
const emit = defineEmits(['delete-item', 'edit-item', 'item-added'])

const showModal = ref(false)
const selectedMaterial = ref(null)
const showMenuId = ref(null)
const showBorrowForm = ref(false)
const categories = ['Seeds', 'Fertilizer', 'Tools', 'Feed', 'Medicine']
const showDeleteConfirm = ref(false)
const selectedMaterialToDelete = ref(null)
const borrowReports = ref([])
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const openAdd = () => { selectedMaterial.value = null; showModal.value = true }
const openEdit = (item) => { selectedMaterial.value = { ...item }; showModal.value = true }
const closeModal = () => { showModal.value = false; selectedMaterial.value = null }
const handleMaterialAdded = (material) => { emit('item-added', material); closeModal() }
const handleMaterialUpdated = (updated) => { emit('edit-item', updated); closeModal() }
const toggleBorrowForm = () => { showBorrowForm.value = !showBorrowForm.value }
const closeBorrowForm = () => { showBorrowForm.value = false }

const fetchBorrowReports = async () => {
  isLoading.value = true
  try {
    const response = await API.get('/borrowings')
    borrowReports.value = response.data
    errorMessage.value = ''
  } catch (error) {
    console.error('Failed to fetch borrow reports:', error)
    errorMessage.value = 'Failed to load borrow records. Please try again.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchBorrowReports()
})

const handleBorrowSubmitted = async (data) => {
  isLoading.value = true
  try {
    await API.post('/borrowings', data)
    await fetchBorrowReports()
    showBorrowForm.value = false
    successMessage.value = 'Borrow record added successfully!'
    setTimeout(() => { successMessage.value = '' }, 3000)
  } catch (error) {
    console.error('Borrow submission error:', error)
    errorMessage.value = error.response?.data?.message || 'Failed to add borrow record. Please check the input data.'
  } finally {
    isLoading.value = false
  }
}

const cancelDelete = () => { showDeleteConfirm.value = false; selectedMaterialToDelete.value = null }
const confirmDelete = async () => {
  if (selectedMaterialToDelete.value?.id) {
    try {
      await API.delete(`/borrowings/${selectedMaterialToDelete.value.id}`)
      await fetchBorrowReports()
      emit('delete-item', selectedMaterialToDelete.value.id)
      successMessage.value = 'Borrow record deleted successfully!'
      setTimeout(() => { successMessage.value = '' }, 3000)
    } catch (error) {
      console.error('Delete error:', error)
      errorMessage.value = 'Failed to delete borrow record. Please try again.'
    } finally {
      showDeleteConfirm.value = false
      selectedMaterialToDelete.value = null
    }
  }
}

const returnBorrow = async (report) => {
  if (report.id) {
    try {
      await API.put(`/borrowings/${report.id}`, { returned_date: new Date().toISOString().split('T')[0] })
      await fetchBorrowReports()
      successMessage.value = 'Borrow record marked as returned!'
      setTimeout(() => { successMessage.value = '' }, 3000)
    } catch (error) {
      console.error('Return error:', error)
      errorMessage.value = 'Failed to mark borrow as returned. Please try again.'
    }
  }
}

const getStatusClass = (status) => ({
  'ok': 'inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800',
  'low': 'inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800',
  'critical': 'inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800',
})[status] || 'inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'
</script>