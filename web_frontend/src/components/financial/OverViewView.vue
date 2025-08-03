
<template>
  <div>
    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-12">
      <p class="text-gray-500">{{ $t('financial.loading') }}</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-600">{{ $t('financial.error') }}</p>
    </div>

    <!-- Main Content -->
    <div v-else class="space-y-8">
      <!-- Metrics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Total Income -->
        <div class="bg-white p-6 rounded-lg shadow-sm border">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 mb-1">{{ $t('financial.overview.totalIncome') }}</p>
              <p class="text-3xl font-bold text-gray-900">{{ formatCurrency(summary.totalIncome) }}</p>
              <p class="text-sm text-green-600 mt-1">
                {{ formatPercentage(summary.incomeChange) }} {{ $t('financial.overview.fromLastMonth') }}
              </p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp class="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <!-- Total Expenses -->
        <div class="bg-white p-6 rounded-lg shadow-sm border">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 mb-1">{{ $t('financial.overview.totalExpenses') }}</p>
              <p class="text-3xl font-bold text-gray-900">{{ formatCurrency(summary.totalExpenses) }}</p>
              <p class="text-sm text-red-600 mt-1">
                {{ formatPercentage(summary.expensesChange) }} {{ $t('financial.overview.fromLastMonth') }}
              </p>
            </div>
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown class="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <!-- Net Profit -->
        <div class="bg-white p-6 rounded-lg shadow-sm border">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 mb-1">{{ $t('financial.overview.netProfit') }}</p>
              <p class="text-3xl font-bold text-gray-900">{{ formatCurrency(summary.netProfit) }}</p>
              <p class="text-sm text-gray-500 mt-1">{{ $t('financial.overview.thisMonth') }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign class="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <!-- Income and Expenses Breakdown -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Income by Category -->
        <div class="bg-white p-6 rounded-lg shadow-sm border">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('financial.overview.incomeByCategory') }}</h3>
          <div class="space-y-4">
            <div v-for="item in summary.incomeByCategory" :key="item.category" class="flex items-center justify-between">
              <span class="text-gray-600">{{ item.category || $t('staffCard.na') }}</span>
              <span class="font-semibold text-green-600">{{ formatCurrency(item.amount) }}</span>
            </div>
            <div v-if="!summary.incomeByCategory.length" class="text-gray-500">
              {{ $t('financial.overview.noIncomeData') }}
            </div>
          </div>
        </div>

        <!-- Expenses by Category -->
        <div class="bg-white p-6 rounded-lg shadow-sm border">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('financial.overview.expensesByCategory') }}</h3>
          <div class="space-y-4">
            <div v-for="item in summary.expensesByCategory" :key="item.category" class="flex items-center justify-between">
              <span class="text-gray-600">{{ item.category || $t('staffCard.na') }}</span>
              <span class="font-semibold text-red-600">{{ formatCurrency(item.amount) }}</span>
            </div>
            <div v-if="!summary.expensesByCategory.length" class="text-gray-500">
              {{ $t('financial.overview.noExpensesData') }}
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="bg-white rounded-lg shadow-sm border">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">{{ $t('financial.overview.recentTransactions') }}</h3>
            <router-link
              :to="{ name: 'Financial', query: { tab: 'income' } }"
              class="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              {{ $t('financial.overview.viewAll') }}
            </router-link>
          </div>
        </div>
        <div class="p-6 space-y-4">
          <div v-for="transaction in transactions" :key="transaction.id" class="flex items-center gap-4">
            <div
              class="w-10 h-10 rounded-lg flex items-center justify-center"
              :class="transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'"
            >
              <component
                :is="transaction.type === 'income' ? TrendingUp : TrendingDown"
                class="w-5 h-5"
                :class="transaction.type === 'income' ? 'text-green-600' : 'text-red-600'"
              />
            </div>
            <div class="flex-1">
              <p class="font-medium text-gray-900">{{ transaction.description || $t('staffCard.na') }}</p>
              <p class="text-sm text-gray-500">
                {{ transaction.category || $t('staffCard.na') }} • {{ formatDate(transaction.date) }}
              </p>
            </div>
            <div class="text-right">
              <p
                class="font-semibold"
                :class="transaction.type === 'income' ? 'text-green-600' : 'text-red-600'"
              >
                {{ transaction.type === 'income' ? '+' : '-' }}{{ formatCurrency(transaction.amount) }}
              </p>
            </div>
          </div>
          <div v-if="!transactions.length" class="text-gray-500">
            {{ $t('financial.overview.noTransactions') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-vue-next'
import API from '@/plugin/axios'

const { t: $t, locale } = useI18n()
const toast = useToast()
const router = useRouter()
const isLoading = ref(true)
const error = ref(null)
const summary = ref({
  totalIncome: 0,
  totalExpenses: 0,
  netProfit: 0,
  incomeChange: 0,
  expensesChange: 0,
  incomeByCategory: [],
  expensesByCategory: [],
})
const transactions = ref([])

const fetchSummary = async () => {
  try {
    isLoading.value = true
    const res = await API.get('/financial/summary')
    summary.value = {
      totalIncome: Number(res.data.totalIncome) || 0,
      totalExpenses: Number(res.data.totalExpenses) || 0,
      netProfit: Number(res.data.netProfit) || 0,
      incomeChange: Number(res.data.incomeChange) || 0,
      expensesChange: Number(res.data.expensesChange) || 0,
      incomeByCategory: res.data.incomeByCategory || [],
      expensesByCategory: res.data.expensesByCategory || [],
    }
  } catch (err) {
    error.value = err.message
    toast.error($t('financial.error'))
  } finally {
    await nextTick()
    isLoading.value = false
  }
}

const fetchTransactions = async () => {
  try {
    const res = await API.get('/financial/transactions', { params: { limit: 5 } })
    transactions.value = res.data.map(tx => ({
      id: tx.id || '',
      description: tx.description || $t('staffCard.na'),
      category: tx.category || $t('staffCard.na'),
      amount: Number(tx.amount) || 0,
      date: tx.date || $t('staffCard.na'),
      type: tx.type || 'income',
    }))
  } catch (err) {
    error.value = err.message
    toast.error($t('financial.error'))
  }
}

const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return $t('staffCard.na')
  return new Intl.NumberFormat(locale.value, {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

const formatPercentage = (value) => {
  if (!value && value !== 0) return '0%'
  return new Intl.NumberFormat(locale.value, {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100)
}

const formatDate = (dateString) => {
  if (!dateString || dateString === $t('staffCard.na')) return $t('staffCard.na')
  return new Intl.DateTimeFormat(locale.value, {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString))
}

onMounted(async () => {
  await Promise.all([fetchSummary(), fetchTransactions()])
})
</script>
