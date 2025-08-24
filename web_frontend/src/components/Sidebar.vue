<template>
  <div class="w-64 h-screen bg-white shadow-lg flex flex-col fixed top-0 left-0 z-50">
    <!-- Logo -->
    <div class="bg-green-500 text-white p-4 flex items-center space-x-3">
      <div class="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center">
        <span class="text-lg font-bold">π</span>
      </div>
      <span class="text-lg font-semibold">{{ $t('sidebar.logo') }}</span>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
      <SidebarItem v-for="item in navItems" :key="item.path" :item="item" />
    </nav>

    <!-- Footer: Logout + Language -->
    <div class="p-4 border-t flex items-center justify-between mb-8">
      <!-- Logout -->
      <button
        @click="handleLogout"
        class="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-500 transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span class="text-sm font-medium">{{ $t('sidebar.logout') }}</span>
      </button>

      <!-- Language Toggle -->
      <LanguageToggle />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import SidebarItem from './SidebarItem.vue'
import LanguageToggle from '@/components/language/LanguageToggle.vue'
import { useAuthStore } from '@/stores/authStore'
import { useI18n } from 'vue-i18n'

const authStore = useAuthStore()
const router = useRouter()
const { t } = useI18n()

const handleLogout = () => {
  authStore.logout()
  router.push('/') // redirects to HomeScreen
}

const navItems = [
  {
    label: 'sidebar.navDashboard',
    path: '/dashboard',
    icon: 'dashboard',
    iconColor: 'text-sky-500',
  },
  {
    label: 'sidebar.navStaffManagement',
    path: '/staff',
    icon: 'group',
    iconColor: 'text-blue-500',
  },
  {
    label: 'sidebar.navSalaryManagement',
    path: '/salary',
    icon: 'monetization_on',
    iconColor: 'text-yellow-500',
  },
  {
    label: 'sidebar.navInventory',
    path: '/inventory',
    icon: 'inventory_2',
    iconColor: 'text-purple-500',
  },
  {
    label: 'sidebar.navFinancial',
    path: '/financial',
    icon: 'account_balance_wallet',
    iconColor: 'text-red-500',
  }
]
</script>