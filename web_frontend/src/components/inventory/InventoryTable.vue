<!-- src/views/MaterialsInventory.vue -->
<template>
  <div class="bg-white rounded-lg shadow p-4">
    <!-- Header & Add Button -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Materials Inventory</h2>
      <button
        @click="openAdd"
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-colors duration-200 flex items-center space-x-2"
      >
        <Plus class="w-5 h-5" />
        <span>Add Material</span>
      </button>
    </div>

    <!-- Modal Form -->
    <AddItemView
      v-if="showModal"
      :item="selectedMaterial"
      :categories="categories"
      @close="closeModal"
      @material-added="handleMaterialAdded"
      @material-updated="handleMaterialUpdated"
    />

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
          <tr
            v-for="material in materials"
            :key="material.id"
            class="hover:bg-gray-50 transition-colors duration-150"
          >
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
                <button
                  @click="showMenuId = showMenuId === material.id ? null : material.id"
                  class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="5" cy="12" r="2"/>
                    <circle cx="12" cy="12" r="2"/>
                    <circle cx="19" cy="12" r="2"/>
                  </svg>
                </button>
                <div
                  v-if="showMenuId === material.id"
                  class="absolute right-0 mt-2 bg-white shadow-md rounded-md w-36 z-50"
                >
                  <button
                    @click="openEdit(material)"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Update
                  </button>
                  <button
                    @click="deleteMaterial(material.id)"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
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
