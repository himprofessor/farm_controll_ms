<!-- components/dashboard/salary/EmployeeDetails.vue -->
<template>
  <div class="bg-white rounded-lg shadow-lg p-6 max-w-2xl">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-900">
        Salary Details for {{ employee.name }}
      </h2>
      <button 
        @click="$emit('close')"
        class="text-gray-500 hover:text-gray-700"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Salary Breakdown -->
    <div class="space-y-4 mb-6">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <h3 class="font-semibold text-gray-700">Base Salary</h3>
          <p class="text-gray-900">{{ formatCurrency(employee.baseSalary) }}</p>
        </div>
        <div>
          <h3 class="font-semibold text-gray-700">Current Balance</h3>
          <p class="text-green-600">{{ formatCurrency(employee.currentBalance) }}</p>
        </div>
      </div>

      <div class="border-t pt-4">
        <h3 class="font-semibold text-gray-700 mb-2">Payment History</h3>
        <ul class="divide-y divide-gray-200">
          <li v-for="(payment, index) in paymentHistory" :key="index" class="py-3">
            <div class="flex justify-between">
              <span class="text-gray-600">{{ payment.date }}</span>
              <span class="font-medium">{{ formatCurrency(payment.amount) }}</span>
            </div>
            <p class="text-sm text-gray-500">{{ payment.notes }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    employee: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      paymentHistory: [
        { date: '1/1/2024', amount: 4500, notes: 'Monthly Salary' },
        { date: '12/1/2023', amount: 4500, notes: 'Monthly Salary' },
        // Add more dummy data or fetch from API
      ]
    }
  },
  methods: {
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount)
    }
  }
}
</script>