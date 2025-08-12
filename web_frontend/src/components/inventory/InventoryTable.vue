<template>
  <div class="">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-gray-800">Materials Inventory</h2>
      <button
        @click="openAdd"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow flex items-center space-x-1"
      >
        <Plus class="w-4 h-4" /><span>Add Material</span>
      </button>
    </div>

    <!-- Add/Edit Modal -->
    <AddItemView
      v-if="showModal"
      :item="selectedMaterial"
      :categories="categories"
      @close="closeModal"
      @material-added="handleMaterialAdded"
      @material-updated="handleMaterialUpdated"
    />

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-4 w-80">
        <h3 class="text-lg font-bold text-gray-800 mb-2">Confirm Action</h3>
        <p class="text-gray-600 mb-2">
          Are you sure you want to delete {{ selectedMaterialToDelete.name }}?
        </p>
        <div class="flex justify-end space-x-2">
          <button
            @click="cancelDelete"
            class="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-800"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
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
          <tr v-for="material in items" :key="material.id" class="hover:bg-gray-50 transition">
            <!-- ITEM NAME with expiry -->
            <td class="px-6 py-4">
              <div class="font-medium text-gray-900">{{ material.name }}</div>
              <div class="text-xs text-gray-500">Expires: {{ material.expires || 'N/A' }}</div>
            </td>

            <!-- CATEGORY badge -->
            <td class="px-6 py-4">
              <span class="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                {{ material.category }}
              </span>
            </td>

            <!-- STOCK + min -->
            <td class="px-6 py-4">
              <div class="text-gray-900">{{ material.currentStock }} {{ material.unit }}</div>
              <div class="text-xs text-gray-500">Min: {{ material.minStock }} {{ material.unit }}</div>
            </td>

            <!-- STATUS -->
            <td class="px-6 py-4">
              <span :class="getStatusClass(material.status)">{{ material.status }}</span>
            </td>

            <!-- VALUE + per unit -->
            <td class="px-6 py-4">
              <div class="text-gray-900 font-medium">$ {{ material.value }}</div>
              <div class="text-xs text-gray-500">@{{ material.pricePerUnit}} $</div>
            </td>

            <!-- SUPPLIER + last updated -->
            <td class="px-6 py-4">
              <div class="text-gray-900">{{ material.supplier }}</div>
              <div class="text-xs text-gray-500">Last: {{ material.lastUpdated }}</div>
            </td>

            <!-- ACTION MENU -->
            <td class="px-6 py-4 text-center relative">
              <button
                @click="showMenuId = showMenuId === material.id ? null : material.id"
                class="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500"
                :aria-expanded="showMenuId === material.id"
              >
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="6" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="18" r="2" />
                </svg>
              </button>
              <div
                v-if="showMenuId === material.id"
                class="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg ring-1 ring-gray-100 z-50"
              >
                <button
                  @click="openEdit(material)"
                  class="w-full text-left px-2 py-1 text-sm text-gray-800 hover:bg-blue-50 flex items-center gap-1"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>Edit
                </button>
                <div class="border-t border-gray-200"></div>
                <button
                  @click="showDeleteConfirm = true; selectedMaterialToDelete = material"
                  class="w-full text-left px-2 py-1 text-sm text-red-500 hover:bg-red-50 flex items-center gap-1"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0h4m-7 4v12m10-12v12" />
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
    </div>
  </div>
</template>


<script setup>
import { ref, watch } from 'vue'
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

watch(() => props.items, (newItems) => {
  console.log('Table Items Updated:', newItems) // Debug log
}, { immediate: true })

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
</script>