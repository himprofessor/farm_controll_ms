<template>
  <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-3">
        <div>
          <h3 class="text-xl font-semibold text-gray-900">Name: {{ localEmployee.name }}</h3>
          <p class="text-gray-600">Position: {{ localEmployee.role }}</p>
        </div>
      </div>
      <div>
        <button @click="openSalaryPaymentModal" class="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-m font-bold rounded-lg shadow">
          Transfer
        </button>
      </div>
    </div>

    <!-- Salary Details -->
    <div class="space-y-4 mb-6">
      <div class="flex justify-between items-center">
        <span class="text-gray-600">{{ $t('staff.salaryManagement.baseSalary') }}:</span>
        <span class="font-semibold text-gray-900">{{ formatCurrency(localEmployee.baseSalary) }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-600">{{ $t('staff.salaryManagement.currentBalance') }}:</span>
        <span :class="{'text-green-600': localEmployee.currentBalance >= 0, 'text-red-600': localEmployee.currentBalance < 0}" class="font-semibold">
          {{ formatCurrency(localEmployee.currentBalance) }}
        </span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-600">{{ $t('staff.salaryManagement.totalEarned') }}:</span>
        <span class="font-semibold text-gray-900">{{ formatCurrency(localEmployee.totalEarned) }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-600">{{ $t('staff.salaryManagement.lastPayment') }}:</span>
        <span class="font-semibold text-gray-900">{{ localEmployee.lastPayment }}</span>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex space-x-2">
      <button v-if="localEmployee.currentBalance >= 0" @click="openPaymentModal"
        class="flex items-center justify-center gap-1 flex-1 w-24 bg-green-500 hover:bg-green-600 text-white font-medium py-1.5 px-3 rounded-md text-sm">
        Pay Salary
      </button>
      <button v-if="localEmployee.currentBalance < 0" @click="openPaymentModal"
        class="flex items-center justify-center gap-1 flex-1 w-24 bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 px-3 rounded-md text-sm">
        Repay Debt
      </button>
      <button @click="openDetailsModal"
        class="text-blue-600 border border-blue-200 hover:bg-blue-50 bg-transparent font-medium py-1.5 px-3 rounded-md text-sm">
        Details
      </button>
    </div>

    <!-- Payment Modal Component -->
    <PaymentModal 
      :is-open="showPaymentModal" 
      :employee="localEmployee"  
      @close="showPaymentModal = false"
      @payment-processed="handlePaymentProcessed" 
    />

    <!-- Salary Payment Modal -->
    <div v-if="showSalaryPaymentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('staff.salaryManagement.payBaseSalary', { name: localEmployee.name }) }}</h3>
        <form @submit.prevent="processSalaryPayment">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">{{ $t('staff.salaryManagement.amount') }}</label>
            <input v-model.number="salaryAmount" type="number" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">{{ $t('staff.salaryManagement.notes') }}</label>
            <input v-model="salaryNotes" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="closeSalaryPaymentModal" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              {{ $t('staff.cancel') }}
            </button>
            <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md">
              {{ $t('staff.salaryManagement.paySalary') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Employee Details - {{ localEmployee.name }}</h3>
          <button @click="closeDetailsModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-gray-600">{{ $t('staff.salaryManagement.baseSalary') }}:</span>
            <span class="font-semibold text-gray-900">{{ formatCurrency(localEmployee.baseSalary) }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">{{ $t('staff.salaryManagement.currentBalance') }}:</span>
            <span :class="{'text-green-600': localEmployee.currentBalance >= 0, 'text-red-600': localEmployee.currentBalance < 0}" class="font-semibold">
              {{ formatCurrency(localEmployee.currentBalance) }}
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">{{ $t('staff.salaryManagement.totalEarned') }}:</span>
            <span class="font-semibold text-gray-900">{{ formatCurrency(localEmployee.totalEarned) }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">{{ $t('staff.salaryManagement.lastPayment') }}:</span>
            <span class="font-semibold text-gray-900">{{ localEmployee.lastPayment }}</span>
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <button @click="closeDetailsModal" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-red-500 hover:text-white">
            {{ $t('staff.close') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import PaymentModal from './PaymentModal.vue'
import API from '@/plugin/axios'

export default {
  name: 'SalaryCard',
  components: { PaymentModal },
  props: { staff: { type: Object, required: true } }, // keep staff object for name/role
  setup(props) {
    const localEmployee = reactive({
      id: props.staff.id,
      name: props.staff.name || 'Unknown',
      role: props.staff.role || 'Unknown',
      baseSalary: 0,
      currentBalance: 0,
      totalEarned: 0,
      lastPayment: 'No payment'
    })

    const showPaymentModal = ref(false)
    const showDetailsModal = ref(false)
    const showSalaryPaymentModal = ref(false)
    const salaryAmount = ref(0)
    const salaryNotes = ref('')
    const error = ref(null)

    // ✅ fetch salary info from /salaries/{id}
    const fetchSalaryData = async () => {
      try {
        const res = await API.get(`/salaries/${props.staff.id}`)
        const salary = res.data

        localEmployee.baseSalary = salary.base_salary || 0
        localEmployee.currentBalance = salary.current_balance || 0
        localEmployee.totalEarned = salary.total_Earned || 0
        localEmployee.lastPayment = salary.last_payment_date
          ? new Date(salary.last_payment_date).toLocaleDateString()
          : 'No payment'
      } catch (err) {
        console.error('Failed to fetch salary:', err)
        error.value = 'Failed to fetch salary data'
      }
    }

    onMounted(fetchSalaryData)

    const openPaymentModal = () => showPaymentModal.value = true
    const openDetailsModal = () => showDetailsModal.value = true
    const closeDetailsModal = () => showDetailsModal.value = false
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

    const handlePaymentProcessed = () => {
      fetchSalaryData()
      showPaymentModal.value = false
    }

    const processSalaryPayment = async () => {
      try {
        const payload = {
          employeeId: localEmployee.id,
          amount: salaryAmount.value,
          notes: salaryNotes.value
        }
        await API.post('/salaries', payload)
        await fetchSalaryData() // refresh salary data
        closeSalaryPaymentModal()
      } catch (err) {
        console.error(err)
        error.value = 'Failed to process salary payment'
      }
    }

    const formatCurrency = (amount) => {
      const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
      return amount < 0 ? '-' + formatter.format(Math.abs(amount)) : formatter.format(amount)
    }

    return {
      localEmployee,
      showPaymentModal,
      showDetailsModal,
      showSalaryPaymentModal,
      salaryAmount,
      salaryNotes,
      error,
      openPaymentModal,
      openDetailsModal,
      closeDetailsModal,
      openSalaryPaymentModal,
      closeSalaryPaymentModal,
      processSalaryPayment,
      handlePaymentProcessed,
      formatCurrency
    }
  }
}
</script>

