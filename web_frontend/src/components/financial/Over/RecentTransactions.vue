<!-- components/RecentTransactions.vue -->
<template>
  <div class="bg-white rounded-lg shadow-sm border">
    <div class="p-6 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        <button class="text-green-600 hover:text-green-700 text-sm font-medium">View All</button>
      </div>
    </div>
    <div class="p-6 space-y-4">
      <div v-for="(tx, index) in transactions" :key="index" class="flex items-center gap-4">
        <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <TrendingUp class="w-5 h-5 text-green-600" />
        </div>
        <div class="flex-1">
          <p class="font-medium text-gray-900">{{ tx.title }}</p>
          <p class="text-sm text-gray-500">{{ tx.category }} • {{ tx.date }}</p>
        </div>
        <div class="text-right">
          <p class="font-semibold text-green-600">{{ tx.amount }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TrendingUp } from 'lucide-vue-next'

defineProps({
  transactions: Array
})
</script>
