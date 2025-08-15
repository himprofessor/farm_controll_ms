<template>
  <div>
    <!-- Salary Payment Modal -->
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
                <div class="font-semibold" :class="{'text-green-600': employee.currentBalance >= 0, 'text-red-600': employee.currentBalance < 0}">
                  {{ formatCurrency(employee.currentBalance) }}
                </div>
              </div>
              <div>
                <span class="text-gray-600">Base Salary:</span>
                <div class="font-semibold">{{ formatCurrency(employee.baseSalary) }}</div>
              </div>
            </div>
            
            <!-- New Balance Preview -->
            <div v-if="paymentAmount > 0" class="mt-3 p-2 bg-blue-50 rounded-md">
              <div class="text-sm text-gray-700">
                <p class="font-medium">After Payment:</p>
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
                @input="validatePayment"
                class="block w-full pl-7 pr-12 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{
                  'border-red-300': newBalance < 0,
                  'border-green-300': paymentAmount > 0 && newBalance >= 0
                }"
                placeholder="0.00"
                step="0.01"
                min="0"
              >
              <div v-if="newBalance < 0" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
            </div>
            
            <!-- Balance Warning -->
            <div v-if="newBalance < 0" class="text-sm text-red-600 flex items-start">
              <svg class="w-4 h-4 mt-0.5 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <span>Warning: This payment will create a debt of {{ formatCurrency(Math.abs(newBalance)) }}</span>
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
            :disabled="paymentAmount <= 0"
            class="px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
            </svg>
            Process Payment
          </button>
        </div>
      </div>
    </div>

    <!-- Withdrawal Requests Table -->
    <div class="bg-white p-3 mb-6 rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div class="relative w-64">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input v-model="searchQuery" type="text" placeholder="Search by name, role, or department"
            class="block w-[800px] pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div class="flex space-x-4">
          <select v-model="statusFilter"
            class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option value="All Status">All Status</option>
            <option v-for="status in statuses" :value="status" :key="status">{{ status }}</option>
          </select>
        </div>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Member</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="withdrawal in filteredWithdrawals" :key="withdrawal.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ withdrawal.staffMember }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ formatCurrency(withdrawal.amount) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(withdrawal.requestDate) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="getStatusClasses(withdrawal.status)"
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ withdrawal.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ withdrawal.reason }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
              <button v-if="withdrawal.status === 'Pending'" @click="approveWithdrawal(withdrawal)"
                class="text-green-600 hover:text-green-900">
                Approve
              </button>
              <button v-if="withdrawal.status === 'Pending'" @click="rejectWithdrawal(withdrawal)"
                class="text-red-600 hover:text-red-900">
                Reject
              </button>
              <button v-if="withdrawal.status === 'Approved'" @click="completeWithdrawal(withdrawal)"
                class="text-blue-600 hover:text-blue-900">
                Complete
              </button>
              <span v-if="['Completed', 'Rejected'].includes(withdrawal.status)" class="text-gray-500">
                No actions
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'

export default {
  name: 'SalaryWithdrawalSystem',
  setup() {
    // Payment Modal State
    const isOpen = ref(false)
    const employee = ref({
      id: '',
      name: '',
      position: '',
      role: '',
      currentBalance: 0,
      baseSalary: 0,
      totalEarned: 0,
      lastPayment: ''
    })
    const paymentAmount = ref(0)
    const paymentNote = ref('')

    // Withdrawal Table State
    const searchQuery = ref('')
    const statusFilter = ref('All Status')
    const withdrawals = ref([
      {
        id: 1,
        staffMember: 'John Smith',
        amount: 1500,
        requestDate: '2024-01-15',
        status: 'Pending',
        reason: 'Personal expenses'
      },
      {
        id: 2,
        staffMember: 'Sarah Johnson',
        amount: 800,
        requestDate: '2024-01-14',
        status: 'Approved',
        reason: 'Medical bills'
      },
      {
        id: 3,
        staffMember: 'Mike Davis',
        amount: 500,
        requestDate: '2024-01-13',
        status: 'Completed',
        reason: 'Family support'
      },
      {
        id: 4,
        staffMember: 'Emily Wilson',
        amount: 1200,
        requestDate: '2024-01-12',
        status: 'Rejected',
        reason: 'Home renovation'
      }
    ])
    const statuses = ['Pending', 'Approved', 'Completed', 'Rejected']

    // Computed Properties
    const newBalance = computed(() => {
      const amount = parseFloat(paymentAmount.value) || 0
      return employee.value.currentBalance - amount
    })

    const filteredWithdrawals = computed(() => {
      return withdrawals.value.filter(withdrawal => {
        const matchesSearch = searchQuery.value === '' ||
          withdrawal.staffMember.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          withdrawal.reason.toLowerCase().includes(searchQuery.value.toLowerCase())

        const matchesStatus = statusFilter.value === 'All Status' ||
          withdrawal.status === statusFilter.value

        return matchesSearch && matchesStatus
      })
    })

    // Methods
    const openModal = (emp) => {
      employee.value = { ...emp }
      isOpen.value = true
      paymentAmount.value = Math.min(emp.baseSalary, emp.currentBalance)
      paymentNote.value = ''
    }

    const closeModal = () => {
      isOpen.value = false
    }

    const setAmount = (amount) => {
      paymentAmount.value = amount
    }

    const validatePayment = () => {
      paymentAmount.value = parseFloat(paymentAmount.value) || 0
    }

    const processPayment = async () => {
      if (!paymentAmount.value || isNaN(paymentAmount.value)) {
        alert('Please enter a valid payment amount')
        return
      }

      const amount = parseFloat(paymentAmount.value)
      const today = new Date().toISOString().split('T')[0]

      try {
        // Add to withdrawals as a Completed payment
        withdrawals.value.unshift({
          id: Date.now(),
          staffMember: employee.value.name,
          amount: amount,
          requestDate: today,
          status: 'Completed',
          reason: paymentNote.value || 'Salary payment'
        })

        // Update employee balance
        employee.value.currentBalance = newBalance.value
        employee.value.totalEarned += amount
        employee.value.lastPayment = today

        alert('Payment processed successfully!')
        closeModal()
      } catch (error) {
        alert('Error processing payment: ' + error.message)
      }
    }

    const approveWithdrawal = (withdrawal) => {
      withdrawal.status = 'Approved'
    }

    const rejectWithdrawal = (withdrawal) => {
      withdrawal.status = 'Rejected'
    }

    const completeWithdrawal = (withdrawal) => {
      withdrawal.status = 'Completed'
    }

    const formatCurrency = (amount) => {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })
      return amount < 0 ? '-' + formatter.format(Math.abs(amount)) : formatter.format(amount)
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    }

    const getStatusClasses = (status) => {
      const classes = {
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Approved': 'bg-blue-100 text-blue-800',
        'Completed': 'bg-green-100 text-green-800',
        'Rejected': 'bg-red-100 text-red-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    }

    return {
      // Payment Modal
      isOpen,
      employee,
      paymentAmount,
      paymentNote,
      newBalance,
      openModal,
      closeModal,
      setAmount,
      validatePayment,
      processPayment,
      
      // Withdrawal Table
      searchQuery,
      statusFilter,
      withdrawals,
      statuses,
      filteredWithdrawals,
      approveWithdrawal,
      rejectWithdrawal,
      completeWithdrawal,
      formatCurrency,
      formatDate,
      getStatusClasses
    }
  }
}
</script>