<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-6 rounded-lg shadow">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <InventoryHeader @add-item="handleAddItem" />

      <!-- Stats Cards -->
      <InventoryCard
        :totalItems="inventoryItems.length"
        :lowStockCount="lowStockCount"
        :totalValue="totalValue"
        :uniqueCategoriesCount="uniqueCategories.length"
      />

      <!-- Search & Filters -->
      <InventorySearchFilter
        v-model:searchQuery="searchQuery"
        v-model:selectedCategory="selectedCategory"
        :categories="uniqueCategories"
        ref="searchFilter"
      />

      <!-- Inventory Table -->
      <InventoryTable
        :items="filteredItems"
        @delete-item="deleteItem"
        @edit-item="editItem"
        @item-added="handleItemAdded"
        @item-updated="handleItemUpdated"
        @open-borrow="showBorrowForm = true"  
      />

      <!-- Borrowing Modal -->
      <InventoryBorrowing
        v-if="showBorrowForm"
        @close="showBorrowForm = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import InventoryHeader from '@/components/inventory/InventoryHeader.vue'
import InventoryCard from '@/components/inventory/InventoryCard.vue'
import InventoryTable from '@/components/inventory/InventoryTable.vue'
import InventorySearchFilter from '@/components/inventory/InventorySearchFilter.vue'
import InventoryBorrowing from '@/components/inventory/InventoryBorrowing.vue'
import API from '@/plugin/axios'

/* ---------------- STATE ---------------- */
const inventoryItems = ref([])
const searchQuery = ref('')
const selectedCategory = ref('')
const searchFilter = ref(null)
const showBorrowForm = ref(false)

/* ---------------- FETCH ---------------- */
const fetchInventory = async () => {
  try {
    console.log('Fetching inventory...')
    const res = await API.get('/materials')
    if (res.data && Array.isArray(res.data)) {
      inventoryItems.value = res.data
    } else {
      inventoryItems.value = []
      console.warn('API returned invalid data format:', res.data)
    }
    console.log('API Response:', inventoryItems.value)
  } catch (error) {
    console.error('Failed to fetch inventory:', error)
    inventoryItems.value = []
  }
}
onMounted(fetchInventory)

/* ---------------- COMPUTED ---------------- */
const lowStockCount = computed(() =>
  inventoryItems.value.filter(item => ['low', 'critical'].includes(item.status)).length
)

const totalValue = computed(() =>
  inventoryItems.value.reduce((sum, item) => sum + (Number(item.value) || 0), 0)
)

const uniqueCategories = computed(() => {
  const categories = new Set(inventoryItems.value.map(i => i.category))
  return Array.from(categories).sort()
})

const filteredItems = computed(() => {
  let items = [...inventoryItems.value]
  if (selectedCategory.value) {
    items = items.filter(i => i.category === selectedCategory.value)
  }
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    items = items.filter(i =>
      i.name?.toLowerCase().includes(query) ||
      i.category?.toLowerCase().includes(query) ||
      i.status?.toLowerCase().includes(query) ||
      i.currentStock?.toString().includes(query) ||
      i.supplier?.toLowerCase().includes(query)
    )
  }
  return items
})

/* ---------------- HANDLERS ---------------- */
const handleAddItem = () => {
  // opens modal in table (child handles it)
}

const handleItemAdded = (item) => {
  if (item) {
    inventoryItems.value.unshift(item) // show immediately at top
  }
}

const handleItemUpdated = (updatedItem) => {
  if (updatedItem) {
    const index = inventoryItems.value.findIndex(i => i.id === updatedItem.id)
    if (index !== -1) {
      inventoryItems.value[index] = { ...inventoryItems.value[index], ...updatedItem }
    }
  }
}

const deleteItem = async (id) => {
  try {
    await API.delete(`/materials/${id}`)
    inventoryItems.value = inventoryItems.value.filter(item => item.id !== id)
  } catch (error) {
    console.error('Failed to delete item:', error)
  }
}

const editItem = (item) => {
  // handled inside InventoryTable modal
}
</script>
