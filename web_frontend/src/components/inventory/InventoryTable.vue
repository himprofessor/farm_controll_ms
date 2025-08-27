<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-gray-800">Materials Inventory</h2>
      <button @click="openAdd"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow flex items-center space-x-1">
        <Plus class="w-4 h-4" /><span>Add Material</span>
      </button>
    </div>

    <AddItemView v-if="showModal" :item="selectedMaterial" :categories="categories" @close="closeModal"
      @material-added="handleMaterialAdded" @material-updated="handleMaterialUpdated" />

    <BorrowForm v-if="showBorrowForm" :material="selectedMaterial" @close="closeBorrowForm" @submitted="handleBorrowSubmitted" />

    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-4 w-80">
        <h3 class="text-lg font-bold text-gray-800 mb-2">Confirm Action</h3>
        <p class="text-gray-600 mb-2">
          Are you sure you want to delete {{ deleteType === 'material' ? selectedMaterialToDelete.name : `${selectedMaterialToDelete.quantity} of ${selectedMaterialToDelete.material.name} borrowed by ${selectedMaterialToDelete.staff.name}` }}?
        </p>
        <div class="flex justify-end space-x-2">
          <button @click="cancelDelete" class="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-800">
            Cancel
          </button>
          <button @click="confirmDelete" class="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded">
            Confirm
          </button>
        </div>
      </div>
    </div>

    <!-- Materials Table -->
    <div class="overflow-x-auto rounded-lg border border-gray-200">
      <table class="min-w-full text-sm">
        <thead class="bg-green-600">
          <tr>
            <th class="px-6 py-3 text-left font-semibold text-white uppercase tracking-wider">Item Name</th>
            <th class="px-6 py-3 text-left font-semibold text-white uppercase tracking-wider">Category</th>
            <th class="px-6 py-3 text-left font-semibold text-white uppercase tracking-wider">Current Stock</th>
            <th class="px-6 py-3 text-left font-semibold text-white uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left font-semibold text-white uppercase tracking-wider">Value</th>
            <th class="px-6 py-3 text-left font-semibold text-white uppercase tracking-wider">Supplier</th>
            <th class="px-6 py-3 text-center font-semibold text-white uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 bg-white">
          <tr v-for="material in visibleItems" :key="material.id" class="hover:bg-gray-50 transition">
            <td class="px-6 py-4">
              <div class="font-medium text-gray-900">{{ material.name }}</div>
              <div class="text-xs text-gray-500">Expires: {{ material.expires || 'N/A' }}</div>
            </td>
            <td class="px-6 py-4">
              <span class="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                {{ material.category }}
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="text-gray-900">{{ material.currentStock }} {{ material.unit }}</div>
              <div class="text-xs text-gray-500">Min: {{ material.minStock }} {{ material.unit }}</div>
            </td>
            <td class="px-6 py-4">
              <span :class="getStatusClass(material.status)">{{ material.status }}</span>
            </td>
            <td class="px-6 py-4">
              <div class="text-gray-900 font-medium">$ {{ material.value }}</div>
              <div class="text-xs text-gray-500">@{{ material.pricePerUnit }} $</div>
            </td>
            <td class="px-6 py-4">
              <div class="text-gray-900">{{ material.supplier }}</div>
              <div class="text-xs text-gray-500">Last: {{ material.lastUpdated }}</div>
            </td>
            <td class="px-6 py-4 text-center relative">
              <button @click="showMenuId = showMenuId === material.id ? null : material.id"
                class="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500"
                :aria-expanded="showMenuId === material.id">
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <circle cx="12" cy="6" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="18" r="2" />
                </svg>
              </button>
              <div v-if="showMenuId === material.id"
                class="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg ring-1 ring-gray-100 z-50">
                <button @click="openBorrow(material)"
                  class="w-full text-left px-2 py-1 text-sm text-gray-800 hover:bg-blue-50 flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                  </svg>Borrow
                </button>
                <button @click="openEdit(material)"
                  class="w-full text-left px-2 py-1 text-sm text-gray-800 hover:bg-blue-50 flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>Edit
                </button>
                <div class="border-t border-gray-200"></div>
                <button @click="showDeleteConfirm = true; selectedMaterialToDelete = material; deleteType = 'material'"
                  class="w-full text-left px-2 py-1 text-sm text-red-500 hover:bg-red-50 flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0h4m-7 4v12m10-12v12" />
                  </svg>Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- No items -->
      <div v-if="items.length === 0" class="text-center py-6 text-gray-500 italic">
        No items found.
      </div>
      <div v-if="items.length > 3" class="text-center mt-2">
        <button @click="toggleShowAllItems" class="text-blue-600 hover:underline" :class="{ 'hidden': showAllItems }">
          More
        </button>
        <button @click="toggleShowAllItems" class="text-blue-600 hover:underline" :class="{ 'hidden': !showAllItems }">
          Less
        </button>
      </div>
    </div>

    <!-- Borrow Inventory -->
    <div class="mt-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-gray-800">Borrowing Report</h2>
      </div>

      <!-- Feedback Messages -->
      <div v-if="successMessage" class="mb-4 text-green-600 text-sm">{{ successMessage }}</div>
      <div v-if="errorMessage" class="mb-4 text-red-600 text-sm">{{ errorMessage }}</div>
      <div v-if="isLoading" class="mb-4 text-gray-600 text-sm">Loading...</div>

      <!-- Borrow Report Table -->
      <div class="overflow-x-auto rounded-lg border border-gray-200">
        <table class="min-w-full text-sm">
          <thead class="bg-gray-400">
            <tr>
              <th class="px-3 py-3 text-left font-semibold text-white uppercase tracking-wider">Quantity</th>
              <th class="px-3 py-3 text-left font-semibold text-white uppercase tracking-wider">Purpose</th>
              <th class="px-3 py-3 text-left font-semibold text-white uppercase tracking-wider">Borrowed Date</th>
              <th class="px-3 py-3 text-left font-semibold text-white uppercase tracking-wider">Returned Date</th>
              <th class="px-3 py-3 text-left font-semibold text-white uppercase tracking-wider">Material Name</th>
              <th class="px-3 py-3 text-left font-semibold text-white uppercase tracking-wider">Staff Name</th>
              <th class="px-3 py-3 text-left font-semibold text-white uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="report in visibleBorrowReports" :key="report.id" class="hover:bg-gray-50">
              <td class="px-4 py-2 text-sm font-medium text-gray-900">{{ report.quantity }}</td>
              <td class="px-4 py-2 text-sm text-gray-500">{{ report.purpose }}</td>
              <td class="px-4 py-2 text-sm text-gray-500">{{ report.borrowed_date }}</td>
              <td class="px-4 py-2 text-sm text-gray-500">{{ report.returned_date || 'Not Returned' }}</td>
              <td class="px-4 py-2 text-sm text-gray-500">{{ report.material.name }}</td>
              <td class="px-4 py-2 text-sm text-gray-500">{{ report.staff.name }}</td>
              <td class="px-4 py-2 text-sm text-right relative">
                <button @click="showMenuId = showMenuId === report.id ? null : report.id"
                  class="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500"
                  :aria-expanded="showMenuId === report.id">
                  <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <circle cx="12" cy="6" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="18" r="2" />
                  </svg>
                </button>
                <div v-if="showMenuId === report.id"
                  class="absolute right-0 mt-1 w-40 bg-white shadow-lg rounded-lg ring-1 ring-gray-100 z-50">
                  <button @click="returnBorrow(report)"
                    class="w-full text-left px-2 py-1 text-sm text-gray-800 hover:bg-blue-50 flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>Return
                  </button>
                  <div class="border-t border-gray-200"></div>
                  <button @click="showDeleteConfirm = true; selectedMaterialToDelete = report; deleteType = 'borrow'"
                    class="w-full text-left px-2 py-1 text-sm text-red-500 hover:bg-red-50 flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0h4m-7 4v12m10-12v12" />
                    </svg>Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="borrowReports.length === 0" class="text-center py-4 text-gray-500">No borrow records found.</div>
        <div v-if="borrowReports.length > 3" class="text-center mt-2">
          <button @click="toggleShowAllReports" class="text-blue-600 hover:underline" :class="{ 'hidden': showAllReports }">
            More
          </button>
          <button @click="toggleShowAllReports" class="text-blue-600 hover:underline" :class="{ 'hidden': !showAllReports }">
            Less
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
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
const deleteType = ref(null)
const borrowReports = ref([])
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')


