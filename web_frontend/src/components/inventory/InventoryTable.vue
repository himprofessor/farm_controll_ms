<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-gray-800">{{ t('inventory.materialsInventory') }}</h2>
      <button @click="openAdd"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow flex items-center space-x-1 transition-colors">
        <Plus class="w-4 h-4" /><span>{{ t('inventory.addMaterial') }}</span>
      </button>
    </div>

    <!-- Modals -->
    <AddItemView v-if="showModal" :item="selectedMaterial" :categories="categories"
      @close="closeModal" @material-added="handleMaterialAdded" @material-updated="handleMaterialUpdated" />
    <BorrowForm v-if="showBorrowForm" :material="selectedMaterial"
      @close="closeBorrowForm" @submitted="handleBorrowSubmitted" />

    <!-- Delete Confirmation -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-4 w-80">
        <h3 class="text-lg font-bold text-gray-800 mb-2">Confirm Action</h3>
        <p class="text-gray-600 mb-2">
          Are you sure you want to delete {{ deleteType === 'material' ? selectedMaterialToDelete.name : `${selectedMaterialToDelete.quantity} of ${selectedMaterialToDelete.material.name} borrowed by ${selectedMaterialToDelete.staff.name}` }}?
        </p>
        <div class="flex justify-end space-x-2">
          <button @click="cancelDelete" class="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-800 transition-colors">
            {{ t('staff.cancel') }}
          </button>
          <button @click="confirmDelete" class="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors" :disabled="isDeleting">
            {{ t('staff.confirm') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Materials Table -->
    <div class="overflow-x-auto rounded-lg border border-gray-200">
      <table class="min-w-full text-sm">
        <thead class="bg-green-600">
          <tr>
            <th class="px-6 py-3 text-left font-semibold text-white uppercase tracking-wider">{{ t('inventory.itemName') }}</th>
            <th class="px-6 py-3 text-left font-semibold text-white uppercase tracking-wider">{{ t('inventory.category') }}</th>
            <th class="px-6 py-3 text-left font-semibold text-white uppercase tracking-wider">{{ t('inventory.currentStock') }}</th>
            <th class="px-6 py-3 text-left font-semibold text-white uppercase tracking-wider">{{ t('inventory.status') }}</th>
            <th class="px-6 py-3 text-left font-semibold text-white uppercase tracking-wider">{{ t('inventory.value') }}</th>
            <th class="px-6 py-3 text-left font-semibold text-white uppercase tracking-wider">{{ t('inventory.supplier') }}</th>
            <th class="px-6 py-3 text-center font-semibold text-white uppercase tracking-wider">{{ t('inventory.actions') }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 bg-white">
          <tr v-for="material in visibleItems" :key="material.id" class="hover:bg-gray-50 transition">
            <td class="px-6 py-4">
              <div class="font-medium text-gray-900">{{ material.name }}</div>
              <div class="text-xs text-gray-500">{{ t('inventory.expires') }}: {{ material.expires || t('staff.na') }}</div>
            </td>
            <td class="px-6 py-4">
              <span class="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                {{ material.category }}
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="text-gray-900">{{ material.currentStock }} {{ material.unit }}</div>
              <div class="text-xs text-gray-500">{{ t('inventory.minStock') }}: {{ material.minStock }} {{ material.unit }}</div>
            </td>
            <td class="px-6 py-4">
              <span :class="getStatusClass(material.status)">{{ t(`inventory.status${capitalize(material.status)}`) }}</span>
            </td>
            <td class="px-6 py-4">
              <div class="text-gray-900 font-medium">$ {{ material.value }}</div>
              <div class="text-xs text-gray-500">@{{ material.pricePerUnit }} $</div>
            </td>
            <td class="px-6 py-4">
              <div class="text-gray-900">{{ material.supplier }}</div>
              <div class="text-xs text-gray-500">{{ t('inventory.lastUpdated') }}: {{ material.lastUpdated }}</div>
            </td>
            <td class="px-6 py-4 text-center relative">
              <button @click="showMenuId = showMenuId === material.id ? null : material.id"
                class="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 transition-colors"
                :aria-expanded="showMenuId === material.id">
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="6" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="18" r="2" />
                </svg>
              </button>
              <div v-if="showMenuId === material.id"
                class="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg ring-1 ring-gray-100 z-50">
                <button @click="openBorrow(material)" class="w-full text-left px-2 py-1 text-sm text-gray-800 hover:bg-blue-50 flex items-center gap-1">
                  Borrow
                </button>
                <button @click="openEdit(material)" class="w-full text-left px-2 py-1 text-sm text-gray-800 hover:bg-blue-50 flex items-center gap-1">
                  {{ t('staff.edit') }}
                </button>
                <div class="border-t border-gray-200"></div>
                <button @click="prepareDelete(material, 'material')" class="w-full text-left px-2 py-1 text-sm text-red-500 hover:bg-red-50 flex items-center gap-1">
                  {{ t('staff.delete') }}
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="items.length === 0" class="text-center py-6 text-gray-500 italic">{{ t('inventory.noItemsFound') }}</div>
      <div v-if="items.length > 3" class="text-center mt-2">
        <button @click="toggleShowAllItems" class="text-blue-600 hover:underline" :class="{ hidden: showAllItems }">More</button>
        <button @click="toggleShowAllItems" class="text-blue-600 hover:underline" :class="{ hidden: !showAllItems }">Less</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import AddItemView from './AddItemView.vue'
import BorrowForm from './InventoryBorrowing.vue'
import { Plus } from 'lucide-vue-next'
import API from '@/plugin/axios'

const { t } = useI18n()
const props = defineProps({ items: Array })
const emit = defineEmits(['delete-item', 'edit-item', 'item-added'])

const showModal = ref(false)
const showBorrowForm = ref(false)
const showDeleteConfirm = ref(false)
const selectedMaterial = ref(null)
const selectedMaterialToDelete = ref(null)
const deleteType = ref(null)
const showMenuId = ref(null)
const borrowReports = ref([])
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const showAllItems = ref(false)
const categories = ['Seeds', 'Fertilizer', 'Tools', 'Feed', 'Medicine']

// Computed
const visibleItems = computed(() => showAllItems.value ? props.items : props.items.slice(0, 3))

// Helper
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
const getStatusClass = (status) => ({
  ok: 'inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800',
  low: 'inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800',
  critical: 'inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800'
}[status] || 'inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800')

// Modal
const openAdd = () => { selectedMaterial.value = null; showModal.value = true }
const openEdit = (item) => { selectedMaterial.value = { ...item }; showModal.value = true }
const openBorrow = (item) => { selectedMaterial.value = { ...item }; showBorrowForm.value = true }
const closeModal = () => { showModal.value = false; selectedMaterial.value = null }
const closeBorrowForm = () => { showBorrowForm.value = false; selectedMaterial.value = null }

// Delete
const prepareDelete = (item, type) => {
  selectedMaterialToDelete.value = item
  deleteType.value = type
  showDeleteConfirm.value = true
}
const cancelDelete = () => { showDeleteConfirm.value = false; selectedMaterialToDelete.value = null; deleteType.value = null }
const confirmDelete = async () => {
  try {
    if (deleteType.value === 'material') {
      await API.delete(`/materials/${selectedMaterialToDelete.value.id}`)
      emit('delete-item', selectedMaterialToDelete.value.id)
    }
    showDeleteConfirm.value = false
    selectedMaterialToDelete.value = null
    deleteType.value = null
  } catch (err) {
    console.error(err)
  }
}

// Toggle
const toggleShowAllItems = () => showAllItems.value = !showAllItems.value

// Click outside menu
const handleClickOutside = (event) => {
  const buttons = document.querySelectorAll('[aria-expanded="true"]')
  let clickedInside = false
  buttons.forEach(btn => { if (btn.contains(event.target)) clickedInside = true })
  if (!clickedInside) showMenuId.value = null
}
onMounted(() => { document.addEventListener('click', handleClickOutside) })
onBeforeUnmount(() => { document.removeEventListener('click', handleClickOutside) })
</script>
