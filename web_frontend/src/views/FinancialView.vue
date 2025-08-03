
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
              @click="setActiveTab('overview')"
              :class="activeTab === 'overview' ? 'border-b-2 border-green-500 text-green-600' : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              class="py-2 px-1 text-sm font-medium"
            >
              {{ $t('financial.tabs.overview') }}
            </button>
            <button
              @click="setActiveTab('income')"
              :class="activeTab === 'income' ? 'border-b-2 border-green-500 text-green-600' : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              class="py-2 px-1 text-sm font-medium"
            >
              {{ $t('financial.tabs.income') }}
            </button>
            <button
              @click="setActiveTab('expenses')"
              :class="activeTab === 'expenses' ? 'border-b-2 border-green-500 text-green-600' : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              class="py-2 px-1 text-sm font-medium"
            >
              {{ $t('financial.tabs.expenses') }}
            </button>
            <button
              @click="setActiveTab('reports')"
              :class="activeTab === 'reports' ? 'border-b-2 border-green-500 text-green-600' : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              class="py-2 px-1 text-sm font-medium"
            >
              {{ $t('financial.tabs.reports') }}
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
import { ref, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import OverViewView from '../components/financial/OverViewView.vue'
import IncomeView from '../components/financial/IncomeView.vue'
import ExpenseView from '../components/financial/ExpenseView.vue'
import ReportView from '../components/financial/ReportView.vue'

const { t: $t } = useI18n()
const activeTab = ref('overview')

const setActiveTab = async (tab) => {
  activeTab.value = tab
  await nextTick()
}
</script>
