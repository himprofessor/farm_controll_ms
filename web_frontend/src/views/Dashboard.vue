<template>
  <div class="p-6 bg-gray-100 rounded-lg shadow">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-600">Welcome back! Here's what's happening at your farm today.</p>
    </div>

    <!-- Stats Cards Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Total Staff"
        value="24"
        change="+2 this month"
        icon="users"
        color="blue"
      />
      <StatsCard
        title="Monthly Expenses"
        value="$12,450"
        change="+5.2% from last month"
        icon="dollar"
        color="red"
      />
      <StatsCard
        title="Inventory Items"
        value="156"
        change="12 low stock alerts"
        icon="box"
        color="green"
      />
      <StatsCard
        title="Monthly Revenue"
        value="$18,750"
        change="+8.1% from last month"
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
import StatsCard from '@/components/dashboard/StatsCard.vue'
import RecentActivities from '@/components/dashboard/RecentActivities.vue'
import LowStockAlerts from '@/components/dashboard/LowStockAlerts.vue'
</script>