const showAllItems = ref(false)
const showAllReports = ref(false)


const visibleItems = computed(() => showAllItems.value ? props.items : props.items.slice(0, 3))
const visibleBorrowReports = computed(() => showAllReports.value ? borrowReports.value : borrowReports.value.slice(0, 3))


const handleClickOutside = (event) => {
  const menuButtons = document.querySelectorAll('[aria-expanded="true"]')
  let clickedInside = false
  menuButtons.forEach((btn) => {
    if (btn.contains(event.target)) clickedInside = true
  })
  if (!clickedInside) showMenuId.value = null
}
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  fetchBorrowReports()
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Modal handling
const openAdd = () => { selectedMaterial.value = null; showModal.value = true }
const openEdit = (item) => { selectedMaterial.value = { ...item }; showModal.value = true }
const openBorrow = (item) => { selectedMaterial.value = { ...item }; showBorrowForm.value = true }
const closeModal = () => { showModal.value = false; selectedMaterial.value = null }
const closeBorrowForm = () => { showBorrowForm.value = false; selectedMaterial.value = null }

// Material Add / Update
const handleMaterialAdded = (material) => {
  props.items.push(material)
  emit('item-added', material)
  closeModal()
}
const handleMaterialUpdated = (updated) => { emit('edit-item', updated); closeModal() }

