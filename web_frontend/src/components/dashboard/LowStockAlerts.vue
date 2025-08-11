<template>
  <div class="bg-white rounded-lg shadow">
    <div class="p-6 border-b border-gray-200">
      <h3 class="text-lg font-medium text-gray-900">Low Stock Alerts</h3>
    </div>
    <div class="p-6">
      <div v-if="filteredItems.length" class="space-y-4">
        <div
          v-for="item in filteredItems"
          :key="item.id"
          class="border border-gray-200 rounded-lg p-4"
        >
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-sm font-medium text-gray-900">{{ item.name }}</h4>
            <span
              class="px-2 py-1 text-xs font-medium rounded-full"
              :class="getBadgeClass(item)"
            >
              {{ getStatusLabel(item) }}
            </span>
          </div>
          <p class="text-sm text-gray-600 mb-3">
            Current: {{ item.currentStock }} | Minimum: {{ item.minStock }}
          </p>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              :class="getBarClass(item)"
              class="h-2 rounded-full"
              :style="{ width: item.percentage + '%' }"
            ></div>
          </div>
        </div>
      </div>
      <div v-else class="text-gray-500 text-sm">
        All materials are sufficiently stocked.
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useMaterialsStore } from '@/stores/material'

const store = useMaterialsStore()

onMounted(async () => {
  await store.fetchMaterials()
})

const filteredItems = computed(() => {
  return store.lowStockItems || []
})

const getStatusLabel = (item) => {
  if (item.currentStock <= 40) return 'Critical'
  if (item.currentStock <= 60) return 'Low Stock'
  return 'OK'
}

const getBadgeClass = (item) => {
  if (item.currentStock <= 40) {
    return 'text-red-800 bg-red-100'
  } else if (item.currentStock <= 60) {
    return 'text-yellow-800 bg-yellow-100'
  }
  return 'text-green-800 bg-green-100'
}

const getBarClass = (item) => {
  if (item.currentStock <= 40) {
    return 'bg-red-500'
  } else if (item.currentStock <= 60) {
    return 'bg-yellow-400'
  }
  return 'bg-green-500'
}
</script>
