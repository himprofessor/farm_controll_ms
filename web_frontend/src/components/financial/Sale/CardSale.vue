<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 text-left">
      <h3 class="text-md font-medium text-gray-500">{{ $t('sales.totalSales') }}</h3>
      <p class="text-3xl font-bold mt-2 text-gray-800">
        ${{ (totalSales ?? 0).toLocaleString() }}
      </p>
      <p class="text-sm text-green-600 mt-1">{{ $t('sales.changeFromLastMonth', { percentage: '+12%' }) }}</p>
    </div>

    <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 text-left">
      <h3 class="text-md font-medium text-gray-500">{{ $t('sales.totalQuantitySold') }}</h3>
      <p class="text-3xl font-bold mt-2 text-gray-800">
        {{ (totalQuantity ?? 0).toLocaleString() }}
      </p>
      <p class="text-sm text-green-600 mt-1">{{ $t('sales.changeFromLastMonth', { percentage: '+8%' }) }}</p>
    </div>

    <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 text-left">
      <h3 class="text-md font-medium text-gray-500">{{ $t('sales.averagePrice') }}</h3>
      <p class="text-3xl font-bold mt-2 text-gray-800">
        ${{ (averagePrice ?? 0).toFixed(2) }}
      </p>
      <p class="text-sm text-red-600 mt-1">{{ $t('sales.changeFromLastMonth', { percentage: '-2%' }) }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  totalSales: { type: Number, default: 0 },
  totalQuantity: { type: Number, default: 0 },
  averagePrice: { type: Number, default: 0 }
})
</script>