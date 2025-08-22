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
      <StatsCard title="Total Staff" :value="staffStore.totalStaff" 
      :change="staffStore.smoothChangeText" icon="users" bg="bg-blue-600" />

      <StatsCard 
        :title="texts.monthlyExpenses.title" 
        :value="totalExpenseFormatted"
        :change="texts.monthlyExpenses.change" 
        icon="dollar" 
        bg="bg-red-500" 
      />

      <StatsCard :title="'Inventory Items'" :value="store.materials.length"
        :change="store.lowStockCount + ' Low Stock Alerts'" icon="box" bg="bg-green-600" />

      <!-- StatsCard reusing the same value -->
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
        icon="credit-card" bg="bg-white" 
        textColor="text-green-700" 
      />

      <StatsCard 
        title="Active Borrows" 
        :value="borrowStore.activeBorrows" 
        desc="Materials currently borrowed by staff"
        icon="archive" 
        bg="bg-white" 
        textColor="text-purple-700" 
      />

      <StatsCard 
        title="Maintenance Costs"
        :value=" totalMaintenanceCost"
        desc="Total equipment maintenance expenses"
        icon="settings" 
        bg="bg-white" 
        textColor="text-orange-700" />
    </div>

    <!-- Bottom Section -->
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
import { useStoreStaff } from '@/stores/staffStore'
import LowStockAlerts from '@/components/dashboard/LowStockAlerts.vue'
import { useSalesStore } from '@/stores/sale'
import { useBorrowStore } from '@/stores/borrowing'
import { useMaterialStore } from '@/stores/overmaterial'
import { useMaintenanceStore } from '@/stores/maintenances';


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

// Shared computed value for both cards
const totalIncomeFormatted = computed(() => formatCurrency(saleStore.totalIncome))
const totalExpenseFormatted = computed(() => formatCurrency(materialStore.totalExpenses))

const borrowStore = useBorrowStore()
onMounted(() => {
  borrowStore.fetchBorrowReports()
})

const maintenanceStore = useMaintenanceStore();

// Fetch maintenance data when component mounts
onMounted(() => {
  maintenanceStore.fetchMaintenances();
});

// Compute total maintenance cost dynamically
const totalMaintenanceCost = computed(() => {
  const sum = maintenanceStore.maintenances.reduce(
    (total, m) => total + Number(m.cost || 0),
    0
  );
  return sum.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
});


</script>
