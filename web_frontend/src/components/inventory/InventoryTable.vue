<template>
  <div class="bg-white rounded-lg shadow p-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-gray-800">Materials Inventory</h2>
      <button @click="openAdd" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow flex items-center space-x-1">
        <Plus class="w-4 h-4" /><span>Add Material</span>
      </button>
    </div>
    <AddItemView v-if="showModal" :item="selectedMaterial" :categories="categories" @close="closeModal" @material-added="handleMaterialAdded" @material-updated="handleMaterialUpdated" />
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
          <tr v-for="material in paginatedItems" :key="material.id" class="hover:bg-gray-50">
            <td class="px-4 py-2 text-sm font-medium text-gray-900">{{ material.name }}</td>
            <td class="px-4 py-2 text-sm text-gray-500">{{ material.category }}</td>
            <td class="px-4 py-2 text-sm text-gray-500">{{ material.currentStock }}</td>
            <td class="px-4 py-2 text-sm text-gray-500">{{ material.minStock }}</td>
            <td class="px-4 py-2 text-sm"><span :class="getStatusClass(material.status)">{{ material.status }}</span></td>
            <td class="px-4 py-2 text-sm text-gray-500">{{ material.value }}</td>
            <td class="px-4 py-2 text-sm text-gray-500">{{ material.supplier }}</td>
            <td class="px-4 py-2 text-sm text-right">
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
    </div>
    <div class="flex justify-end mt-2">
      <button @click="prevPage" :disabled="currentPage === 1" class="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300 disabled:opacity-50">Prev</button>
      <span class="px-2 py-1">{{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300 disabled:opacity-50">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AddItemView from './AddItemView.vue'
import { Plus } from 'lucide-vue-next'
import API from '@/plugin/axios'

const props = defineProps({ items: Array })
const emit = defineEmits(['delete-item', 'edit-item', 'item-added'])

const showModal = ref(false)
const selectedMaterial = ref(null)
const showMenuId = ref(null)
const categories = ['Seeds', 'Fertilizer', 'Tools', 'Feed', 'Medicine']
const showDeleteConfirm = ref(false)
const selectedMaterialToDelete = ref(null)
const currentPage = ref(1)
const itemsPerPage = 10 // Adjust as needed

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return props.items.slice(start, end)
})

const totalPages = computed(() => Math.ceil(props.items.length / itemsPerPage))

const openAdd = () => { selectedMaterial.value = null; showModal.value = true }
const openEdit = (item) => { selectedMaterial.value = { ...item }; showModal.value = true }
const closeModal = () => { showModal.value = false; selectedMaterial.value = null }
const handleMaterialAdded = (material) => { emit('item-added', material); closeModal() }
const handleMaterialUpdated = (updated) => { emit('edit-item', updated); closeModal() }
const cancelDelete = () => { showDeleteConfirm.value = false; selectedMaterialToDelete.value = null }
const confirmDelete = async () => {
  if (selectedMaterialToDelete.value?.id) {
    try { await API.delete(`/materials/${selectedMaterialToDelete.value.id}`); emit('delete-item', selectedMaterialToDelete.value.id) }
    catch (error) { console.error('Delete error:', error) }
    finally { showDeleteConfirm.value = false; selectedMaterialToDelete.value = null }
  }
}
const getStatusClass = (status) => ({
  'ok': 'inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800',
  'low': 'inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800',
  'critical': 'inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800',
})[status] || 'inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'

const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }
</script>