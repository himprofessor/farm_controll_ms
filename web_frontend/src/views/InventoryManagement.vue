<template>
  <div class="min-h-screen bg-gray-100 p-6 md:p-10">
    <div class="max-w-7xl mx-auto">
      <InventoryHeader @add-item="handleItemAdded" />

      <InventoryCard
        :totalItems="inventoryItems.length"
        :lowStockCount="lowStockCount"
        :totalValue="totalValue"
        :uniqueCategoriesCount="uniqueCategories.length"
      />

      <InventorySearchFilter
        v-model:searchQuery="searchQuery"
        v-model:selectedCategory="selectedCategory"
        :categories="uniqueCategories"
/>


      <InventoryTable
        :items="filteredItems"
        @delete-item="deleteItem"
        @edit-item="editItem"
        @item-added="handleItemAdded"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import InventoryHeader from '@/components/inventory/InventoryHeader.vue'
import InventoryCard from '@/components/inventory/InventoryCard.vue'
import InventoryTable from '@/components/inventory/InventoryTable.vue'
import InventorySearchFilter from '@/components/inventory/InventorySearchFilter.vue'
import API from '@/plugin/axios'

const inventoryItems = ref([])

const searchQuery = ref('')
const selectedCategory = ref('')

// Fetch data from backend
const fetchInventory = async () => {
  try {
    const res = await API.get('/materials')
    inventoryItems.value = res.data
  } catch (error) {
    console.error('Failed to fetch inventory:', error)
  }
}

onMounted(fetchInventory)

// Summary cards
const lowStockCount = computed(() =>
  inventoryItems.value.filter(item =>
    item.status === 'low' || item.status === 'critical'
  ).length
)

const totalValue = computed(() =>
  inventoryItems.value.reduce((sum, item) => sum + Number(item.value || 0), 0)
)

const uniqueCategories = computed(() => {
  const categories = new Set(inventoryItems.value.map(i => i.category))
  return Array.from(categories).sort()
})

// Filtered table data
const filteredItems = computed(() => {
  let items = inventoryItems.value

  if (selectedCategory.value) {
    items = items.filter(i => i.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    items = items.filter(i =>
      i.name.toLowerCase().includes(query) ||
      i.supplier.toLowerCase().includes(query)
    )
  }

  return items
})

// Events
const handleItemAdded = item => {
  inventoryItems.value.push(item)
}

const deleteItem = id => {
  inventoryItems.value = inventoryItems.value.filter(item => item.id !== id)
}

const editItem = item => {
  console.log('Edit:', item)
}
</script>
