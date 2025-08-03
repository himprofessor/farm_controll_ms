<template>
  <div class="bg-white p-3 mb-6 rounded-lg shadow">
    <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
      <div class="relative w-64">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon class="h-5 w-5 text-gray-400" />
        </div>
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="$t('salaryManagement.searchPlaceholder')"
          class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div class="flex space-x-4">
        <select
          v-model="statusFilter"
          class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="All Status">{{ $t('staffFilters.allStatus') }}</option>
          <option v-for="status in statuses" :value="status" :key="status">
            {{ $t(`withdrawalTable.statuses.${status.toLowerCase()}`) }}
          </option>
        </select>
      </div>
    </div>
  </div>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ $t('withdrawalTable.staffMember') }}
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ $t('withdrawalTable.amount') }}
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ $t('withdrawalTable.requestDate') }}
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ $t('withdrawalTable.status') }}
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ $t('withdrawalTable.reason') }}
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ $t('withdrawalTable.actions') }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="withdrawal in filteredWithdrawals" :key="withdrawal.id">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {{ withdrawal.staffMember || $t('staffCard.na') }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            ${{ withdrawal.amount ? withdrawal.amount.toLocaleString() : $t('staffCard.na') }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ withdrawal.requestDate ? formatDate(withdrawal.requestDate) : $t('staffCard.na') }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span
              :class="getStatusClasses(withdrawal.status)"
              class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
            >
              {{ withdrawal.status ? $t(`withdrawalTable.statuses.${withdrawal.status.toLowerCase()}`) : $t('staffCard.unknown') }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ withdrawal.reason || $t('staffCard.na') }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
            <button
              v-if="withdrawal.status === 'Pending'"
              @click="$emit('approve', withdrawal)"
              class="text-green-600 hover:text-green-900"
            >
              {{ $t('withdrawalTable.approve') }}
            </button>
            <button
              v-if="withdrawal.status === 'Pending'"
              @click="$emit('reject', withdrawal)"
              class="text-red-600 hover:text-red-900"
            >
              {{ $t('withdrawalTable.reject') }}
            </button>
            <button
              v-if="withdrawal.status === 'Approved'"
              @click="$emit('complete', withdrawal)"
              class="text-blue-600 hover:text-blue-900"
            >
              {{ $t('withdrawalTable.complete') }}
            </button>
            <span
              v-if="['Completed', 'Rejected'].includes(withdrawal.status)"
              class="text-gray-500"
            >
              {{ $t('withdrawalTable.noActions') }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { SearchIcon } from 'lucide-vue-next'

const props = defineProps({
  withdrawals: {
    type: Array,
    required: true,
    default: () => [],
  },
  departmentFilter: {
    type: String,
    default: 'AllDepartments',
  },
})

const emit = defineEmits(['approve', 'reject', 'complete', 'update:searchQuery', 'update:statusFilter'])

const searchQuery = ref('')
const statusFilter = ref('All Status')
const statuses = ref(['Pending', 'Approved', 'Completed', 'Rejected'])

// Sync with parent
const updateSearchQuery = (value) => {
  searchQuery.value = value
  emit('update:searchQuery', value)
}
const updateStatusFilter = (value) => {
  statusFilter.value = value
  emit('update:statusFilter', value)
}

const filteredWithdrawals = computed(() => {
  return props.withdrawals.filter((withdrawal) => {
    const matchesSearch =
      !searchQuery.value ||
      (withdrawal.staffMember?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      withdrawal.reason?.toLowerCase().includes(searchQuery.value.toLowerCase()))
    const matchesDepartment =
      props.departmentFilter === 'AllDepartments' || withdrawal.department === props.departmentFilter
    const matchesStatus = statusFilter.value === 'All Status' || withdrawal.status === statusFilter.value
    return matchesSearch && matchesDepartment && matchesStatus
  })
})

const getStatusClasses = (status) => {
  const classes = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Approved: 'bg-blue-100 text-blue-800',
    Completed: 'bg-green-100 text-green-800',
    Rejected: 'bg-red-100 text-red-800',
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}
</script>