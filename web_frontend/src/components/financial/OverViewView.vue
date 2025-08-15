<template>
  <div>
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <CardOver
          title="Total Income"
          :value="`$${saleStore.totalIncome}`"
          change="+12.5% from last month"
          :icon="TrendingUp"
          iconColor="text-green-600"
          iconBg="bg-green-100"
          changeColor="text-green-600"
        />
        <CardOver
          title="Total Expenses"
          :value="`$${materialStore.totalExpenses}`"
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
          title="Income by Name"
          :items="saleStore.productName "
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
import { onMounted } from 'vue'
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-vue-next'
import RecentTransactions from './Over/RecentTransactions.vue'
import CardOver from './Over/CardOver.vue'
import CategoryBreakdown from './Over/CategoryBreakdown.vue'
import { useMaterialStore } from '@/stores/overmaterial'
import { useSalesStore } from '@/stores/sale'

// Initialize stores
const materialStore = useMaterialStore()
const saleStore = useSalesStore()

// Fetch data safely on mounted
onMounted(async () => {
  if (!(materialStore.materials?.length)) {
    await materialStore.fetchMaterials()
  }
  if (!(saleStore.sales?.length)) {
    await saleStore.fetchSales()
  }
})

// Sample transactions data
const transactions = [
  {
    title: '50 pigs sold to local market',
    category: 'Pig Sales',
    date: '1/15/2024',
    amount: '+$15,000'
  }
]
</script>