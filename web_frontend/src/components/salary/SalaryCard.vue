<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-3">
        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
          </svg>
        </div>
        <div>
          <h3 class="text-lg font-medium text-gray-900">{{ staff.name }}</h3>
          <p class="text-sm text-gray-600">{{ staff.role }}</p>
        </div>
      </div>
      <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
        <span class="text-green-600 font-bold text-lg">$</span>
      </div>
    </div>

    <div class="space-y-3 mb-6">
      <div class="flex justify-between">
        <span class="text-sm text-gray-600">Base Salary:</span>
        <span class="text-sm font-medium text-gray-900">${{ staff.baseSalary.toLocaleString() }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-sm text-gray-600">Current Balance:</span>
        <span class="text-sm font-medium text-green-600">${{ staff.currentBalance.toLocaleString() }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-sm text-gray-600">Total Earned:</span>
        <span class="text-sm font-medium text-gray-900">${{ staff.totalEarned.toLocaleString() }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-sm text-gray-600">Last Payment:</span>
        <span class="text-sm font-medium text-gray-900">{{ staff.lastPayment }}</span>
      </div>
    </div>

    <div class="flex space-x-2">
      <button
        @click="$emit('pay-salary', staff)"
        class="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 text-sm font-medium"
      >
        Pay Salary
      </button>
      <button
        @click="$emit('view-details', staff)"
        class="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 text-sm font-medium"
      >
        Details
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SalaryCard',
  props: {
    staff: {
      type: Object,
      required: true
    }
  }
}
</script>