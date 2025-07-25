<template>
  <div class="grid grid-cols-4 gap-6 mb-8">
    <div class="bg-white p-6 rounded-xl shadow-sm border">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-500 text-sm font-medium mb-1">Total Items</p>
          <p class="text-3xl font-bold text-gray-900">{{ totalItems }}</p>
        </div>
        <div class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
          <PackageIcon class="w-7 h-7 text-white" />
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-500 text-sm font-medium mb-1">Low Stock Alerts</p>
          <p class="text-3xl font-bold text-red-500">{{ lowStockCount }}</p>
        </div>
        <div class="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
          <AlertTriangleIcon class="w-7 h-7 text-white" />
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-500 text-sm font-medium mb-1">Total Value</p>
          <p class="text-3xl font-bold text-gray-900">${{ totalValue.toLocaleString() }}</p>
        </div>
        <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
          <TrendingUpIcon class="w-7 h-7 text-white" />
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-500 text-sm font-medium mb-1">Categories</p>
          <p class="text-3xl font-bold text-gray-900">{{ categoriesCount }}</p>
        </div>
        <div class="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
          <TagIcon class="w-7 h-7 text-white" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PackageIcon, AlertTriangleIcon, TrendingUpIcon, TagIcon } from 'lucide-vue-next'

defineProps({
  totalItems: Number,
  lowStockCount: Number,
  totalValue: Number,
  categoriesCount: Number
})
</script>