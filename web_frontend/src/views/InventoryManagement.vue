```vue
<template>
  <div class="min-h-screen bg-gray-100 p-6 md:p-10">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <InventoryHeader @add-item="handleItemAdded" />

      <!-- Loading/Error States -->
      <div v-if="isLoading" class="text-sm text-gray-500">{{ $t('inventory.loading') }}</div>
      <div v-else-if="error" class="text-sm text-red-500">{{ $t('inventory.error') }}</div>
      <div v-else>
        <!-- Summary Card -->
        <InventoryCard
          :totalItems="inventoryItems.length"
          :lowStockCount="lowStockCount"
          :totalValue="totalValue"
          :uniqueCategoriesCount="uniqueCategories.length"
        />

        <!-- Search/Filter -->
        <InventorySearchFilter
          v-model:searchQuery="searchQuery"
          v-model:selectedCategory="selectedCategory"
          :categories="uniqueCategories"
        />

        <!-- Table -->
        <InventoryTable
          :items="filteredItems"
          @delete-item="deleteItem"
          @edit-item="editItem"
          @item-added="handleItemAdded"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import InventoryHeader from '@/components/inventory/InventoryHeader.vue'
import InventoryCard from '@/components/inventory/InventoryCard.vue'
import InventoryTable from '@/components/inventory/InventoryTable.vue'
import InventorySearchFilter from '@/components/inventory/InventorySearchFilter.vue'
import API from '@/plugin/axios'

const { t: $t } = useI18n() // Ensure $t is correctly destructured
const inventoryItems = ref([])
const searchQuery = ref('')
const selectedCategory = ref('')
const isLoading = ref(true)
const error = ref(null)

// Fetch data from backend
const fetchInventory = async () => {
  try {
    isLoading.value = true
    const res = await API.get('/materials')
    inventoryItems.value = res.data.map(item => ({
      id: item.id || '',
      name: item.name || $t('staffCard.na'),
      supplier: item.supplier || $t('staffCard.na'),
      category: item.category || $t('staffCard.na'),
      status: item.status || $t('staffCard.na'),
      value: Number(item.value) || 0,
      currentStock: item.currentStock ?? $t('staffCard.na'),
      minStock: item.minStock ?? $t('staffCard.na'),
    }))
  } catch (err) {
    error.value = err.message
  } finally {
    await nextTick()
    isLoading.value = false
  }
}

onMounted(fetchInventory)

// Summary cards
const lowStockCount = computed(() =>
  inventoryItems.value.filter(item => item.status === 'low' || item.status === 'critical').length
)

const totalValue = computed(() =>
  inventoryItems.value.reduce((sum, item) => sum + (Number(item.value) || 0), 0)
)

const uniqueCategories = computed(() => {
  const categories = new Set(inventoryItems.value.map(i => i.category).filter(c => c !== $t('staffCard.na')))
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
      (i.name || '').toLowerCase().includes(query) ||
      (i.supplier || '').toLowerCase().includes(query)
    )
  }

  return items
})

// Events
const handleItemAdded = async item => {
  await nextTick()
  inventoryItems.value.push({
    id: item.id || '',
    name: item.name || $t('staffCard.na'),
    supplier: item.supplier || $t('staffCard.na'),
    category: item.category || $t('staffCard.na'),
    status: item.status || $t('staffCard.na'),
    value: Number(item.value) || 0,
    currentStock: item.currentStock ?? $t('staffCard.na'),
    minStock: item.minStock ?? $t('staffCard.na'),
  })
}

const deleteItem = async id => {
  await nextTick()
  inventoryItems.value = inventoryItems.value.filter(item => item.id !== id)
}

const editItem = async item => {
  console.log('Edit:', item) // Placeholder; update with actual edit logic
}
</script>
```