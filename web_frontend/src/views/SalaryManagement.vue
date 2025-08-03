<template>
  <div class="p-6 bg-gray-100 rounded-lg shadow max-w-screen-xl mx-auto">
    <div v-if="isLoading" class="text-sm text-gray-500">{{ $t('salaryManagement.loading') }}</div>
    <div v-else-if="error" class="text-sm text-red-500">{{ $t('salaryManagement.error') }}</div>
    <div v-else>
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-900">{{ $t('salaryManagement.title') }}</h1>
        <p class="text-gray-600">{{ $t('salaryManagement.subtitle') }}</p>
      </div>

      <!-- Tabs -->
      <div class="border-b border-gray-200 mb-6">
        <nav class="flex space-x-8" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            :class="[
              activeTab === tab
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'px-1 py-4 text-sm font-medium border-b-2'
            ]"
          >
            {{ $t(`salaryManagement.tabs.${tab.toLowerCase()}`) }}
          </button>
        </nav>
      </div>

      <!-- Salaries Tab -->
      <div v-if="activeTab === 'Salaries'">
        <div class="mb-6 bg-white p-6 rounded-lg shadow">
          <div class="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-6">
            <StaffFilters
              :searchQuery="searchQuery"
              :selectedDepartment="selectedDepartment"
              :selectedStatus="selectedStatus"
              @update:searchQuery="searchQuery = $event"
              @update:selectedDepartment="selectedDepartment = $event"
              @update:selectedStatus="selectedStatus = $event"
            />
            <button
              @click="processAllSalaries"
              class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              {{ $t('salaryManagement.processAllButton') }}
            </button>
          </div>
        </div>
        <div v-if="filteredStaff && filteredStaff.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SalaryCard
            v-for="staff in filteredStaff"
            :key="staff.id"
            :employee="staff"
            @view-details="viewDetails"
            @payment-processed="handlePaymentProcessed"
          />
        </div>
        <div v-else class="text-sm text-gray-500">{{ $t('salaryManagement.noStaff') }}</div>
      </div>

      <!-- Withdrawals Tab -->
      <div v-if="activeTab === 'Withdrawals'">
        <div class="mb-6 bg-white p-6 rounded-lg shadow">
          <StaffFilters
            :searchQuery="withdrawalSearchQuery"
            :selectedDepartment="withdrawalDepartmentFilter"
            :selectedStatus="withdrawalStatusFilter"
            @update:searchQuery="withdrawalSearchQuery = $event"
            @update:selectedDepartment="withdrawalDepartmentFilter = $event"
            @update:selectedStatus="withdrawalStatusFilter = $event"
          />
        </div>
        <WithdrawalTable
          :withdrawals="withdrawals"
          :departmentFilter="withdrawalDepartmentFilter"
          :searchQuery="withdrawalSearchQuery"
          :statusFilter="withdrawalStatusFilter"
          @update:searchQuery="withdrawalSearchQuery = $event"
          @update:statusFilter="withdrawalStatusFilter = $event"
          @approve="approveWithdrawal"
          @reject="rejectWithdrawal"
          @complete="completeWithdrawal"
        />
        <div v-if="!withdrawals.length" class="text-sm text-gray-500">{{ $t('salaryManagement.noWithdrawals') }}</div>
      </div>

      <!-- Employee Details Modal -->
      <div v-if="selectedStaff" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
          <button
            @click="selectedStaff = null"
            class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            <XIcon class="w-6 h-6" />
          </button>
          <h2 class="text-2xl font-bold mb-6 text-gray-900">
            {{ $t('salaryManagement.employeeDetails.title', { name: selectedStaff.name }) }}
          </h2>
          <div class="space-y-2">
            <p><strong>{{ $t('salaryManagement.employeeDetails.id') }}:</strong> {{ selectedStaff.id || $t('salaryManagement.na') }}</p>
            <p><strong>{{ $t('salaryManagement.employeeDetails.role') }}:</strong> {{ $t(`roles.${selectedStaff.roleKey || selectedStaff.role?.toLowerCase().replace(' ', '_') || 'unknown'}`) }}</p>
            <p><strong>{{ $t('salaryManagement.employeeDetails.baseSalary') }}:</strong> {{ selectedStaff.baseSalary ? formatCurrency(selectedStaff.baseSalary) : $t('salaryManagement.na') }}</p>
            <p><strong>{{ $t('salaryManagement.employeeDetails.currentBalance') }}:</strong> {{ selectedStaff.currentBalance ? formatCurrency(selectedStaff.currentBalance) : $t('salaryManagement.na') }}</p>
            <p><strong>{{ $t('salaryManagement.employeeDetails.totalEarned') }}:</strong> {{ selectedStaff.totalEarned ? formatCurrency(selectedStaff.totalEarned) : $t('salaryManagement.na') }}</p>
            <p><strong>{{ $t('salaryManagement.employeeDetails.lastPayment') }}:</strong> {{ selectedStaff.lastPayment || $t('salaryManagement.na') }}</p>
            <p><strong>{{ $t('salaryManagement.employeeDetails.acresManaged') }}:</strong> {{ selectedStaff.acresManaged || $t('salaryManagement.na') }}</p>
            <p><strong>{{ $t('salaryManagement.employeeDetails.crops') }}:</strong> {{ selectedStaff.crops || $t('salaryManagement.na') }}</p>
            <p><strong>{{ $t('salaryManagement.employeeDetails.workHours') }}:</strong> {{ selectedStaff.workHours ? `${selectedStaff.workHours} ${$t('salaryManagement.hours')}` : $t('salaryManagement.na') }}</p>
          </div>
          <button
            @click="processPayment(selectedStaff)"
            class="mt-6 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            {{ $t('salaryManagement.processPayment') }}
          </button>
        </div>
      </div>

      <!-- Success Modal -->
      <div v-if="showSuccessModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
          <h2 class="text-2xl font-bold mb-4 text-gray-900">{{ $t('salaryManagement.successModal.title') }}</h2>
          <p class="text-gray-600">{{ $t('salaryManagement.successModal.message', { date: successDate }) }}</p>
          <p class="text-gray-600">{{ processedCount }} {{ $t('salaryManagement.successModal.paid') }}</p>
          <button
            @click="showSuccessModal = false"
            class="mt-4 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            {{ $t('salaryManagement.closeButton') }}
          </button>
        </div>
      </div>

      <!-- Confirmation Dialog for Withdrawals -->
      <ConfirmationDialog
        :isVisible="showConfirmDialog"
        :message="confirmMessage"
        @confirm="confirmWithdrawalAction"
        @cancel="showConfirmDialog = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { XIcon } from 'lucide-vue-next'
