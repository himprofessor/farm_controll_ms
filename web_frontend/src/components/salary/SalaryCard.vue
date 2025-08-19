<template>
  <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-3">
        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1">
            </path>
          </svg>
        </div>
        <div>
          <h3 class="text-xl font-semibold text-gray-900">{{ localEmployee.name }}</h3>
          <p class="text-gray-600">{{ localEmployee.position }}</p>
        </div>
      </div>
      <div>
        <button @click="openSalaryPaymentModal" class="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-m font-bold transition duration-300 rounded-lg shadow">
          Tranfer
        </button>
      </div>
    </div>

    <!-- Salary Details -->
    <div class="space-y-4 mb-6">
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Base Salary:</span>
        <span class="font-semibold text-gray-900">{{ formatCurrency(localEmployee.baseSalary) }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Current Balance:</span>
        <span :class="{'text-green-600': localEmployee.currentBalance >= 0, 'text-red-600': localEmployee.currentBalance < 0}" class="font-semibold">
          {{ formatCurrency(localEmployee.currentBalance) }}
        </span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Total Earned:</span>
        <span class="font-semibold text-gray-900">{{ formatCurrency(localEmployee.totalEarned) }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Last Payment:</span>
        <span class="font-semibold text-gray-900">{{ localEmployee.lastPayment }}</span>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex space-x-2">
      <button v-if="localEmployee.currentBalance >= 0" @click="openPaymentModal"
        class="flex items-center justify-center gap-1 flex-1 w-24 bg-green-500 hover:bg-green-600 text-white font-medium py-1.5 px-3 rounded-md transition-colors text-sm">
        Pay Salary
      </button>
      <button v-if="localEmployee.currentBalance < 0" @click="openPaymentModal"
        class="flex items-center justify-center gap-1 flex-1 w-24 bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 px-3 rounded-md transition-colors text-sm">
        Repay Debt
      </button>
      <button @click="openDetailsModal"
        class="text-blue-600 border border-blue-200 hover:bg-blue-50 bg-transparent font-medium py-1.5 px-3 rounded-md transition-colors text-sm">
        Details
      </button>
    </div>

    <!-- Payment Modal (for Withdrawals) -->
    <PaymentModal :is-open="showPaymentModal" :employee="localEmployee" @close="showPaymentModal = false"
      @payment-processed="handlePaymentProcessed" />

    <!-- Salary Payment Modal (for Base Salary Payment) -->
    <div v-if="showSalaryPaymentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Pay Base Salary - {{ localEmployee.name }}</h3>
        <form @submit.prevent="processSalaryPayment">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Amount</label>
            <input v-model.number="salaryAmount" type="number" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Notes</label>
            <input v-model="salaryNotes" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="closeSalaryPaymentModal" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md">
              Pay Salary
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Employee Details - {{ localEmployee.name }}</h3>
            <button @click="closeDetailsModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="px-6 py-4 space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Base Salary:</span>
            <span class="font-semibold text-gray-900">{{ formatCurrency(localEmployee.baseSalary) }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Current Balance:</span>
            <span :class="{'text-green-600': localEmployee.currentBalance >= 0, 'text-red-600': localEmployee.currentBalance < 0}" class="font-semibold">
              {{ formatCurrency(localEmployee.currentBalance) }}
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Total Earned:</span>
            <span class="font-semibold text-gray-900">{{ formatCurrency(localEmployee.totalEarned) }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Last Payment:</span>
            <span class="font-semibold text-gray-900">{{ localEmployee.lastPayment }}</span>
          </div>
        </div>
        <div class="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button @click="closeDetailsModal" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-red-500 hover:text-white">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PaymentModal from './PaymentModal.vue'
import { reactive, ref } from 'vue'

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
  setup(props) {
    const localEmployee = reactive({ ...props.employee })
    const showPaymentModal = ref(false)
    const showDetailsModal = ref(false)
    const showSalaryPaymentModal = ref(false)
    const salaryAmount = ref(0)
    const salaryNotes = ref('')

    const openPaymentModal = () => {
      showPaymentModal.value = true
    }

    const openDetailsModal = () => {
      showDetailsModal.value = true
    }

    const closeDetailsModal = () => {
      showDetailsModal.value = false
    }

    const openSalaryPaymentModal = () => {
      showSalaryPaymentModal.value = true
      salaryAmount.value = localEmployee.baseSalary
      salaryNotes.value = 'Monthly salary'
    }

    const closeSalaryPaymentModal = () => {
      showSalaryPaymentModal.value = false
      salaryAmount.value = 0
      salaryNotes.value = ''
    }

    const handlePaymentProcessed = (updatedEmployee) => {
      Object.assign(localEmployee, updatedEmployee)
      showPaymentModal.value = false
    }

    const processSalaryPayment = () => {
      const amount = salaryAmount.value
      const wasPositiveBeforePayment = localEmployee.currentBalance >= 0

      if (wasPositiveBeforePayment) {
        // Salary payment - add to balance and total earned
        localEmployee.currentBalance += amount
        localEmployee.totalEarned += amount
      } else {
        // Correct debt repayment logic:
        // Subtract repayment amount from negative balance to reduce debt
        // Example: -4160 - 1000 = -3160 (remaining debt)
        const repaymentAmount = Math.min(amount, Math.abs(localEmployee.currentBalance))
        localEmployee.currentBalance = localEmployee.currentBalance + repaymentAmount
        
        // Don't add to totalEarned when repaying debt
      }

      localEmployee.lastPayment = new Date().toLocaleDateString()
      closeSalaryPaymentModal()
    }

    const formatCurrency = (amount) => {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })
      if (amount < 0) {
        return '-' + formatter.format(Math.abs(amount))
      }
      return formatter.format(amount)
    }

    return {
      localEmployee,
      showPaymentModal,
      showDetailsModal,
      openPaymentModal,
      openDetailsModal,
      closeDetailsModal,
      handlePaymentProcessed,
      formatCurrency,
      showSalaryPaymentModal,
      openSalaryPaymentModal,
      closeSalaryPaymentModal,
      salaryAmount,
      salaryNotes,
      processSalaryPayment
    }
  }
}
</script>