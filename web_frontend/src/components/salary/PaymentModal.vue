```vue
<template>
  <div
    v-if="open"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
      <!-- Modal Header -->
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center">
            <CreditCard class="w-5 h-5 mr-2" />
            {{ $t('salaryManagement.processPayment') }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <X class="w-6 h-6" />
          </button>
        </div>
        <p class="text-sm text-gray-600 mt-1">
          {{ $t('paymentModal.processFor', { name: employee.name || $t('staffCard.na'), role: $t(`roles.${employee.roleKey || employee.position?.toLowerCase().replace(' ', '_') || employee.role?.toLowerCase().replace(' ', '_') || 'unknown'}`) }) }}
        </p>
      </div>

      <!-- Modal Body -->
      <div class="px-6 py-4 space-y-6">
        <!-- Employee Info Summary -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <div class="flex items-center space-x-3 mb-3">
            <User class="w-5 h-5 text-gray-600" />
            <span class="font-medium">{{ employee.name || $t('staffCard.na') }}</span>
          </div>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-gray-600">{{ $t('salaryManagement.employeeDetails.currentBalance') }}:</span>
              <div class="font-semibold text-green-600">
                {{ employee.currentBalance ? formatCurrency(employee.currentBalance) : $t('staffCard.na') }}
              </div>
            </div>
            <div>
              <span class="text-gray-600">{{ $t('salaryManagement.employeeDetails.baseSalary') }}:</span>
              <div class="font-semibold">
                {{ employee.baseSalary ? formatCurrency(employee.baseSalary) : $t('staffCard.na') }}
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Amount -->
        <div class="space-y-2">
          <label for="amount" class="text-base font-medium text-gray-700">{{ $t('paymentModal.amount') }}</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              id="amount"
              type="number"
              v-model="paymentAmount"
              class="block w-full pl-7 pr-12 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :placeholder="$t('paymentModal.amountPlaceholder')"
              step="0.01"
              min="0"
            />
          </div>
          <div class="flex space-x-2">
            <button
              type="button"
              @click="setAmount(employee.currentBalance)"
              class="px-3 py-1 text-xs border border-gray-300 rounded-md hover:bg-green-500 hover:text-white transition-colors"
            >
              {{ $t('salaryManagement.employeeDetails.currentBalance') }}
            </button>
            <button
              type="button"
              @click="setAmount(employee.baseSalary)"
              class="px-3 py-1 text-xs border border-gray-300 rounded-md hover:bg-green-500 hover:text-white transition-colors"
            >
              {{ $t('salaryManagement.employeeDetails.baseSalary') }}
            </button>
          </div>
        </div>

        <!-- Payment Notes -->
        <div class="space-y-2">
          <label for="notes" class="text-base font-medium text-gray-700">{{ $t('paymentModal.notes') }}</label>
          <textarea
            id="notes"
            v-model="paymentNote"
            rows="3"
            class="block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            :placeholder="$t('paymentModal.notesPlaceholder')"
          ></textarea>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
        <button
          @click="closeModal"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {{ $t('confirmationDialog.cancel') }}
        </button>
        <button
          @click="processPayment"
          class="px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center"
        >
          <CreditCard class="w-5 h-5 mr-2" />
          {{ $t('paymentModal.submit') }}
        </button>
      </div>

      <!-- Confirmation Dialog for Alerts -->
      <ConfirmationDialog
        :isVisible="showAlert"
        :message="alertMessage"
        :title="alertTitle"
        :showCancel="false"
        @confirm="showAlert = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { CreditCard, X, User } from 'lucide-vue-next'
import axios from 'axios'
import ConfirmationDialog from '@/components/staff/ConfirmationDialog.vue'

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  employee: {
    type: Object,
    required: true,
    default: () => ({
      id: '',
      name: '',
      position: '',
      role: '',
      baseSalary: 0,
      currentBalance: 0,
      totalEarned: 0,
      lastPayment: '',
    }),
  },
})

const emit = defineEmits(['close', 'payment-processed'])

const paymentAmount = ref(0)
const paymentNote = ref('')
const showAlert = ref(false)
const alertMessage = ref('')
const alertTitle = ref('')

watch(
  () => props.open,
  async (newVal) => {
    if (newVal) {
      await nextTick()
      paymentAmount.value = props.employee.baseSalary || 0
      paymentNote.value = ''
    }
  }
)

async function closeModal() {
  await nextTick()
  emit('close')
}

function setAmount(amount) {
  paymentAmount.value = amount || 0
}

async function processPayment() {
  if (!paymentAmount.value || isNaN(paymentAmount.value) || paymentAmount.value <= 0) {
    alertTitle.value = $t('paymentModal.error')
    alertMessage.value = $t('paymentModal.invalidAmount')
    showAlert.value = true
    return
  }

  const amount = parseFloat(paymentAmount.value)
  const today = new Date().toISOString().split('T')[0]

  try {
    const response = await axios.post(`/api/staff/${props.employee.id}/payment`, {
      amount,
      note: paymentNote.value,
      date: today,
    })

    if (response.data.success) {
      emit('payment-processed', {
        ...props.employee,
        currentBalance: (props.employee.currentBalance || 0) + amount,
        totalEarned: (props.employee.totalEarned || 0) + amount,
        lastPayment: today,
      })
      alertTitle.value = $t('paymentModal.success')
      alertMessage.value = $t('paymentModal.successMessage')
      showAlert.value = true
      await closeModal()
    } else {
      alertTitle.value = $t('paymentModal.error')
      alertMessage.value = $t('paymentModal.failure', { message: response.data.message })
      showAlert.value = true
    }
  } catch (error) {
    alertTitle.value = $t('paymentModal.error')
    alertMessage.value = $t('paymentModal.errorMessage', { message: error.message })
    showAlert.value = true
  }
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