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
      <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1">
          </path>
        </svg>
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

    <!-- Payment Modal -->
    <PaymentModal :is-open="showPaymentModal" :employee="localEmployee" @close="showPaymentModal = false"
      @payment-processed="handlePaymentProcessed" />

    <!-- Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
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
        <div class="px-6 py-4">
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th class="px-4 py-2">Date</th>
                <th class="px-4 py-2">Transaction Type</th>
                <th class="px-4 py-2">Amount</th>
                <th class="px-4 py-2">New Balance</th>
                <th class="px-4 py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(transaction, index) in transactionHistory" :key="index" class="bg-white border-b">
                <td class="px-4 py-2">{{ transaction.date }}</td>
                <td class="px-4 py-2">{{ transaction.type }}</td>
                <td class="px-4 py-2">{{ formatCurrency(transaction.amount) }}</td>
                <td class="px-4 py-2" :class="{'text-green-600': transaction.newBalance >= 0, 'text-red-600': transaction.newBalance < 0}">
                  {{ formatCurrency(transaction.newBalance) }}
                </td>
                <td class="px-4 py-2">{{ transaction.notes || '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button @click="closeDetailsModal" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
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

    // Mock transaction history
    const transactionHistory = ref([
      { date: '1/1/2024', type: 'Salary Payment', amount: 4500, newBalance: 2340, notes: 'Monthly salary' },
      { date: '7/1/2025', type: 'Salary Payment', amount: 4500, newBalance: -2160, notes: 'Overpayment' },
    ])

    const openPaymentModal = () => {
      showPaymentModal.value = true
    }

    const openDetailsModal = () => {
      showDetailsModal.value = true
    }

    const closeDetailsModal = () => {
      showDetailsModal.value = false
    }

    const handlePaymentProcessed = (updatedEmployee) => {
      // Update localEmployee with new data
      Object.assign(localEmployee, updatedEmployee)
      // Close the modal after processing
      showPaymentModal.value = false
      // Optionally update transaction history
      transactionHistory.value.push({
        date: new Date().toLocaleDateString(),
        type: updatedEmployee.currentBalance < 0 ? 'Debt Repayment' : 'Salary Payment',
        amount: Math.abs(updatedEmployee.amount),
        newBalance: updatedEmployee.currentBalance,
        notes: updatedEmployee.notes || ''
      })
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

    return { localEmployee, showPaymentModal, showDetailsModal, transactionHistory, openPaymentModal, openDetailsModal, closeDetailsModal, handlePaymentProcessed, formatCurrency }
  }
}
</script>