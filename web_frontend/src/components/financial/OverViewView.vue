<template>
  <div>
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <CardOver
        title="Total Income"
        value="$24,300"
        change="+12.5% from last month"
        :icon="TrendingUp"
        iconColor="text-green-600"
        iconBg="bg-green-100"
        changeColor="text-green-600"
      />
      <CardOver
        title="Total Expenses"
        :value="`$${materialStore.totalExpenses.toFixed(2)}`"
        change="+5.2% from last month"
        :icon="TrendingDown"
        iconColor="text-red-600"
        iconBg="bg-red-100"
        changeColor="text-red-600"
      />
      <CardOver
        title="Net Profit"
        value="$7,600"
        change="This month"
        :icon="DollarSign"
        iconColor="text-green-600"
        iconBg="bg-green-100"
        changeColor="text-gray-500"
      />
    </div>

    <!-- Category Breakdown -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <CategoryBreakdown
        title="Income by Category"
        :items="[
          { label: 'Pig Sales', value: '$23,500' },
          { label: 'Manure Sales', value: '$800' }
        ]"
        valueColor="text-green-600"
      />
      <CategoryBreakdown
      title="Expenses by Category"
      :items="materialStore.categorySummary"
      valueColor="text-red-600"
    />
    </div>

    <!-- Transactions -->
    <RecentTransactions :transactions="transactions" />
  </div>
</template>

<script setup>
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-vue-next'
import RecentTransactions from './Over/RecentTransactions.vue'
import CardOver from './Over/CardOver.vue'
import { onMounted } from 'vue'
import CategoryBreakdown from './Over/CategoryBreakdown.vue'
import { useMaterialStore } from '@/stores/overmaterial' 

const materialStore = useMaterialStore()

onMounted(async () => {
  if (!materialStore.materials.length) {
    await materialStore.fetchMaterials()
  }
})
const transactions = [
  {
    title: '50 pigs sold to local market',
    category: 'Pig Sales',
    date: '1/15/2024',
    amount: '+$15,000'
  }
]
</script>
