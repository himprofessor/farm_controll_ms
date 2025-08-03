```vue
<template>
  <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-3">
        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <DollarSign class="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h3 class="text-xl font-semibold text-gray-900">{{ employee.name || $t('staffCard.na') }}</h3>
          <p class="text-gray-600">
            {{ $t(`roles.${employee.roleKey || employee.position?.toLowerCase().replace(' ', '_') || employee.role?.toLowerCase().replace(' ', '_') || 'unknown'}`) }}
          </p>
        </div>
      </div>
      <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
        <DollarSign class="w-5 h-5 text-green-600" />
      </div>
    </div>

    <!-- Salary Details -->
    <div class="space-y-4 mb-6">
      <div class="flex justify-between items-center">
        <span class="text-gray-600">{{ $t('salaryManagement.employeeDetails.baseSalary') }}:</span>
        <span class="font-semibold text-gray-900">
          {{ employee.baseSalary ? formatCurrency(employee.baseSalary) : $t('staffCard.na') }}
        </span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-600">{{ $t('salaryManagement.employeeDetails.currentBalance') }}:</span>
        <span class="font-semibold text-green-600">
          {{ employee.currentBalance ? formatCurrency(employee.currentBalance) : $t('staffCard.na') }}
        </span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-600">{{ $t('salaryManagement.employeeDetails.totalEarned') }}:</span>
        <span class="font-semibold text-gray-900">
          {{ employee.totalEarned ? formatCurrency(employee.totalEarned) : $t('staffCard.na') }}
        </span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-600">{{ $t('salaryManagement.employeeDetails.lastPayment') }}:</span>
        <span class="font-semibold text-gray-900">
          {{ employee.lastPayment || $t('staffCard.na') }}
        </span>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex space-x-2">
      <button
        @click="openPaymentModal"
        :aria-label="$t('salaryManagement.processPayment')"
        class="flex items-center justify-center gap-1 flex-1 w-24 bg-green-500 hover:bg-green-600 text-white font-medium py-1.5 px-3 rounded-md transition-colors text-sm"
      >
        {{ $t('salaryManagement.processPayment') }}
      </button>
      <button
        @click="viewDetails"
        :aria-label="$t('salaryManagement.viewDetails')"
        class="text-blue-600 border border-blue-200 hover:bg-blue-50 font-medium py-1.5 px-3 rounded-md transition-colors text-sm"
      >
        {{ $t('salaryManagement.viewDetails') }}
      </button>
    </div>

    <!-- Payment Modal -->
    <PaymentModal
      :open="showPaymentModal"
      :employee="employee"
      @close="closePaymentModal"
      @payment-processed="handlePaymentProcessed"
    />
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { DollarSign } from 'lucide-vue-next'
import PaymentModal from './PaymentModal.vue'

const props = defineProps({
  employee: {
    type: Object,
    required: true,
    default: () => ({
      id: 'emp-001',
      name: 'John Smith',
      position: 'Farm Manager',
      role: 'Farm Manager',
      baseSalary: 4500,
      currentBalance: 2340,
      totalEarned: 54000,
      lastPayment: '1/1/2024',
    }),
  },
})

const emit = defineEmits(['payment-processed', 'view-details'])

const showPaymentModal = ref(false)

async function openPaymentModal() {
  await nextTick()
  showPaymentModal.value = true
}

async function closePaymentModal() {
  await nextTick()
  showPaymentModal.value = false
}

function viewDetails() {
  emit('view-details', props.employee)
}

function handlePaymentProcessed(updatedEmployee) {
  emit('payment-processed', updatedEmployee)
  closePaymentModal()
}

function formatCurrency(amount) {
  if (!amount) return ''
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}
</script>
```