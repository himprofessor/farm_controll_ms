<template>
  <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-3">
        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
          </svg>
        </div>
        <div>
          <h3 class="text-xl font-semibold text-gray-900">{{ employee.name }}</h3>
          <p class="text-gray-600">{{ employee.position }}</p>
        </div>
      </div>
      <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
        </svg>
      </div>
    </div>

    <!-- Salary Details -->
    <div class="space-y-4 mb-6">
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Base Salary:</span>
        <span class="font-semibold text-gray-900">{{ formatCurrency(employee.baseSalary) }}</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-gray-600">Current Balance:</span>
        <span class="font-semibold text-green-600">{{ formatCurrency(employee.currentBalance) }}</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-gray-600">Total Earned:</span>
        <span class="font-semibold text-gray-900">{{ formatCurrency(employee.totalEarned) }}</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-gray-600">Last Payment:</span>
        <span class="font-semibold text-gray-900">{{ employee.lastPayment }}</span>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex space-x-3">
      <button
        @click="openPaymentModal"
        class="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        Pay Salary
      </button>
      <button
        @click="viewDetails"
        class="text-blue-600 border border-blue-200 hover:bg-blue-50 bg-transparent font-medium py-2 px-4 rounded-md transition-colors"
      >
        Details
      </button>
    </div>

    <!-- Payment Modal -->
    <PaymentModal
      :is-open="showPaymentModal"
      :employee="employee"
      @close="showPaymentModal = false"
      @payment-processed="handlePaymentProcessed"
    />
  </div>

  
</template>

<script>
import PaymentModal from './PaymentModal.vue'

export default {
  name: 'SalaryCard',
  components: {
    PaymentModal
  },
  props: {
    employee: {
      type: Object,
      required: true,
      default: () => ({
        id: 'emp-001',
        name: 'John Smith',
        position: 'Farm Manager',
        baseSalary: 4500,
        currentBalance: 2340,
        totalEarned: 54000,
        lastPayment: '1/1/2024'
      })
    }
  },
  data() {
    return {
      showPaymentModal: false
    }
  },
  methods: {
    openPaymentModal() {
      this.showPaymentModal = true
    },
    viewDetails() {
      this.$emit('view-details', this.employee)
    },
    handlePaymentProcessed(paymentInfo) {
      // Handle the payment processing
      console.log('Payment processed:', paymentInfo)
      
      // You can emit this to parent component or handle via Vuex/Pinia
      this.$emit('payment-processed', paymentInfo)
      
      // Show success message
      alert('Payment processed successfully!')
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount)
    }
  }
}
</script>
