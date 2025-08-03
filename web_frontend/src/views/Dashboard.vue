<template>
  <div class="p-4 sm:p-6 md:p-8 bg-gray-100 rounded-lg shadow max-w-screen-xl mx-auto">
    <!-- Header -->
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">{{ $t('dashboard.dashboardTitle') }}</h1>
      <p class="text-sm sm:text-base text-gray-600">{{ $t('dashboard.dashboardSubtitle') }}</p>
    </div>

    <!-- Top Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      <StatsCard
        :title="$t('dashboard.totalStaff.title')"
        :value="$t('dashboard.totalStaff.value')"
        :change="$t('dashboard.totalStaff.change')"
        icon="users"
        bg="bg-blue-600"
      />
      <StatsCard
        :title="$t('dashboard.monthlyExpenses.title')"
        :value="$t('dashboard.monthlyExpenses.value')"
        :change="$t('dashboard.monthlyExpenses.change')"
        icon="dollar"
        bg="bg-red-500"
      />
      <StatsCard
        :title="$t('dashboard.inventoryItems.title')"
        :value="$t('dashboard.inventoryItems.value')"
        :change="$t('dashboard.inventoryItems.change')"
        icon="box"
        bg="bg-green-600"
      />
      :title="'Inventory Items'"
      :value="store.materials.length"
      :change="store.lowStockCount + ' Low Stock Alerts'"
      icon="box"
      bg="bg-green-600"
    />
      <StatsCard
        :title="$t('dashboard.monthlyRevenue.title')"
        :value="$t('dashboard.monthlyRevenue.value')"
        :change="$t('dashboard.monthlyRevenue.change')"
        icon="trending"
        bg="bg-purple-600"
      />
    </div>

    <!-- Bottom Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        :value="$t('dashboard.activeBorrows.value')"
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

    <!-- Final Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
      <RecentActivities />
      <LowStockAlerts />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import StatsCard from '@/components/dashboard/StatsCard.vue'
import RecentActivities from '@/components/dashboard/RecentActivities.vue'
import { useMaterialsStore } from '@/stores/material'
import LowStockAlerts from '@/components/dashboard/LowStockAlerts.vue'

// Language state
const currentLanguage = ref('en')

// Text content
const textContent = {
  en: {
    dashboardTitle: "Dashboard",
    dashboardSubtitle: "Welcome back! Here's what's happening at your farm today.",
    totalStaff: {
      title: "Total Staff",
      value: "24",
      change: "+2 this month"
    },
    monthlyExpenses: {
      title: "Monthly Expenses",
      value: "$12,450",
      change: "+5.2% from last month"
    },
    inventoryItems: {
      title: "Inventory Items",
      value: "156",
      change: "12 low stock alerts"
    },
    monthlyRevenue: {
      title: "Monthly Revenue",
      value: "$18,750",
      change: "+8.1% from last month"
    },
    salariesPaid: {
      title: "Salaries Paid",
      value: "$0.00",
      desc: "Total lifetime payments to staff"
    },
    activeBorrows: {
      title: "Active Borrows",
      value: "0",
      desc: "Materials currently borrowed by staff"
    },
    maintenanceCosts: {
      title: "Maintenance Costs",
      value: "$0.00",
      desc: "Total equipment maintenance expenses"
    }
  },
  kh: {
    dashboardTitle: "ផ្ទាំងគ្រប់គ្រង",
    dashboardSubtitle: "សូមស្វាគមន៍វិញ! នេះជាអ្វីដែលកំពុងកើតឡើងនៅក្នុងចម្ការរបស់អ្នកថ្ងៃនេះ។",
    totalStaff: {
      title: "បុគ្គលិកសរុប",
      value: "២៤",
      change: "+២ ក្នុងខែនេះ"
    },
    monthlyExpenses: {
      title: "ចំណាយប្រចាំខែ",
      value: "$12,450",
      change: "+5.2% ពីខែមុន"
    },
    inventoryItems: {
      title: "ស្តុកទំនិញ",
      value: "156",
      change: "12 ការជូនដំណឹងស្តុកតិច"
    },
    monthlyRevenue: {
      title: "ប្រាក់ចំណូលប្រចាំខែ",
      value: "$18,750",
      change: "+8.1% ពីខែមុន"
    },
    salariesPaid: {
      title: "ប្រាក់ខែបានបង់",
      value: "$0.00",
      desc: "ការទូទាត់សរុបចំពោះបុគ្គលិក"
    },
    activeBorrows: {
      title: "ការខ្ចីសកម្ម",
      value: "០",
      desc: "សម្ភារៈដែលកំពុងខ្ចី"
    },
    maintenanceCosts: {
      title: "ថ្លៃថែទាំ",
      value: "$0.00",
      desc: "ចំណាយថែទាំឧបករណ៍សរុប"
    }
  }
}

const texts = computed(() => textContent[currentLanguage.value])
function toggleLanguage() {
  currentLanguage.value = currentLanguage.value === 'en' ? 'kh' : 'en'
}

const store = useMaterialsStore()

onMounted(() => {
  store.fetchMaterials()
});
</script>
