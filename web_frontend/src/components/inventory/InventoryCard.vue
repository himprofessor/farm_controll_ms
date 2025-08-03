```vue
<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div class="bg-white rounded-lg shadow-sm p-8 flex items-center justify-between">
      <div>
        <p class="text-gray-500 text-sm">{{ $t('inventory.totalItems') }}</p>
        <p class="text-3xl font-bold text-gray-900">{{ totalItems }}</p>
      </div>
      <PackageIcon class="w-10 h-10 text-blue-500" />
    </div>
    <div class="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
      <div>
        <p class="text-gray-500 text-sm">{{ $t('inventory.lowStockCount') }}</p>
        <p class="text-3xl font-bold text-red-500">{{ lowStockCount }}</p>
      </div>
      <AlertTriangleIcon class="w-10 h-10 text-red-500" />
    </div>
    <div class="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
      <div>
        <p class="text-gray-500 text-sm">{{ $t('inventory.totalValue') }}</p>
        <p class="text-3xl font-bold text-gray-900">{{ formatCurrency(totalValue) }}</p>
      </div>
      <LineChartIcon class="w-10 h-10 text-green-500" />
    </div>
    <div class="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
      <div>
        <p class="text-gray-500 text-sm">{{ $t('inventory.uniqueCategoriesCount') }}</p>
        <p class="text-3xl font-bold text-gray-900">{{ uniqueCategoriesCount }}</p>
      </div>
      <BoxesIcon class="w-10 h-10 text-purple-500" />
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { PackageIcon, AlertTriangleIcon, LineChartIcon, BoxesIcon } from 'lucide-vue-next'

const { t: $t } = useI18n()

defineProps({
  totalItems: Number,
  lowStockCount: Number,
  totalValue: Number,
  uniqueCategoriesCount: Number,
})

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}
</script>
```