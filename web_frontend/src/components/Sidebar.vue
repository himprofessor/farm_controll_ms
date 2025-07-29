<template>
  <div class="w-64 h-screen bg-white shadow-lg flex flex-col fixed top-0 left-0 z-50">
    <!-- Logo -->
    <div class="bg-green-500 text-white p-4 flex items-center space-x-3">
      <div class="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center">
        <span class="text-lg font-bold">π</span>
      </div>
      <span class="text-lg font-semibold">Farm Control</span>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
      <SidebarItem v-for="item in navItems" :key="item.label" :item="item" />
    </nav>

    <!-- Language Toggle -->
    <div class="p-4 border-t">
      <LanguageToggle />
    </div>
  </div>
</template>

<script setup>
import SidebarItem from './SidebarItem.vue'
import LanguageToggle from '@/components/language/LanguageToggle.vue'

const navItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'dashboard',
    iconColor: 'text-sky-500',
  },
  {
    label: 'Staff Management',
    path: '/staff',
    icon: 'group',
    iconColor: 'text-blue-500',
  },
  {
    label: 'Salary Management',
    path: '/salary',
    icon: 'monetization_on',
    iconColor: 'text-yellow-500',
  },
  {
    label: 'Inventory',
    path: '/inventory',
    icon: 'inventory_2',
    iconColor: 'text-purple-500',
  },
  {
    label: 'Financial',
    path: '/financial',
    icon: 'account_balance_wallet',
    iconColor: 'text-red-500',
  }
]
</script>
