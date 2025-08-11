<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 text-left">
      <h3 class="text-md font-medium text-gray-500">Total Sales</h3>
      <p class="text-3xl font-bold mt-2 text-gray-800">${{ totalSales.toLocaleString() }}</p>
      <p class="text-sm text-green-600 mt-1">+12% from last month</p>
    </div>
    
    <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 text-left">
      <h3 class="text-md font-medium text-gray-500">Total Quantity Sold</h3>
      <p class="text-3xl font-bold mt-2 text-gray-800">{{ totalQuantity.toLocaleString() }}</p>
      <p class="text-sm text-green-600 mt-1">+8% from last month</p>
    </div>
    
    <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 text-left">
      <h3 class="text-md font-medium text-gray-500">Average Price</h3>
      <p class="text-3xl font-bold mt-2 text-gray-800">${{ averagePrice.toFixed(2) }}</p>
      <p class="text-sm text-red-600 mt-1">-2% from last month</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  totalSales: Number,
  totalQuantity: Number,
  averagePrice: Number
})
</script>
