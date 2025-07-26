<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
      <!-- Modal Header -->
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
            </svg>
            Process Salary Payment
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <p class="text-sm text-gray-600 mt-1">
          Process salary payment for {{ employee.name }} - {{ employee.position || employee.role }}
        </p>
      </div>

      <!-- Modal Body -->
      <div class="px-6 py-4 space-y-6">
        <!-- Employee Info Summary -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <div class="flex items-center space-x-3 mb-3">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span class="font-medium">{{ employee.name }}</span>
          </div>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-gray-600">Current Balance:</span>
              <div class="font-semibold text-green-600">{{ formatCurrency(employee.currentBalance) }}</div>
            </div>
            <div>
              <span class="text-gray-600">Base Salary:</span>
              <div class="font-semibold">{{ formatCurrency(employee.baseSalary) }}</div>
            </div>
          </div>
        </div>

        <!-- Payment Amount -->
        <div class="space-y-2">
          <label for="amount" class="text-base font-medium text-gray-700">Payment Amount</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              id="amount"
              type="number"
              v-model="paymentAmount"
              class="block w-full pl-7 pr-12 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="0.00"
              step="0.01"
              min="0"
            >
          </div>
          <div class="flex space-x-2">
            <button
              type="button"
              @click="setAmount(employee.currentBalance)"
              class="px-3 py-1 text-xs border border-gray-300 rounded-md hover:bg-green-500 hover:text-white transition-colors"
            >
              Current Balance
            </button>
            <button
              type="button"
              @click="setAmount(employee.baseSalary)"
              class="px-3 py-1 text-xs border border-gray-300 rounded-md hover:bg-green-500 hover:text-white transition-colors"
            >
              Base Salary
            </button>
          </div>
        </div>

        <!-- Payment Notes -->
        <div class="space-y-2">
          <label for="notes" class="text-base font-medium text-gray-700">Payment Notes (Optional)</label>
          <textarea
            id="notes"
            v-model="paymentNote"
            rows="3"
            class="block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Add any additional notes about this payment..."
          ></textarea>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
        <button
          @click="closeModal"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          @click="processPayment"
          class="px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
          </svg>
          Process Payment
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'PaymentModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    employee: {
      type: Object,
      required: true,
      default: () => ({
        id: '',
        name: '',
        position: '',
        role: '',
        currentBalance: 0,
        baseSalary: 0,
        totalEarned: 0,
        lastPayment: ''
      })
    }
  },
  emits: ['close', 'payment-processed'],
  setup(props, { emit }) {
    const paymentAmount = ref(0)
    const paymentNote = ref('')

    watch(() => props.isOpen, (newVal) => {
      if (newVal) {
        paymentAmount.value = props.employee.baseSalary
        paymentNote.value = ''
      }
    })

    const closeModal = () => {
      emit('close')
    }

    const setAmount = (amount) => {
      paymentAmount.value = amount
    }

    const processPayment = async () => {
      if (!paymentAmount.value || isNaN(paymentAmount.value) || paymentAmount.value <= 0) {
        alert('Please enter a valid payment amount')
        return
      }

      const amount = parseFloat(paymentAmount.value)
      const today = new Date().toISOString().split('T')[0]

      try {
        // Simulate API call
        const response = await mockApiCall({
          employeeId: props.employee.id,
          amount: amount,
          note: paymentNote.value,
          date: today
        })

        if (response.success) {
          // Emit the complete updated employee data
          emit('payment-processed', {
            ...props.employee,
            currentBalance: props.employee.currentBalance + amount,
            totalEarned: props.employee.totalEarned + amount,
            lastPayment: today
          })
          
          alert('Payment processed successfully!')
          closeModal()
        } else {
          alert('Payment failed: ' + response.message)
        }
      } catch (error) {
        alert('Error processing payment: ' + error.message)
      }
    }

    // Mock API function (replace with your actual API call)
    const mockApiCall = (paymentData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: 'Payment successful',
            data: paymentData
          })
        }, 500)
      })
    }

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount)
    }

    return {
      paymentAmount,
      paymentNote,
      closeModal,
      setAmount,
      processPayment,
      formatCurrency
    }
  }
}
</script>