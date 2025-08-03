
<template>
  <div class="bg-white rounded-lg shadow-lg p-6 max-w-2xl">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-900">
        {{ $t('employeeDetails.title', { name: employee.name || $t('staffCard.na') }) }}
      </h2>
      <button 
        @click="$emit('close')"
        class="text-gray-500 hover:text-gray-700"
      >
        <X class="w-6 h-6" />
      </button>
    </div>

    <!-- Salary Breakdown -->
    <div class="space-y-4 mb-6">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <h3 class="font-semibold text-gray-700">{{ $t('salaryManagement.employeeDetails.baseSalary') }}</h3>
          <p class="text-gray-900">
            {{ employee.baseSalary ? formatCurrency(employee.baseSalary) : $t('staffCard.na') }}
          </p>
        </div>
        <div>
          <h3 class="font-semibold text-gray-700">{{ $t('salaryManagement.employeeDetails.currentBalance') }}</h3>
          <p class="text-green-600">
            {{ employee.currentBalance ? formatCurrency(employee.currentBalance) : $t('staffCard.na') }}
          </p>
        </div>
      </div>

      <div class="border-t pt-4">
        <h3 class="font-semibold text-gray-700 mb-2">{{ $t('employeeDetails.paymentHistory') }}</h3>
        <div v-if="isLoading" class="text-sm text-gray-500">{{ $t('salaryManagement.loading') }}</div>
        <div v-else-if="error" class="text-sm text-red-500">{{ $t('employeeDetails.error') }}</div>
        <ul v-else-if="paymentHistory.length" class="divide-y divide-gray-200">
          <li v-for="(payment, index) in paymentHistory" :key="index" class="py-3">
            <div class="flex justify-between">
              <span class="text-gray-600">{{ payment.date || $t('staffCard.na') }}</span>
              <span class="font-medium">
                {{ payment.amount ? formatCurrency(payment.amount) : $t('staffCard.na') }}
              </span>
            </div>
            <p class="text-sm text-gray-500">{{ payment.notes || $t('staffCard.na') }}</p>
          </li>
        </ul>
        <div v-else class="text-sm text-gray-500">{{ $t('employeeDetails.noPayments') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { X } from 'lucide-vue-next'
import axios from 'axios'

const { $t } = useI18n()

const props = defineProps({
  employee: {
    type: Object,
    required: true,
    default: () => ({
      id: '',
      name: '',
      baseSalary: 0,
      currentBalance: 0,
    }),
  },
})

const emit = defineEmits(['close'])

const paymentHistory = ref([])
const isLoading = ref(false)
const error = ref(null)

onMounted(async () => {
  try {
    isLoading.value = true
    const response = await axios.get(`/api/staff/${props.employee.id}/payments`)
    paymentHistory.value = response.data.map(payment => ({
      date: payment.date,
      amount: payment.amount,
      notes: payment.notes,
    }))
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
})

function formatCurrency(amount) {
  if (!amount) return ''
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}
</script>