import axios from 'axios'
import StaffFilters from '@/components/StaffFilters.vue'
import SalaryCard from '@/components/SalaryCard.vue'
import WithdrawalTable from '@/components/WithdrawalTable.vue'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'

const activeTab = ref('Salaries')
const tabs = ref(['Salaries', 'Withdrawals'])
const searchQuery = ref('')
const selectedDepartment = ref('')
const selectedStatus = ref('')
const withdrawalSearchQuery = ref('')
const withdrawalDepartmentFilter = ref('AllDepartments')
const withdrawalStatusFilter = ref('All Status')
const isLoading = ref(true)
const error = ref(null)
const staffList = ref([])
const withdrawals = ref([])
const selectedStaff = ref(null)
const showSuccessModal = ref(false)
const successDate = ref('')
const processedCount = ref(0)
const showConfirmDialog = ref(false)
const confirmMessage = ref('')
const pendingWithdrawalAction = ref(null)

const filteredStaff = computed(() => {
  return staffList.value.filter((staff) => {
    const matchesSearch =
      !searchQuery.value ||
      staff.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      staff.role?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      staff.baseSalary?.toString().includes(searchQuery.value)
    const matchesDepartment = !selectedDepartment.value || staff.department === selectedDepartment.value
    const matchesStatus = !selectedStatus.value || staff.status === selectedStatus.value
    return matchesSearch && matchesDepartment && matchesStatus
  })
})

