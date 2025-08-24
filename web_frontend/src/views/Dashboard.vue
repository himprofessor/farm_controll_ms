<template>
  <div class="p-6 bg-gray-100 rounded-lg shadow">
    <!-- Language Toggle Button -->
    <div class="flex justify-end mb-4">
      <LanguageToggle />
    </div>

    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">{{ $t('dashboard.title') }}</h1>
      <p class="text-gray-600">{{ $t('dashboard.subtitle') }}</p>
    </div>

    <!-- Top Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      <StatsCard
        :title="$t('dashboard.totalStaff.title')"
        :value="staffStore.totalStaff"
        :change="`${$t('dashboard.totalStaff.change')}${staffStore.smoothChangeText ? ` ${$t('dashboard.totalStaff.changeSuffix')}` : ''}`"
        icon="users"
        bg="bg-blue-600"
      />

      <StatsCard
        :title="$t('dashboard.monthlyExpenses.title')"
        :value="totalExpenseFormatted"
        :change="$t('dashboard.monthlyExpenses.change')"
        icon="dollar"
        bg="bg-red-500"
      />

      <StatsCard
        :title="$t('dashboard.inventoryItems.title')"
        :value="store.materials.length"
        :change="`${store.lowStockCount} ${$t('dashboard.inventoryItems.change')}`"
        icon="box"
        bg="bg-green-600"
      />

      <StatsCard
        :title="$t('dashboard.monthlyRevenue.title')"
        :value="totalIncomeFormatted"
        :change="$t('dashboard.monthlyRevenue.change')"
        icon="trending"
        bg="bg-purple-600"
      />
    </div>

    <!-- Bottom Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatsCard
        :title="$t('dashboard.salariesPaid.title')"
        :value="$t('dashboard.salariesPaid.value')"
        :desc="$t('dashboard.salariesPaid.desc')"
        icon="credit-card"
        bg="bg-white"
        textColor="text-green-700"
      />

      <StatsCard
        :title="$t('dashboard.activeBorrows.title')"
        :value="borrowStore.activeBorrows"
        :desc="$t('dashboard.activeBorrows.desc')"
        icon="archive"
        bg="bg-white"
        textColor="text-purple-700"
      />

      <StatsCard
        :title="$t('dashboard.maintenanceCosts.title')"
        :value="$t('dashboard.maintenanceCosts.value')"
        :desc="$t('dashboard.maintenanceCosts.desc')"
        icon="settings"
        bg="bg-white"
        textColor="text-orange-700"
      />
    </div>

    <!-- Bottom Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
      <RecentActivities :title="$t('dashboard.recentActivities')" :items="recentActivitiesItems" :key="localeKey" />
      <LowStockAlerts :title="$t('dashboard.lowStockAlerts')" :items="lowStockAlertsItems" :key="localeKey" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import StatsCard from '@/components/dashboard/StatsCard.vue'
import RecentActivities from '@/components/dashboard/RecentActivities.vue'
import LowStockAlerts from '@/components/dashboard/LowStockAlerts.vue'
import LanguageToggle from '@/components/language/LanguageToggle.vue'
import { useMaterialsStore } from '@/stores/material'
import { useStoreStaff } from '@/stores/staffStore'
import { useSalesStore } from '@/stores/sale'
import { useBorrowStore } from '@/stores/borrowing'
import { useMaterialStore } from '@/stores/overmaterial'
import { useMaintenanceStore } from '@/stores/maintenances'

const { t, locale } = useI18n()

const store = useMaterialsStore()
onMounted(() => {
  store.fetchMaterials()
})

const staffStore = useStoreStaff()
onMounted(() => {
  staffStore.fetchStaff()
})

const saleStore = useSalesStore()
const materialStore = useMaterialStore()

const formatCurrency = (value) => `$${(value || 0).toLocaleString()}`

const totalIncomeFormatted = computed(() => formatCurrency(saleStore.totalIncome))
const totalExpenseFormatted = computed(() => formatCurrency(materialStore.totalExpenses))

const borrowStore = useBorrowStore()
onMounted(() => {
  borrowStore.fetchBorrowReports()
})

const recentActivitiesItems = computed(() => [
  t('dashboard.recentActivitiesItems[0]'),
  t('dashboard.recentActivitiesItems[1]')
])

const lowStockAlertsItems = computed(() => [
  t('dashboard.lowStockAlertsItems[0]'),
  t('dashboard.lowStockAlertsItems[1]')
])

const localeKey = computed(() => locale.value)
</script>