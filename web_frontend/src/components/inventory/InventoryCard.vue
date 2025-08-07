<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 ">
    <div class="bg-white rounded-lg shadow-sm p-9 flex items-center justify-between pl-6">
      <div><p class="text-gray-500 text-xl">Total Items</p><p class="text-3xl font-bold text-gray-900">{{ totalItems }}</p></div>
      <PackageIcon class="w-6 h-6 text-blue-500" />
    </div>
    <div class="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between pl-6">
      <div><p class="text-gray-500 text-xl">Low Stock Alerts</p><p class="text-3xl font-bold text-red-500">{{ lowStockCount }}</p></div>
      <AlertTriangleIcon class="w-6 h-6 text-red-500" />
    </div>
    <div class="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between pl-6">
      <div><p class="text-gray-500 text-xl">Total Value</p><p class="text-3xl font-bold text-gray-900">${{ totalValue.toFixed(2) }}</p></div>
      <LineChartIcon class="w-6 h-6 text-green-500" />
    </div>
    <div class="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between pl-6">
      <div><p class="text-gray-500 text-xl">Categories</p><p class="text-3xl font-bold text-gray-900">{{ uniqueCategoriesCount }}</p></div>
      <BoxesIcon class="w-6 h-6 text-purple-500" />
    </div>
  </div>
</template>

<script setup>
import { PackageIcon, AlertTriangleIcon, LineChartIcon, BoxesIcon } from 'lucide-vue-next'
defineProps({ totalItems: Number, lowStockCount: Number, totalValue: Number, uniqueCategoriesCount: Number })
</script>