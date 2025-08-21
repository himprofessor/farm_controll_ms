<template>
  <div class="p-6 bg-gray-100 rounded-lg shadow">
    <!-- Language Toggle Button -->
    <div class="flex justify-end mb-4">
      <button @click="toggleLanguage" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        {{ currentLanguage === 'en' ? 'ភាសាខ្មែរ' : 'English' }}
      </button>
    </div>

    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">{{ texts.dashboardTitle }}</h1>
      <p class="text-gray-600">{{ texts.dashboardSubtitle }}</p>
    </div>

    <!-- Top Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      <StatsCard 
        :title="texts.totalStaff.title" 
        :value="staffStore.totalStaff" 
        :change="`${texts.totalStaff.change}${staffStore.smoothChangeText ? ` ${texts.totalStaff.changeSuffix}` : ''}`" 
        icon="users" 
        bg="bg-blue-600" 
      />

      <StatsCard 
        :title="texts.monthlyExpenses.title" 
        :value="totalExpenseFormatted"
        :change="texts.monthlyExpenses.change" 
        icon="dollar" 
        bg="bg-red-500" 
      />

      <StatsCard 
        :title="texts.inventoryItems.title" 
        :value="store.materials.length"
        :change="`${store.lowStockCount} ${texts.inventoryItems.change}`" 
        icon="box" 
        bg="bg-green-600" 
      />

      <StatsCard
        :title="texts.monthlyRevenue.title"
        :value="totalIncomeFormatted"
        :change="texts.monthlyRevenue.change"
        icon="trending"
        bg="bg-purple-600"
      />
    </div>

    <!-- Bottom Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatsCard 
        :title="texts.salariesPaid.title" 
        :value="texts.salariesPaid.value" 
        :desc="texts.salariesPaid.desc"
        icon="credit-card" 
        bg="bg-white" 
        textColor="text-green-700" 
      />

      <StatsCard 
        :title="texts.activeBorrows.title" 
        :value="borrowStore.activeBorrows" 
        :desc="texts.activeBorrows.desc"
        icon="archive" 
        bg="bg-white" 
        textColor="text-purple-700" 
      />

      <StatsCard 
        :title="texts.maintenanceCosts.title" 
        :value="texts.maintenanceCosts.value"
        :desc="texts.maintenanceCosts.desc" 
        icon="settings" 
        bg="bg-white" 
        textColor="text-orange-700" 
      />
    </div>

    <!-- Bottom Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
      <RecentActivities :title="texts.recentActivities" :items="texts.recentActivitiesItems" />
      <LowStockAlerts :title="texts.lowStockAlerts" :items="texts.lowStockAlertsItems" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import StatsCard from '@/components/dashboard/StatsCard.vue'
import RecentActivities from '@/components/dashboard/RecentActivities.vue'
import { useMaterialsStore } from '@/stores/material'
import { useStoreStaff } from '@/stores/staffStore'
import LowStockAlerts from '@/components/dashboard/LowStockAlerts.vue'
import { useSalesStore } from '@/stores/sale'
import { useBorrowStore } from '@/stores/borrowing'
import { useMaterialStore } from '@/stores/overmaterial'

// Language state
const currentLanguage = ref('en')

// Text content
const textContent = {
  en: {
    dashboardTitle: "Dashboard",
    dashboardSubtitle: "Welcome back! Here's what's happening at your farm today.",
    totalStaff: {
      title: "Total Staff",
      change: "+3",
      changeSuffix: "this month"
    },
    monthlyExpenses: {
      title: "Monthly Expenses",
      change: "+5.2% from last month"
    },
    inventoryItems: {
      title: "Inventory Items",
      change: "Low Stock Alerts"
    },
    monthlyRevenue: {
      title: "Monthly Revenue",
      change: "+8.1% from last month"
    },
    salariesPaid: {
      title: "Salaries Paid",
      value: "$0.00",
      desc: "Total lifetime payments to staff"
    },
    activeBorrows: {
      title: "Active Borrows",
      desc: "Materials currently borrowed by staff"
    },
    maintenanceCosts: {
      title: "Maintenance Costs",
      value: "$0.00",
      desc: "Total equipment maintenance expenses"
    },
    recentActivities: "Recent Activities",
    recentActivitiesItems: ["Staff added: John Doe - 2025-08-20", "Inventory updated - 2025-08-19"],
    lowStockAlerts: "Low Stock Alerts",
    lowStockAlertsItems: ["Fertilizer - 5 remaining", "Seeds - 2 remaining"]
  },
  kh: {
    dashboardTitle: "ផ្ទាំងគ្រប់គ្រង",
    dashboardSubtitle: "សូមស្វាគមន៍វិញ! នេះជាអ្វីដែលកំពុងកើតឡើងនៅក្នុងចម្ការរបស់អ្នកថ្ងៃនេះ។",
    totalStaff: {
      title: "បុគ្គលិកសរុប",
      change: "+3",
      changeSuffix: "ក្នុងខែនេះ"
    },
    monthlyExpenses: {
      title: "ចំណាយប្រចាំខែ",
      change: "+5.2% ពីខែមុន"
    },
    inventoryItems: {
      title: "ស្តុកទំនិញ",
      change: "ការជូនដំណឹងស្តុកតិច"
    },
    monthlyRevenue: {
      title: "ប្រាក់ចំណូលប្រចាំខែ",
      change: "+8.1% ពីខែមុន"
    },
    salariesPaid: {
      title: "ប្រាក់ខែបានបង់",
      value: "$0.00",
      desc: "ការទូទាត់សរុបចំពោះបុគ្គលិក"
    },
    activeBorrows: {
      title: "ការខ្ចីសកម្ម",
      desc: "សម្ភារៈដែលកំពុងខ្ចី"
    },
    maintenanceCosts: {
      title: "ថ្លៃថែទាំ",
      value: "$0.00",
      desc: "ចំណាយថែទាំឧបករណ៍សរុប"
    },
    recentActivities: "សកម្មភាពថ្មីៗ",
    recentActivitiesItems: ["បុគ្គលិកបន្ថែម: John Doe - 2025-08-20", "ការធ្វើបច្ចុប្បន្នភាពស្តុក - 2025-08-19"],
    lowStockAlerts: "ការជូនដំណឹងស្តុកតិច",
    lowStockAlertsItems: ["ជី - 5 នៅសល់", "គ្រាប់ពូជ - 2 នៅសល់"]
  }
}

const texts = computed(() => textContent[currentLanguage.value])
function toggleLanguage() {
  currentLanguage.value = currentLanguage.value === 'en' ? 'kh' : 'en'
}

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

const formatCurrency = (value) => {
  return `$${(value || 0).toLocaleString()}`
}

const totalIncomeFormatted = computed(() => formatCurrency(saleStore.totalIncome))
const totalExpenseFormatted = computed(() => formatCurrency(materialStore.totalExpenses))

const borrowStore = useBorrowStore()
onMounted(() => {
  borrowStore.fetchBorrowReports()
})
</script>