function formatCurrency(amount) {
  if (!amount) return ''
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

onMounted(async () => {
  try {
    isLoading.value = true
    const [staffResponse, withdrawalsResponse] = await Promise.all([
      axios.get('/api/staff'),
      axios.get('/api/withdrawals'),
    ])
    staffList.value = staffResponse.data.map(staff => ({
      id: staff.id,
      name: staff.name,
      role: staff.role,
      roleKey: staff.roleKey || staff.role?.toLowerCase().replace(' ', '_'),
      position: staff.role,
      status: staff.status,
      department: staff.department,
      baseSalary: staff.baseSalary,
      currentBalance: staff.currentBalance,
      totalEarned: staff.totalEarned,
      lastPayment: staff.lastPayment,
      acresManaged: staff.acresManaged,
      crops: staff.crops,
      workHours: staff.workHours,
    }))
    withdrawals.value = withdrawalsResponse.data.map(withdrawal => ({
      id: withdrawal.id,
      staffMember: withdrawal.staffMember,
      amount: withdrawal.amount,
      requestDate: withdrawal.requestDate,
      status: withdrawal.status,
      reason: withdrawal.reason,
      department: withdrawal.department,
    }))
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
})

function viewDetails(staff) {
  selectedStaff.value = staff
}

async function processPayment(staff) {
  try {
    await axios.post(`/api/staff/${staff.id}/payment`, { amount: staff.baseSalary })
    showSuccessModal.value = true
    successDate.value = new Date().toLocaleDateString()
    processedCount.value = 1
    staffList.value = staffList.value.map(s =>
      s.id === staff.id
        ? {
            ...s,
            currentBalance: (s.currentBalance || 0) + (s.baseSalary || 0),
            totalEarned: (s.totalEarned || 0) + (s.baseSalary || 0),
            lastPayment: new Date().toLocaleDateString(),
          }
        : s
    )
  } catch (err) {
    error.value = err.message
  }
}

async function handlePaymentProcessed(paymentInfo) {
  try {
    await axios.post(`/api/staff/${paymentInfo.employeeId}/payment`, {
      amount: paymentInfo.amount,
      notes: paymentInfo.notes,
      date: paymentInfo.date,
    })
    showSuccessModal.value = true
    successDate.value = new Date(paymentInfo.date).toLocaleDateString()
    processedCount.value = 1
    staffList.value = staffList.value.map(s =>
      s.id === paymentInfo.employeeId
        ? {
            ...s,
            currentBalance: (s.currentBalance || 0) + paymentInfo.amount,
            totalEarned: (s.totalEarned || 0) + paymentInfo.amount,
            lastPayment: new Date(paymentInfo.date).toLocaleDateString(),
          }
        : s
    )
  } catch (err) {
    error.value = err.message
  }
}

async function processAllSalaries() {
  try {
    await axios.post('/api/salaries/process')
    showSuccessModal.value = true
    successDate.value = new Date().toLocaleDateString()
    processedCount.value = filteredStaff.value.length
    staffList.value = staffList.value.map(s => ({
      ...s,
      currentBalance: (s.currentBalance || 0) + (s.baseSalary || 0),
      totalEarned: (s.totalEarned || 0) + (s.baseSalary || 0),
      lastPayment: new Date().toLocaleDateString(),
    }))
  } catch (err) {
    error.value = err.message
  }
}

function approveWithdrawal(withdrawal) {
  pendingWithdrawalAction.value = { action: 'approve', withdrawal }
  confirmMessage.value = $t('confirmationDialog.defaultMessage')
  showConfirmDialog.value = true
}

function rejectWithdrawal(withdrawal) {
  pendingWithdrawalAction.value = { action: 'reject', withdrawal }
  confirmMessage.value = $t('confirmationDialog.defaultMessage')
  showConfirmDialog.value = true
}

function completeWithdrawal(withdrawal) {
  pendingWithdrawalAction.value = { action: 'complete', withdrawal }
  confirmMessage.value = $t('confirmationDialog.defaultMessage')
  showConfirmDialog.value = true
}

async function confirmWithdrawalAction() {
  if (!pendingWithdrawalAction.value) return
  const { action, withdrawal } = pendingWithdrawalAction.value
  try {
    if (action === 'approve') {
      await axios.put(`/api/withdrawals/${withdrawal.id}/approve`)
      withdrawals.value = withdrawals.value.map(w =>
        w.id === withdrawal.id ? { ...w, status: 'Approved' } : w
      )
    } else if (action === 'reject') {
      await axios.put(`/api/withdrawals/${withdrawal.id}/reject`)
      withdrawals.value = withdrawals.value.map(w =>
        w.id === withdrawal.id ? { ...w, status: 'Rejected' } : w
      )
    } else if (action === 'complete') {
      await axios.put(`/api/withdrawals/${withdrawal.id}/complete`)
      withdrawals.value = withdrawals.value.map(w =>
        w.id === withdrawal.id ? { ...w, status: 'Completed' } : w
      )
    }
  } catch (err) {
    error.value = err.message
  }
  showConfirmDialog.value = false
  pendingWithdrawalAction.value = null
}
</script>