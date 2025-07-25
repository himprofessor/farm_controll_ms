<template>
  <div>
    <!-- Metrics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Total Income -->
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 mb-1">Total Income</p>
            <p class="text-3xl font-bold text-gray-900">$24,300</p>
            <p class="text-sm text-green-600 mt-1">+12.5% from last month</p>
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
            <p class="text-sm font-medium text-gray-600 mb-1">Total Expenses</p>
            <p class="text-3xl font-bold text-gray-900">$16,700</p>
            <p class="text-sm text-red-600 mt-1">+5.2% from last month</p>
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
            <p class="text-sm font-medium text-gray-600 mb-1">Net Profit</p>
            <p class="text-3xl font-bold text-gray-900">$7,600</p>
            <p class="text-sm text-gray-500 mt-1">This month</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <DollarSign class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Income and Expenses Breakdown -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Income by Category -->
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Income by Category</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-600">Pig Sales</span>
            <span class="font-semibold text-green-600">$23,500</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-600">Manure Sales</span>
            <span class="font-semibold text-green-600">$800</span>
          </div>
        </div>
      </div>
      
      <!-- Expenses by Category -->
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Expenses by Category</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-600">Feed</span>
            <span class="font-semibold text-red-600">$3,500</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-600">Salaries</span>
            <span class="font-semibold text-red-600">$12,000</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-600">Utilities</span>
            <span class="font-semibold text-red-600">$1,200</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Recent Transactions -->
    <div class="bg-white rounded-lg shadow-sm border">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <button class="text-green-600 hover:text-green-700 text-sm font-medium">
            View All
          </button>
        </div>
      </div>
      <div class="p-6">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <TrendingUp class="w-5 h-5 text-green-600" />
          </div>
          <div class="flex-1">
            <p class="font-medium text-gray-900">50 pigs sold to local market</p>
            <p class="text-sm text-gray-500">Pig Sales • 1/15/2024</p>
          </div>
          <div class="text-right">
            <p class="font-semibold text-green-600">+$15,000</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-vue-next'
</script>