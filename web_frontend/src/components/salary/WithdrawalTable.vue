<template>
 <div class="bg-white p-3 mb-6 rounded-lg shadow">
   <div class="px-6 py-4 border-b​ border-gray-200 flex justify-between items-center ">
    <div class="relative w-64">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
    <!-- Search and Filter Section -->


    <!-- Table Section -->
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Staff Member
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Amount
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Request Date
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Reason
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="withdrawal in filteredWithdrawals" :key="withdrawal.id">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {{ withdrawal.staffMember }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            ${{ withdrawal.amount.toLocaleString() }}
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
            <button v-if="withdrawal.status === 'Pending'" @click="$emit('approve', withdrawal)"
              class="text-green-600 hover:text-green-900">
              Approve
            </button>
            <button v-if="withdrawal.status === 'Pending'" @click="$emit('reject', withdrawal)"
              class="text-red-600 hover:text-red-900">
              Reject
            </button>
            <button v-if="withdrawal.status === 'Approved'" @click="$emit('complete', withdrawal)"
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
</template>

<script>
export default {
  name: 'WithdrawalTable',
  props: {
    withdrawals: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      searchQuery: '',
      departmentFilter: 'AllDepartments',
      statusFilter: 'All Status',
      departments: ['Finance', 'HR', 'IT', 'Operations', 'Marketing'],
      statuses: ['Pending', 'Approved', 'Completed', 'Rejected']
    }
  },
  computed: {
    filteredWithdrawals() {
      return this.withdrawals.filter(withdrawal => {
        const matchesSearch = this.searchQuery === '' ||
          withdrawal.staffMember.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          withdrawal.reason.toLowerCase().includes(this.searchQuery.toLowerCase())

        const matchesDepartment = this.departmentFilter === 'AllDepartments' ||
          withdrawal.department === this.departmentFilter

        const matchesStatus = this.statusFilter === 'All Status' ||
          withdrawal.status === this.statusFilter

        return matchesSearch && matchesDepartment && matchesStatus
      })
    }
  },
  methods: {
    getStatusClasses(status) {
      const classes = {
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Approved': 'bg-blue-100 text-blue-800',
        'Completed': 'bg-green-100 text-green-800',
        'Rejected': 'bg-red-100 text-red-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    }
  }
}
</script>