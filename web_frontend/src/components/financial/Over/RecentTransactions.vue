<template>
  <div class="bg-white rounded-lg shadow-sm border">
    <div class="p-6 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">{{ $t('financial.recentTransactions') }}</h3>
        <button class="text-green-600 hover:text-green-700 text-sm font-medium">{{ $t('financial.viewAll') }}</button>
      </div>
    </div>
    <div class="p-6 space-y-4">
      <div 
        v-for="(tx, index) in transactionsup" 
        :key="index" 
        class="flex items-center gap-4"
      >
        <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <TrendingUp class="w-5 h-5 text-green-600" />
        </div>
        <div class="flex-1">
          <p class="font-medium text-gray-900">{{ tx.description }}</p>
          <p class="text-sm text-gray-500">{{ tx.product_name }} • {{ tx.sale_date }}</p>
        </div>
        <div class="text-right">
          <p class="font-semibold text-green-600">+${{ Number(tx.total_price).toLocaleString() }}</p>
        </div>
      </div>
      <div 
        v-for="(td, index) in transactionsdown" 
        :key="index" 
        class="flex items-center gap-4"
      >
        <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
          <TrendingDown class="w-5 h-5 text-red-600" />
        </div>
        <div class="flex-1">
          <p class="font-medium text-gray-900">{{ td.supplier }}</p>
          <p class="text-sm text-gray-500">{{ td.name }} • {{ td.lastUpdated }}</p>
        </div>
        <div class="text-right">
          <p class="font-semibold text-red-600">+${{ Number(td.value).toLocaleString() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TrendingDown, TrendingUp } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'
import API from '@/plugin/axios'

const transactionsup = ref([])
const transactionsdown = ref([])

onMounted(async () => {
  try {
    const resSales = await API.get('/sales')
    transactionsup.value = resSales.data
  } catch (error) {
    console.error('Error fetching sales transactions:', error)
  }
  try {
    const resMaterials = await API.get('/materials')
    transactionsdown.value = resMaterials.data
  } catch (error) {
    console.error('Error fetching material transactions:', error)
  }
})
</script>