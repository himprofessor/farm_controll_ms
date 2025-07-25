<template>
  <div class=" bg-gray-100 rounded-lg shadow">

    <!-- Main Content -->
    <div class="flex-1 p-8">
      <!-- Header -->
      <div class="flex justify-between items-start mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p class="text-gray-600 mt-1">Track and manage farm inventory and supplies</p>
        </div>
        <button @click="openAddModal"
          class="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors">
          <PlusIcon class="w-4 h-4" />
          <span>Add Item</span>
        </button>
      </div>

      <!-- Summary Cards Component -->
      <InventoryCard :total-items="totalItems" :low-stock-count="lowStockCount" :total-value="totalValue"
        :categories-count="categoriesCount" />

      <!-- Search Filter Component -->
      <InventorSearchFilter v-model:search-query="searchQuery" v-model:selected-category="selectedCategory" />

      <!-- Inventory Table Component -->
      <InventoryTable :items="filteredItems" @edit="editItem" @delete="deleteItem" />
    </div>

    <!-- Item Modal Component -->
    <InventoryItemModel :show="showModal" :is-editing="isEditing" :form-data="formData" @close="closeModal"
      @save="saveItem" />

    <!-- Delete Modal Component -->
    <InventoryDelete :show="showDeleteModal" @cancel="showDeleteModal = false" @confirm="confirmDelete" />

    <!-- Toast Component -->
    <InventoryToast :show="showToast" :message="toastMessage" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { PlusIcon } from 'lucide-vue-next'

// Import Components

import InventoryCard from '../components/inventory/InventoryCard.vue'
import InventorSearchFilter from '../components/inventory/InventorySearchFilter.vue'
import InventoryTable from '../components/inventory/InventoryTable.vue'
import InventoryItemModel from '../components/inventory/InventoryItemModel.vue'
import InventoryDelete from '../components/inventory/InventoryDelete.vue'
import InventoryToast from '../components/inventory/InventoryToast.vue'

// Reactive Data
const searchQuery = ref('')
const selectedCategory = ref('')
const showModal = ref(false)
const showDeleteModal = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const isEditing = ref(false)
const editingId = ref(null)
const deleteId = ref(null)

const formData = ref({
  name: '',
  category: '',
  currentStock: '',
  minStock: '',
  status: 'good',
  value: 0,
  unitPrice: 0,
  unit: '',
  supplier: '',
  lastOrder: '',
  expiry: ''
})

const inventoryItems = ref([
  {
    id: 1,
    name: 'Pig Feed - Starter',
    category: 'Feed',
    currentStock: '45 kg',
    minStock: '100 kg',
    status: 'critical',
    value: 112.50,
    unitPrice: 2.50,
    unit: 'kg',
    supplier: 'Farm Supply Co.',
    lastOrder: '1/10/2024',
    expiry: '6/10/2024'
  },
  {
    id: 2,
    name: 'Antibiotics - Penicillin',
    category: 'Medication',
    currentStock: '8 bottles',
    minStock: '15 bottles',
    status: 'low',
    value: 360.00,
    unitPrice: 45.00,
    unit: 'bottles',
    supplier: 'Vet Supplies Ltd.',
    lastOrder: '1/5/2024',
    expiry: '1/5/2025'
  },
  {
    id: 3,
    name: 'Vitamins Mix',
    category: 'Medication',
    currentStock: '12 bottles',
    minStock: '20 bottles',
    status: 'low',
    value: 300.00,
    unitPrice: 25.00,
    unit: 'bottles',
    supplier: 'Health Plus',
    lastOrder: '1/8/2024',
    expiry: '12/8/2024'
  },
  {
    id: 4,
    name: 'Water Tanks',
    category: 'Equipment',
    currentStock: '5 units',
    minStock: '2 units',
    status: 'good',
    value: 750.00,
    unitPrice: 150.00,
    unit: 'units',
    supplier: 'Equipment Pro',
    lastOrder: '12/15/2023',
    expiry: 'N/A'
  },
  {
    id: 5,
    name: 'Cleaning Supplies',
    category: 'Supplies',
    currentStock: '25 bottles',
    minStock: '10 bottles',
    status: 'good',
    value: 212.50,
    unitPrice: 8.50,
    unit: 'bottles',
    supplier: 'Clean Co.',
    lastOrder: '1/20/2024',
    expiry: 'N/A'
  }
])

// Computed Properties
const filteredItems = computed(() => {
  let items = inventoryItems.value

  if (searchQuery.value) {
    items = items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedCategory.value) {
    items = items.filter(item => item.category === selectedCategory.value)
  }

  return items
})

const totalItems = computed(() => inventoryItems.value.length)
const lowStockCount = computed(() => inventoryItems.value.filter(item => item.status === 'critical' || item.status === 'low').length)
const totalValue = computed(() => inventoryItems.value.reduce((sum, item) => sum + item.value, 0))
const categoriesCount = computed(() => [...new Set(inventoryItems.value.map(item => item.category))].length)

// Methods
const openAddModal = () => {
  isEditing.value = false
  resetForm()
  showModal.value = true
}

const editItem = (item) => {
  isEditing.value = true
  editingId.value = item.id
  formData.value = { ...item }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const resetForm = () => {
  formData.value = {
    name: '',
    category: '',
    currentStock: '',
    minStock: '',
    status: 'good',
    value: 0,
    unitPrice: 0,
    unit: '',
    supplier: '',
    lastOrder: '',
    expiry: ''
  }
}

const saveItem = () => {
  if (isEditing.value) {
    const index = inventoryItems.value.findIndex(item => item.id === editingId.value)
    if (index !== -1) {
      inventoryItems.value[index] = { ...formData.value, id: editingId.value }
      showToastMessage('Item updated successfully!')
    }
  } else {
    const newId = Math.max(...inventoryItems.value.map(item => item.id)) + 1
    inventoryItems.value.push({ ...formData.value, id: newId })
    showToastMessage('Item added successfully!')
  }
  closeModal()
}

const deleteItem = (id) => {
  deleteId.value = id
  showDeleteModal.value = true
}

const confirmDelete = () => {
  inventoryItems.value = inventoryItems.value.filter(item => item.id !== deleteId.value)
  showDeleteModal.value = false
  showToastMessage('Item deleted successfully!')
}

const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}
</script>