<template>
  <div class="bg-white rounded-lg shadow">
    <div class="p-6 border-b border-gray-200">
      <h3 class="text-lg font-medium text-gray-900">Low Stock Alerts</h3>
    </div>
    <div class="p-6">
      <div class="space-y-4">
        <div v-for="item in lowStockItems" :key="item.id" class="border border-gray-200 rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-sm font-medium text-gray-900">{{ item.name }}</h4>
            <span class="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">
              Low Stock
            </span>
          </div>
          <p class="text-sm text-gray-600 mb-3">
            Current: {{ item.current }} | Minimum: {{ item.minimum }}
          </p>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="bg-red-500 h-2 rounded-full" 
              :style="{ width: item.percentage + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LowStockAlerts',
  data() {
    return {
      lowStockItems: [
        {
          id: 1,
          name: 'Pig Feed - Starter',
          current: '45 kg',
          minimum: '100 kg',
          percentage: 45
        },
        {
          id: 2,
          name: 'Antibiotics',
          current: '8 bottles',
          minimum: '15 bottles',
          percentage: 53
        },
        {
          id: 3,
          name: 'Vitamins',
          current: '12 bottles',
          minimum: '20 bottles',
          percentage: 60
        }
      ]
    }
  }
}
</script>