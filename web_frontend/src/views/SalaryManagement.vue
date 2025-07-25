<template>
  <div class="p-6 bg-gray-100 rounded-lg shadow">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Salary Management</h1>
      <p class="text-gray-600">Manage staff salaries and withdrawal requests</p>
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200 mb-6">
      <nav class="-mb-px flex space-x-8">
        <button @click="activeTab = 'salaries'" :class="[
          'py-2 px-1 border-b-2 font-medium text-sm',
          activeTab === 'salaries'
            ? 'border-green-500 text-green-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        ]">
          Staff Salaries
        </button>
        <button @click="activeTab = 'withdrawals'" :class="[
          'py-2 px-1 border-b-2 font-medium text-sm',
          activeTab === 'withdrawals'
            ? 'border-green-500 text-green-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        ]">
          Withdrawal Requests
        </button>
      </nav>
    </div>

    <!-- Staff Salaries Tab -->
    <div v-if="activeTab === 'salaries'">
      <div class="flex justify-between items-center mb-6 bg-white p-6 rounded-lg shadow">
        <input
          type="text"
          placeholder="Search staff by name or role..."
          class="w-[800px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          v-model="searchQuery"
        />

        <button @click="processAllSalaries" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          Process All Salaries
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SalaryCard
          v-for="staff in filteredStaff"
          :key="staff.id"
          :staff="staff"
          @pay-salary="paySalary"
          @view-details="openDetailsModal"
        />
      </div>
    </div>

    <!-- Withdrawal Requests Tab -->
    <div v-if="activeTab === 'withdrawals'">
      <WithdrawalTable
        :withdrawals="filteredWithdrawals"
        @approve="approveWithdrawal"
        @reject="rejectWithdrawal"
        @complete="completeWithdrawal"
      />
    </div>

    <!-- Details Modal -->
    <div
      v-if="showDetailsModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-6 max-w-lg w-full">
        <h2 class="text-2xl font-semibold mb-4">{{ selectedEmployee.name }}'s Details</h2>
        <div class="space-y-3">
          <p><strong>ID:</strong> {{ selectedEmployee.id }}</p>
          <p><strong>Position:</strong> {{ selectedEmployee.position }}</p>
          <p><strong>Base Salary:</strong> {{ formatCurrency(selectedEmployee.baseSalary) }}</p>
          <p><strong>Current Balance:</strong> {{ formatCurrency(selectedEmployee.currentBalance) }}</p>
          <p><strong>Total Earned:</strong> {{ formatCurrency(selectedEmployee.totalEarned) }}</p>
          <p><strong>Last Payment:</strong> {{ selectedEmployee.lastPayment }}</p>
          <!-- Project-specific details (farm-related example) -->
          <p><strong>Acres Managed:</strong> {{ selectedEmployee.acresManaged || 'N/A' }}</p>
          <p><strong>Crops Overseen:</strong> {{ selectedEmployee.crops || 'N/A' }}</p>
          <p><strong>Work Hours (Last Month):</strong> {{ selectedEmployee.workHours || 'N/A' }} hrs</p>
        </div>
        <button
          @click="showDetailsModal = false"
          class="mt-4 bg-green-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
        >
          Close
        </button>
      </div>
    </div>

    <!-- Success Modal for Processing Salaries -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 class="text-2xl font-semibold mb-4">Salary Processing Complete</h2>
        <div class="space-y-3">
          <p>All staff salaries have been processed as of {{ currentDate }}.</p>
          <ul>
            <li v-for="staff in staff" :key="staff.id" class="flex justify-between">
              <span>{{ staff.name }}</span>
              <span>{{ formatCurrency(staff.baseSalary) }} paid</span>
            </li>
          </ul>
        </div>
        <button
          @click="showSuccessModal = false"
          class="mt-4 bg-green-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SalaryCard from '../components/salary/SalaryCard.vue'
import WithdrawalTable from '../components/salary/WithdrawalTable.vue'

export default {
  name: 'SalaryManagement',
  components: {
    SalaryCard,
    WithdrawalTable
  },
  data() {
    return {
      activeTab: 'salaries',
      searchQuery: '',
      withdrawalSearch: '',
      staff: [
        {
          id: 1,
          name: 'John Smith',
          role: 'Farm Manager',
          baseSalary: 4500,
          currentBalance: 2340,
          totalEarned: 54000,
          lastPayment: '1/1/2024'
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          role: 'Veterinarian',
          baseSalary: 3800,
          currentBalance: 1890,
          totalEarned: 38000,
          lastPayment: '1/1/2024'
        },
        {
          id: 3,
          name: 'Mike Davis',
          role: 'Farmhand',
          baseSalary: 2800,
          currentBalance: 980,
          totalEarned: 25200,
          lastPayment: '1/1/2024'
        },
        {
          id: 4,
          name: 'Emily Wilson',
          role: 'Administrator',
          baseSalary: 3200,
          currentBalance: 1560,
          totalEarned: 32000,
          lastPayment: '1/1/2024'
        }
      ],
      withdrawals: [
        {
          id: 1,
          staffMember: 'John Smith',
          amount: 1500,
          requestDate: '1/15/2024',
          status: 'Pending',
          reason: 'Personal expenses'
        },
        {
          id: 2,
          staffMember: 'Sarah Johnson',
          amount: 800,
          requestDate: '1/14/2024',
          status: 'Approved',
          reason: 'Medical bills'
        },
        {
          id: 3,
          staffMember: 'Mike Davis',
          amount: 500,
          requestDate: '1/13/2024',
          status: 'Completed',
          reason: 'Family support'
        },
        {
          id: 4,
          staffMember: 'Emily Wilson',
          amount: 1200,
          requestDate: '1/12/2024',
          status: 'Rejected',
          reason: 'Home renovation'
        }
      ],
      showDetailsModal: false,
      showSuccessModal: false,
      selectedEmployee: {}
    }
  },
  computed: {
    filteredStaff() {
      return this.staff.filter(member =>
        member.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
    filteredWithdrawals() {
      return this.withdrawals.filter(withdrawal =>
        withdrawal.staffMember.toLowerCase().includes(this.withdrawalSearch.toLowerCase()) ||
        withdrawal.reason.toLowerCase().includes(this.withdrawalSearch.toLowerCase())
      )
    },
    currentDate() {
      return new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    }
  },
  methods: {
    paySalary(staff) {
      console.log('Pay salary for:', staff)
    },
    openDetailsModal(staff) {
      this.selectedEmployee = staff
      this.showDetailsModal = true
    },
    approveWithdrawal(withdrawal) {
      console.log('Approve withdrawal:', withdrawal)
    },
    rejectWithdrawal(withdrawal) {
      console.log('Reject withdrawal:', withdrawal)
    },
    completeWithdrawal(withdrawal) {
      console.log('Complete withdrawal:', withdrawal)
    },
    processAllSalaries() {
      const currentDate = this.currentDate;
      this.staff.forEach(staff => {
        staff.currentBalance += staff.baseSalary;
        staff.totalEarned += staff.baseSalary;
        staff.lastPayment = currentDate;
      });
      this.showSuccessModal = true;
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount)
    }
  }
}
</script>

<style scoped>
/* Add any scoped styles if needed */
</style>