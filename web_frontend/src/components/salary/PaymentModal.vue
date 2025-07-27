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
          Process salary payment for {{ employee.name }} - {{ employee.position }}
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

        <!-- Payment Type -->
        <div class="space-y-3">
          <label class="text-base font-medium text-gray-700">Payment Type</label>
          <div class="space-y-2">
            <label v-for="type in paymentTypes" :key="type.value" class="flex items-center space-x-2">
              <input 
                type="radio" 
                :value="type.value" 
                v-model="paymentData.type"
                class="text-blue-600 focus:ring-blue-500"
              >
              <span class="text-sm text-gray-700">{{ type.label }}</span>
            </label>
          </div>
        </div>

        <hr class="border-gray-200">

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
              v-model="paymentData.amount"
              class="block w-full pl-7 pr-12 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="0.00"
              step="0.01"
            >
          </div>
          <div class="flex space-x-2">
            <button
              type="button"
              @click="setAmount(employee.currentBalance)"
              class="px-3 py-1 text-xs border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Current Balance
            </button>
            <button
              type="button"
              @click="setAmount(employee.baseSalary)"
              class="px-3 py-1 text-xs border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Base Salary
            </button>
          </div>
        </div>

        <!-- Payment Method -->
        <div class="space-y-2">
          <label class="text-base font-medium text-gray-700">Payment Method</label>
          <select 
            v-model="paymentData.method"
            class="block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="bank_transfer">Bank Transfer</option>
            <option value="check">Check</option>
            <option value="cash">Cash</option>
            <option value="payroll_service">Payroll Service</option>
          </select>
        </div>

        <!-- Payment Notes -->
        <div class="space-y-2">
          <label for="notes" class="text-base font-medium text-gray-700">Payment Notes (Optional)</label>
          <textarea
            id="notes"
            v-model="paymentData.notes"
            rows="3"
            class="block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Add any additional notes about this payment..."
          ></textarea>
        </div>

        <!-- Payment Summary -->
        <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 class="font-medium text-blue-900 mb-2">Payment Summary</h4>
          <div class="space-y-1 text-sm">
            <div class="flex justify-between">
              <span class="text-blue-700">Employee:</span>
              <span class="font-medium">{{ employee.name }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-blue-700">Payment Type:</span>
              <span class="font-medium">{{ getPaymentTypeLabel(paymentData.type) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-blue-700">Amount:</span>
              <span class="font-medium">{{ formatCurrency(paymentData.amount || 0) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-blue-700">Method:</span>
              <span class="font-medium">{{ getPaymentMethodLabel(paymentData.method) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
        <button
          @click="closeModal"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          @click="processPayment"
          class="px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-600 flex items-center"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
          </svg>
          Process Payment
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    employee: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      paymentData: {
        amount: 0,
        type: 'regular',
        method: 'bank_transfer',
        notes: ''
      },
      paymentTypes: [
        { value: 'regular', label: 'Regular Salary Payment' },
        { value: 'bonus', label: 'Bonus Payment' },
        { value: 'advance', label: 'Salary Advance' },
        { value: 'overtime', label: 'Overtime Payment' }
      ]
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.paymentData.amount = this.employee.currentBalance
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    setAmount(amount) {
      this.paymentData.amount = amount
    },
    processPayment() {
      const paymentInfo = {
        employeeId: this.employee.id,
        amount: parseFloat(this.paymentData.amount),
        type: this.paymentData.type,
        method: this.paymentData.method,
        notes: this.paymentData.notes,
        timestamp: new Date().toISOString()
      }
      
      this.$emit('payment-processed', paymentInfo)
      this.closeModal()
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount)
    },
    getPaymentTypeLabel(value) {
      const type = this.paymentTypes.find(t => t.value === value)
      return type ? type.label : value
    },
    getPaymentMethodLabel(value) {
      const methods = {
        'bank_transfer': 'Bank Transfer',
        'check': 'Check',
        'cash': 'Cash',
        'payroll_service': 'Payroll Service'
      }
      return methods[value] || value
    }
  }
}
</script>
