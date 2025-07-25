<template>
  <div class="p-6 bg-gray-100 rounded-lg shadow">
    <!-- Language Toggle Button -->
    <div class="flex justify-end mb-4">
      <button
        @click="toggleLanguage"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {{ currentLanguage === 'en' ? 'ភាសាខ្មែរ' : 'English' }}
      </button>
    </div>

    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">{{ texts.dashboardTitle }}</h1>
      <p class="text-gray-600">{{ texts.dashboardSubtitle }}</p>
    </div>

    <!-- Stats Cards Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        :title="texts.totalStaff.title"
        :value="texts.totalStaff.value"
        :change="texts.totalStaff.change"
        icon="users"
        color="blue"
      />
      <StatsCard
        :title="texts.monthlyExpenses.title"
        :value="texts.monthlyExpenses.value"
        :change="texts.monthlyExpenses.change"
        icon="dollar"
        color="red"
      />
      <StatsCard
        :title="texts.inventoryItems.title"
        :value="texts.inventoryItems.value"
        :change="texts.inventoryItems.change"
        icon="box"
        color="green"
      />
      <StatsCard
        :title="texts.monthlyRevenue.title"
        :value="texts.monthlyRevenue.value"
        :change="texts.monthlyRevenue.change"
        icon="trending"
        color="purple"
      />
    </div>

    <!-- Bottom Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <RecentActivities />
      <LowStockAlerts />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import StatsCard from '@/components/dashboard/StatsCard.vue'
import RecentActivities from '@/components/dashboard/RecentActivities.vue'
import LowStockAlerts from '@/components/dashboard/LowStockAlerts.vue'

// Current language state: 'en' or 'kh'
const currentLanguage = ref('en')

// Text content for English and Khmer
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
      title: "ធាតុក្នុងសារពើភណ្ឌ",
      value: "156",
      change: "12 ការជូនដំណឹងស្តុកតិច"
    },
    monthlyRevenue: {
      title: "ប្រាក់ចំណូលប្រចាំខែ",
      value: "$18,750",
      change: "+8.1% ពីខែមុន"
    }
  }
}

// Reactive computed texts for current language
const texts = computed(() => textContent[currentLanguage.value])

// Toggle language between English and Khmer
function toggleLanguage() {
  currentLanguage.value = currentLanguage.value === 'en' ? 'kh' : 'en'
}
</script>
