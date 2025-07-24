<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
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
        <tr v-for="withdrawal in withdrawals" :key="withdrawal.id">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {{ withdrawal.staffMember }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            ${{ withdrawal.amount.toLocaleString() }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ withdrawal.requestDate }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span :class="getStatusClasses(withdrawal.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
              {{ withdrawal.status }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ withdrawal.reason }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
            <button
              v-if="withdrawal.status === 'Pending'"
              @click="$emit('approve', withdrawal)"
              class="text-green-600 hover:text-green-900"
            >
              Approve
            </button>
            <button
              v-if="withdrawal.status === 'Pending'"
              @click="$emit('reject', withdrawal)"
              class="text-red-600 hover:text-red-900"
            >
              Reject
            </button>
            <button
              v-if="withdrawal.status === 'Approved'"
              @click="$emit('complete', withdrawal)"
              class="text-blue-600 hover:text-blue-900"
            >
              Complete
            </button>
            <span v-if="withdrawal.status === 'Completed'" class="text-gray-500">
              No actions
            </span>
            <span v-if="withdrawal.status === 'Rejected'" class="text-gray-500">
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
      required: true
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
    }
  }
}
</script>