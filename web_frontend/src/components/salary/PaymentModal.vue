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
            {{ localEmployee.currentBalance < 0 ? 'Process Repayment' : 'Process Salary Payment' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <p class="text-sm text-gray-600 mt-1">
          {{ localEmployee.currentBalance < 0 ? 'Repay borrowed amount for' : 'Process salary payment for' }} {{ localEmployee.name }} - {{ localEmployee.position || localEmployee.role }}
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
            <span class="font-medium">{{ localEmployee.name }}</span>
          </div>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-gray-600">Current Balance:</span>
              <div class="font-semibold" :class="{'text-green-600': localEmployee.currentBalance >= 0, 'text-red-600': localEmployee.currentBalance < 0}">
                {{ formatCurrency(localEmployee.currentBalance) }}
              </div>
            </div>
            <div>
              <span class="text-gray-600">Base Salary:</span>
              <div class="font-semibold">{{ formatCurrency(localEmployee.baseSalary) }}</div>
            </div>
          </div>
          
          <!-- New Balance Preview -->
          <div v-if="paymentAmount > 0" class="mt-3 p-2 bg-blue-50 rounded-md">
            <div class="text-sm text-gray-700">
              <p class="font-medium">After {{ localEmployee.currentBalance < 0 ? 'Repayment' : 'Payment' }}:</p>
              <div class="mt-1">
                New Balance: 
                <span :class="{
                  'text-green-600': newBalance >= 0,
                  'text-red-600': newBalance < 0
                }">
                  {{ formatCurrency(newBalance) }}
                </span>
              </div>
              <div v-if="newBalance < 0" class="mt-1 text-xs text-red-600 flex items-start">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                <span>Employee will owe {{ formatCurrency(Math.abs(newBalance)) }}</span>
              </div>
              <div v-if="newBalance > localEmployee.currentBalance && localEmployee.currentBalance < 0" class="mt-1 text-xs text-green-600 flex items-start">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Repayment will reduce debt by {{ formatCurrency(paymentAmount) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Amount -->
        <div class="space-y-2">
          <label for="amount" class="text-base font-medium text-gray-700">Amount</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              id="amount"
              type="number"
              v-model="paymentAmount"
              @input="validatePayment"
              class="block w-full pl-7 pr-12 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :class="{
                'border-red-300': newBalance < 0 && paymentAmount > localEmployee.baseSalary && localEmployee.currentBalance >= 0,
                'border-green-300': (paymentAmount > 0 && newBalance >= 0) || (localEmployee.currentBalance < 0 && newBalance > localEmployee.currentBalance)
              }"
              placeholder="0.00"
              step="0.01"
              min="0"
            >
            <div v-if="newBalance < 0 && paymentAmount > localEmployee.baseSalary && localEmployee.currentBalance >= 0" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
          </div>
          
          <!-- Balance Warning -->
          <div v-if="newBalance < 0 && paymentAmount > localEmployee.baseSalary && localEmployee.currentBalance >= 0" class="text-sm text-red-600 flex items-start">
            <svg class="w-4 h-4 mt-0.5 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <span>Warning: This payment will create a debt of {{ formatCurrency(Math.abs(newBalance)) }}</span>
          </div>
          
          <div class="flex space-x-2">
            <button
              type="button"
              @click="setAmount(localEmployee.currentBalance > 0 ? localEmployee.currentBalance : Math.abs(localEmployee.currentBalance))"
              class="px-3 py-1 text-xs border border-gray-300 rounded-md hover:bg-green-500 hover:text-white transition-colors"
            >
              {{ localEmployee.currentBalance < 0 ? 'Repay Debt' : 'Current Balance' }}
            </button>
            <button
              type="button"
              @click="setAmount(localEmployee.baseSalary)"
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
          :disabled="paymentAmount <= 0"
          class="px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
          </svg>
          {{ localEmployee.currentBalance < 0 ? 'Process Repayment' : 'Process Payment' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'

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
  emits: ['close', 'payment-processed', 'navigate-to-inventory'],
  setup(props, { emit }) {
    const localEmployee = ref({ ...props.employee })
    const paymentAmount = ref(0)
    const paymentNote = ref('')

    const newBalance = computed(() => {
      const amount = parseFloat(paymentAmount.value) || 0
      // Add amount for repayment (when currentBalance is negative), subtract for payment
      return localEmployee.value.currentBalance < 0 ? localEmployee.value.currentBalance + amount : localEmployee.value.currentBalance - amount
    })

    watch(() => props.isOpen, (newVal) => {
      if (newVal) {
        localEmployee.value = { ...props.employee }
        paymentAmount.value = props.employee.currentBalance < 0 ? Math.abs(props.employee.currentBalance) : Math.min(props.employee.baseSalary, props.employee.currentBalance)
        paymentNote.value = ''
      }
    })

    const closeModal = () => {
      emit('close')
    }

    const setAmount = (amount) => {
      paymentAmount.value = amount
    }

    const validatePayment = () => {
      paymentAmount.value = parseFloat(paymentAmount.value) || 0
      if (props.employee.currentBalance < 0 && paymentAmount.value > Math.abs(props.employee.currentBalance)) {
        paymentAmount.value = Math.abs(props.employee.currentBalance) // Cap repayment to debt amount
      }
    }

    const processPayment = async () => {
      if (!paymentAmount.value || isNaN(paymentAmount.value)) {
        alert('Please enter a valid payment amount')
        return
      }

      const amount = parseFloat(paymentAmount.value)
      const today = new Date().toISOString().split('T')[0]

      try {
        const response = await mockApiCall({
          employeeId: props.employee.id,
          amount: amount,
          note: paymentNote.value,
          date: today,
          willCreateDebt: newBalance.value < 0,
          isRepayment: props.employee.currentBalance < 0
        })

        if (response.success) {
          const updatedTotalEarned = props.employee.currentBalance < 0 ? props.employee.totalEarned : props.employee.totalEarned + amount
          emit('payment-processed', {
            ...props.employee,
            currentBalance: newBalance.value,
            totalEarned: updatedTotalEarned,
            lastPayment: today
          })
          
          // Emit navigation event after successful payment
          emit('navigate-to-inventory')
          
          alert(`${props.employee.currentBalance < 0 ? 'Repayment' : 'Payment'} processed successfully!`)
          closeModal()
        } else {
          alert('Payment failed: ' + response.message)
        }
      } catch (error) {
        alert('Error processing payment: ' + error.message)
      }
    }

    const mockApiCall = (paymentData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: paymentData.isRepayment ? 'Repayment successful' : 'Payment successful',
            data: paymentData
          })
        }, 500)
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

    return {
      localEmployee,
      paymentAmount,
      paymentNote,
      newBalance,
      closeModal,
      setAmount,
      processPayment,
      validatePayment,
      formatCurrency
    }
  }
}
</script>