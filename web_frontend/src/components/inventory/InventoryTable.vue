
<template>
  <div class="bg-white rounded-lg shadow p-4">
    <!-- Header & Add Button -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">{{ $t('inventory.table.title') }}</h2>
      <button
        @click="openAdd"
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-colors duration-200 flex items-center space-x-2"
      >
        <Plus class="w-5 h-5" />
        <span>{{ $t('inventory.addItem') }}</span>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-sm text-gray-500 mb-4">{{ $t('inventory.loading') }}</div>

    <!-- Modal Form -->
    <AddItemView
      v-if="showModal"
      :item="selectedMaterial"
      :categories="categories"
      @close="closeModal"
      @material-added="handleMaterialAdded"
      @material-updated="handleMaterialUpdated"
    />

    <!-- Delete Confirmation Popup -->
    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 class="text-xl font-bold text-gray-800 mb-4">{{ $t('confirmationDialog.title') }}</h3>
        <p class="text-gray-600 mb-6">
          {{ $t('inventory.deleteConfirm', { name: selectedMaterialToDelete?.name || $t('staffCard.na') }) }}
        </p>
        <div class="flex justify-end space-x-4">
          <button
            @click="cancelDelete"
            class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800"
          >
            {{ $t('confirmationDialog.cancel') }}
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            {{ $t('confirmationDialog.confirm') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Materials Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ $t('inventory.table.name') }}
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ $t('inventory.table.category') }}
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ $t('inventory.table.currentStock') }}
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ $t('inventory.table.minStock') }}
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ $t('inventory.table.status') }}
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ $t('inventory.table.value') }}
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ $t('inventory.table.supplier') }}
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ $t('inventory.table.actions') }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-if="!materials.length && !loading">
            <td colspan="8" class="px-6 py-4 text-sm text-gray-500">{{ $t('inventory.noItems') }}</td>
          </tr>
          <tr
            v-for="material in materials"
            :key="material.id"
            class="hover:bg-gray-50 transition-colors duration-150"
          >
            <td class="px-6 py-4 text-sm font-medium text-gray-900">
              {{ material.name || $t('staffCard.na') }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">
              {{ material.category ? $t(`inventory.categories.${material.category}`) : $t('staffCard.na') }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">
              {{ material.currentStock ?? $t('staffCard.na') }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">
              {{ material.minStock ?? $t('staffCard.na') }}
            </td>
            <td class="px-6 py-4 text-sm">
              <span :class="getStatusClass(material.status)">
                {{ material.status ? $t(`inventory.statuses.${material.status}`) : $t('staffCard.na') }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">
              {{ material.value ? formatCurrency(material.value) : $t('staffCard.na') }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">
              {{ material.supplier || $t('staffCard.na') }}
            </td>
            <td class="px-6 py-4 text-sm text-right">
              <div class="relative inline-block">
                <button
                  @click="showMenuId = showMenuId === material.id ? null : material.id"
                  class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                  :aria-label="$t('inventory.table.toggleMenu')"
                  :aria-expanded="showMenuId === material.id ? 'true' : 'false'"
                >
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="6" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="18" r="2" />
                  </svg>
                </button>
                <div
                  v-if="showMenuId === material.id"
                  class="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg ring-1 ring-gray-100/50 z-50 overflow-hidden transform transition-all duration-300 ease-in-out"
                >
                  <button
                    @click="openEdit(material)"
                    class="w-full text-left px-4 py-3 text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600 focus:outline-none transition-colors duration-200 flex items-center gap-2"
                    :aria-label="$t('inventory.table.edit')"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    {{ $t('inventory.table.edit') }}
                  </button>
                  <div class="border-t border-gray-200"></div>
                  <button
                    @click="showDeleteConfirm = true; selectedMaterialToDelete = material"
                    class="w-full text-left px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600 focus:outline-none transition-colors duration-200 flex items-center gap-2"
                    :aria-label="$t('inventory.table.delete')"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0h4m-7 4v12m10-12v12"
                      />
                    </svg>
                    {{ $t('inventory.table.delete') }}
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
import { ref, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import API from '@/plugin/axios'
import AddItemView from './AddItemView.vue'
import { Plus } from 'lucide-vue-next'

const { t: $t } = useI18n() // Ensure $t is correctly destructured
const toast = useToast()
const materials = ref([])
const showModal = ref(false)
const selectedMaterial = ref(null)
const showMenuId = ref(null)
const showDeleteConfirm = ref(false)
const selectedMaterialToDelete = ref(null)
const loading = ref(false)

// Hardcoded categories, translated dynamically
const categories = ref(['Seeds', 'Fertilizer', 'Tools', 'Feed', 'Medicine'])

const fetchMaterials = async () => {
  try {
    loading.value = true
    const res = await API.get('/materials')
    materials.value = res.data.map(material => ({
      id: material.id || '',
      name: material.name || $t('staffCard.na'),
      category: material.category || $t('staffCard.na'),
      currentStock: material.currentStock ?? $t('staffCard.na'),
      minStock: material.minStock ?? $t('staffCard.na'),
      status: material.status || $t('staffCard.na'),
      value: Number(material.value) || 0,
      supplier: material.supplier || $t('staffCard.na'),
    }))
  } catch (error) {
    toast.error($t('inventory.error'))
    console.error('Fetch error:', error)
  } finally {
    await nextTick()
    loading.value = false
  }
}

const openAdd = async () => {
  selectedMaterial.value = null
  showModal.value = true
  await nextTick()
}

const openEdit = async (item) => {
  selectedMaterial.value = { ...item }
  showModal.value = true
  await nextTick()
}

const closeModal = async () => {
  showModal.value = false
  selectedMaterial.value = null
  await nextTick()
}

const handleMaterialAdded = async (material) => {
  materials.value.push({
    id: material.id || '',
    name: material.name || $t('staffCard.na'),
    category: material.category || $t('staffCard.na'),
    currentStock: material.currentStock ?? $t('staffCard.na'),
    minStock: material.minStock ?? $t('staffCard.na'),
    status: material.status || $t('staffCard.na'),
    value: Number(material.value) || 0,
    supplier: material.supplier || $t('staffCard.na'),
  })
  toast.success($t('inventory.materialAdded'))
  await closeModal()
}

const handleMaterialUpdated = async (updated) => {
  const index = materials.value.findIndex(m => m.id === updated.id)
  if (index !== -1) {
    materials.value[index] = {
      id: updated.id || '',
      name: updated.name || $t('staffCard.na'),
      category: updated.category || $t('staffCard.na'),
      currentStock: updated.currentStock ?? $t('staffCard.na'),
      minStock: updated.minStock ?? $t('staffCard.na'),
      status: updated.status || $t('staffCard.na'),
      value: Number(updated.value) || 0,
      supplier: updated.supplier || $t('staffCard.na'),
    }
  }
  toast.success($t('inventory.materialUpdated'))
  await closeModal()
}

const cancelDelete = async () => {
  showDeleteConfirm.value = false
  selectedMaterialToDelete.value = null
  await nextTick()
}

const confirmDelete = async () => {
  if (!selectedMaterialToDelete.value || !selectedMaterialToDelete.value.id) {
    toast.error($t('inventory.deleteError'))
    return
  }
  try {
    loading.value = true
    await API.delete(`/materials/${selectedMaterialToDelete.value.id}`)
    materials.value = materials.value.filter(m => m.id !== selectedMaterialToDelete.value.id)
    toast.success($t('inventory.materialDeleted'))
  } catch (error) {
    toast.error($t('inventory.deleteError'))
    console.error('Delete error:', error)
  } finally {
    await nextTick()
    loading.value = false
    showDeleteConfirm.value = false
    selectedMaterialToDelete.value = null
  }
}

const getStatusClass = (status) => {
  switch (status) {
    case 'ok':
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'
    case 'low':
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'
    case 'critical':
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800'
    default:
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'
  }
}

function formatCurrency(amount) {
  if (!amount) return $t('staffCard.na')
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

onMounted(fetchMaterials)
</script>