// Borrow Reports
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

const computeStatus = (stock, minStock) => {
  if (stock <= 0) return 'critical'
  if (stock <= minStock) return 'low'
  return 'ok'
}

const handleBorrowSubmitted = async (data) => {
  isLoading.value = true
  try {
    // Save borrow record
    const borrowResponse = await API.post('/borrowings', data)
    const materialId = data.material_id
    const quantity = data.quantity

    if (materialId && quantity) {
      // Fetch current material before update
      const { data: currentMaterial } = await API.get(`/materials/${materialId}`)
      console.log('Current Material:', {
        id: currentMaterial.data.id,
        name: currentMaterial.data.name,
        currentStock: currentMaterial.data.currentStock,
        value: currentMaterial.data.value,
        pricePerUnit: currentMaterial.data.pricePerUnit
      })

      // Update stock in backend
      await API.put(`/materials/${materialId}/decrease-stock`, { quantity })

      // Fetch updated material to get new values
      const { data: updatedMaterial } = await API.get(`/materials/${materialId}`)
      console.log('Updated Material:', {
        id: updatedMaterial.data.id,
        name: updatedMaterial.data.name,
        currentStock: updatedMaterial.data.currentStock,
        value: updatedMaterial.data.value,
        pricePerUnit: updatedMaterial.data.pricePerUnit
      })

      // Calculate the value to subtract based on original data
      const valueToSubtract = quantity * currentMaterial.data.pricePerUnit
      const newValue = currentMaterial.data.value - valueToSubtract
      console.log('Calculation:', {
        quantity: quantity,
        pricePerUnit: currentMaterial.data.pricePerUnit,
        valueToSubtract: valueToSubtract,
        originalValue: currentMaterial.data.value,
        newValue: newValue
      })

      // Update local items
      const index = props.items.findIndex(m => m.id === materialId)
      if (index !== -1) {
        const newStatus = computeStatus(updatedMaterial.data.currentStock, updatedMaterial.data.minStock)

        // Update the item with subtracted value
        props.items[index] = {
          ...props.items[index],
          currentStock: updatedMaterial.data.currentStock,
          value: newValue, // Use subtracted value
          status: newStatus,
          pricePerUnit: currentMaterial.data.pricePerUnit
        }

        // Force reactivity with a new array reference
        props.items = [...props.items]
        console.log('Updated Item in Array:', props.items[index])
      }
    }

    // Refresh borrow reports
    await fetchBorrowReports()

    showBorrowForm.value = false
    successMessage.value = 'Borrow record added, inventory updated!'
    setTimeout(() => { successMessage.value = '' }, 3000)
  } catch (error) {
    console.error('Borrow submission error:', error)
    errorMessage.value = error.response?.data?.message || 'Failed to add borrow record.'
  } finally {
    isLoading.value = false
  }
}

// Delete
const cancelDelete = () => { 
  showDeleteConfirm.value = false; 
  selectedMaterialToDelete.value = null; 
  deleteType.value = null 
}

const confirmDelete = async () => {
  const id = selectedMaterialToDelete.value?.id
  try {
    if (deleteType.value === 'material') {
      // Delete material from inventory
      await API.delete(`/materials/${id}`)
      emit('delete-item', id)
      successMessage.value = 'Material deleted successfully!'
    } else if (deleteType.value === 'borrow') {
      // Delete borrow record only
      await API.delete(`/borrowings/${id}`)
      await fetchBorrowReports()
      successMessage.value = 'Borrow record deleted successfully!'
    }
    setTimeout(() => { successMessage.value = '' }, 3000)
  } catch (error) {
    console.error('Delete error:', error)
    errorMessage.value = 'Failed to delete. Please try again.'
  } finally {
    showDeleteConfirm.value = false
    selectedMaterialToDelete.value = null
    deleteType.value = null
  }
}

// Return
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

// Status Badge
const getStatusClass = (status) => ({
  'ok': 'inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800',
  'low': 'inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800',
  'critical': 'inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800',
})[status] || 'inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'

// Toggle functions
const toggleShowAllItems = () => {
  showAllItems.value = !showAllItems.value
}

const toggleShowAllReports = () => {
  showAllReports.value = !showAllReports.value
}
</script>