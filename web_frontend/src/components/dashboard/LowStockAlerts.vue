<!-- src/components/dashboard/LowStockAlerts.vue -->
<template>
  <div class="bg-white rounded-lg shadow">
    <div class="p-6 border-b border-gray-200">
      <h3 class="text-lg font-medium text-gray-900">Low Stock Alerts</h3>
    </div>
    <div class="p-6">
      <div v-if="lowStockItems.length" class="space-y-4">
        <div
          v-for="item in lowStockItems"
          :key="item.id"
          class="border border-gray-200 rounded-lg p-4"
        >
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-sm font-medium text-gray-900">{{ item.name }}</h4>
            <span class="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">
              Low Stock
            </span>
          </div>
          <p class="text-sm text-gray-600 mb-3">
            Current: {{ item.currentStock }} | Minimum: {{ item.minStock }}
          </p>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-red-500 h-2 rounded-full"
              :style="{ width: item.percentage + '%' }"
            ></div>
          </div>
        </div>
      </div>
      <div v-else class="text-gray-500 text-sm">All materials are sufficiently stocked.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import API from '@/plugin/axios'

const lowStockItems = ref([])

const fetchLowStock = async () => {
  try {
    const res = await API.get('/materials') // API returns all
    lowStockItems.value = res.data
      .filter(item => item.currentStock < 50)
      .map(item => ({
        ...item,
        percentage: Math.round((item.currentStock / item.minStock)* 10)
      }))
  } catch (err) {
    console.error('Failed to fetch low stock materials.', err)
  }
}

onMounted(fetchLowStock)
</script>
