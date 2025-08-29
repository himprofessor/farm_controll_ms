<template>
  <div class="bg-gray-100 rounded-lg shadow">
    <!-- Main Content -->
    <div class="flex-1 p-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ $t('financial.title') }}</h1>
        <p class="text-gray-600">{{ $t('financial.subtitle') }}</p>
      </div>

      <!-- Tabs -->
      <div class="mb-8">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="setActiveTab(tab.id)"
              :class="[
                activeTab === tab.id
                  ? 'border-b-2 border-green-500 text-green-600'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'py-2 px-1 text-sm font-medium'
              ]"
            >
              {{ $t(`financial.${tab.id}`) }}
            </button>
          </nav>
        </div>
      </div>

      <!-- Tab Content -->
      <OverViewView v-if="activeTab === 'overview'" />
      <IncomeView v-if="activeTab === 'income'" />
      <ExpenseView v-if="activeTab === 'expenses'" />
      <ReportView v-if="activeTab === 'reports'" />
      <SalesView v-if="activeTab === 'sales'" />
      <MaintenanceView v-if="activeTab === 'maintenance'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import OverViewView from '@/components/financial/OverViewView.vue'
import IncomeView from '@/components/financial/IncomeView.vue'
import ExpenseView from '@/components/financial/ExpenseView.vue'
import ReportView from '@/components/financial/ReportView.vue'
import SalesView from '@/components/financial/SalesView.vue'
import MaintenanceView from '@/components/financial/MaintenanceView.vue'

const tabs = ref([
  { id: 'overview', name: 'Overview' },
  { id: 'income', name: 'Income' },
  { id: 'expenses', name: 'Expenses' },
  { id: 'maintenance', name: 'Maintenance' },
  { id: 'sales', name: 'Sales' },
  { id: 'reports', name: 'Reports' }
])

const activeTab = ref('overview')

const setActiveTab = (tab) => {
  activeTab.value = tab
}
</script>