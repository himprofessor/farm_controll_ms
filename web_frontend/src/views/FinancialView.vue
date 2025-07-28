<template>
  <div class=" bg-gray-100 rounded-lg shadow">
    <!-- Main Content -->
    <div class="flex-1 p-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Financial Management</h1>
        <p class="text-gray-600">Track income, expenses, and financial performance</p>
      </div>

      <!-- Tabs -->
      <div class="mb-8">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button @click="setActiveTab('overview')"
              :class="activeTab === 'overview' ? 'border-b-2 border-green-500 text-green-600' : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              class="py-2 px-1 text-sm font-medium">
              Overview
            </button>
            <button @click="setActiveTab('income')"
              :class="activeTab === 'income' ? 'border-b-2 border-green-500 text-green-600' : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              class="py-2 px-1 text-sm font-medium">
              Income
            </button>
            <button @click="setActiveTab('expenses')"
              :class="activeTab === 'expenses' ? 'border-b-2 border-green-500 text-green-600' : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              class="py-2 px-1 text-sm font-medium">
              Expenses
            </button>
            <button @click="setActiveTab('reports')"
              :class="activeTab === 'reports' ? 'border-b-2 border-green-500 text-green-600' : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              class="py-2 px-1 text-sm font-medium">
              Reports
            </button>
          </nav>
        </div>
      </div>

      <!-- Tab Content -->
      <OverViewView v-if="activeTab === 'overview'" />
      <IncomeView v-if="activeTab === 'income'" />
      <ExpenseView v-if="activeTab === 'expenses'" />
      <ReportView v-if="activeTab === 'reports'" />
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import OverViewView from '../components/financial/OverViewView.vue'
import IncomeView from '../components/financial/IncomeView.vue'
import ExpenseView from '../components/financial/ExpenseView.vue'
import ReportView from '../components/financial/ReportView.vue'

const activeTab = ref('overview')

const setActiveTab = (tab) => {
  activeTab.value = tab
}
</script>