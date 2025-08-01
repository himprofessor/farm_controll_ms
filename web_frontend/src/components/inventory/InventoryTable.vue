<!-- src/views/MaterialsInventory.vue -->

<template>
  <div class="bg-white rounded-lg shadow p-4">
    <!-- Header & Add Button -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Materials Inventory</h2>
      <button @click="openAdd"
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-colors duration-200 flex items-center space-x-2">
        <Plus class="w-5 h-5" />
        <span>Add Material</span>
      </button>
    </div>

    <!-- Modal Form -->
    <AddItemView v-if="showModal" :item="selectedMaterial" :categories="categories" @close="closeModal"
      @material-added="handleMaterialAdded" @material-updated="handleMaterialUpdated" />

    <!-- Delete Confirmation Popup -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Confirm Action</h3>
        <p class="text-gray-600 mb-6">Are you sure you want to delete {{ selectedMaterialToDelete.name }}?</p>
        <div class="flex justify-end space-x-4">
          <button @click="cancelDelete" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800">
            Cancel
          </button>
          <button @click="confirmDelete" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
            Confirm
          </button>
        </div>
      </div>
    </div>

    <!-- Materials Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="material in materials" :key="material.id" class="hover:bg-gray-50 transition-colors duration-150">
            <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ material.name }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ material.category }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ material.currentStock }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ material.minStock }}</td>
            <td class="px-6 py-4 text-sm">
              <span :class="getStatusClass(material.status)">
                {{ material.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ material.value }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ material.supplier }}</td>
            <td class="px-6 py-4 text-sm text-right">
              <div class="relative inline-block">
                <button @click="showMenuId = showMenuId === material.id ? null : material.id"
                  class="relative w-10 h-10 flex items-center justify-center rounded-lg bg-white shadow-sm hover:shadow-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 active:scale-95 transition-all duration-300 ease-in-out"
                  aria-label="Toggle menu" :aria-expanded="showMenuId === material.id ? 'true' : 'false'">
                  <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <circle cx="6" cy="12" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="18" cy="12" r="2" />
                  </svg>
                </button>
                <div v-if="showMenuId === material.id"
                  class="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg ring-1 ring-gray-100/50 z-50 overflow-hidden transform transition-all duration-300 ease-in-out">
                  <button @click="openEdit(material)"
                    class="w-full text-left px-4 py-3 text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600 focus:outline-none transition-colors duration-200 flex items-center gap-2"
                    aria-label="Edit material">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <div class="border-t border-gray-200"></div>
                  <button @click="showDeleteConfirm = true; selectedMaterialToDelete = material"
                    class="w-full text-left px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600 focus:outline-none transition-colors duration-200 flex items-center gap-2"
                    aria-label="Delete material">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0h4m-7 4v12m10-12v12" />
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
import { ref, onMounted } from 'vue'
import API from '@/plugin/axios'
import { useToast } from 'vue-toastification'
import AddItemView from './AddItemView.vue'
import { Plus } from 'lucide-vue-next'

const materials = ref([])
const showModal = ref(false)
const selectedMaterial = ref(null)
const toast = useToast()
const showMenuId = ref(null)
const categories = ['Seeds', 'Fertilizer', 'Tools', 'Feed', 'Medicine']
const showDeleteConfirm = ref(false)
const selectedMaterialToDelete = ref(null)

const fetchMaterials = async () => {
  try {
    const res = await API.get('/materials')
    materials.value = res.data
  } catch (error) {
    toast.error('Failed to fetch materials.')
  }
}

const openAdd = () => {
  selectedMaterial.value = null
  showModal.value = true
}

const openEdit = (item) => {
  selectedMaterial.value = { ...item }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedMaterial.value = null
}

const handleMaterialUpdated = (updated) => {
  const index = materials.value.findIndex(m => m.id === updated.id)
  if (index !== -1) {
    materials.value[index] = updated
  }
  toast.success('Material updated!')
}

const cancelDelete = () => {
  showDeleteConfirm.value = false
  selectedMaterialToDelete.value = null
}

const confirmDelete = async () => {
  if (!selectedMaterialToDelete.value) return
  try {
    await API.delete(`/materials/${selectedMaterialToDelete.value.id}`)
    materials.value = materials.value.filter(m => m.id !== selectedMaterialToDelete.value.id)
    toast.success('Material deleted.')
  } catch (err) {
    toast.error('Failed to delete.')
  } finally {
    showDeleteConfirm.value = false
    selectedMaterialToDelete.value = null
  }
}

const deleteMaterial = (id) => {
  // This function is now a trigger to show the confirmation popup
  // The actual deletion is handled in confirmDelete
}

const getStatusClass = (status) => {
  switch (status) {
    case 'ok': return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'
    case 'low': return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'
    case 'critical': return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800'
    default: return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'
  }
}

onMounted(fetchMaterials)
</script>