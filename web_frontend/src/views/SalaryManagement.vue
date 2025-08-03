<template>
  <div class="p-6 bg-gray-100 rounded-lg shadow max-w-screen-xl mx-auto">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Salary Management</h1>
      <p class="text-gray-600">Manage staff salaries and withdrawal requests</p>
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200 mb-6">
      <nav class="flex space-x-8 -mb-px" role="tablist">
        <button
          role="tab"
          :aria-selected="activeTab === 'salaries'"
          @click="activeTab = 'salaries'"
          :class="tabClasses('salaries')"
        >
          Staff Salaries
        </button>
        <button
          role="tab"
          :aria-selected="activeTab === 'withdrawals'"
          @click="activeTab = 'withdrawals'"
          :class="tabClasses('withdrawals')"
        >
          Withdrawal Requests
        </button>
      </nav>
    </div>

    <!-- Staff Salaries Tab -->
    <div v-if="activeTab === 'salaries'">
      <div
        class="flex flex-col lg:flex-row justify-between items-center mb-6 bg-white p-6 rounded-lg shadow space-y-4 lg:space-y-0 lg:space-x-6"
      >
        <input
          type="text"
          placeholder="Search staff by name, role, or base salary..."
          class="w-full lg:w-[800px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          v-model="searchQuery"
        />
        <button
          @click="processAllSalaries"
          class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Process All Salaries
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SalaryCard
          v-for="employee in filteredStaff"
          :key="employee.id"
          :employee="employee"
          @payment-processed="handlePaymentProcessed"
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

    <!-- Employee Details Modal -->
    <div
      v-if="showDetailsModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-lg w-full">
        <h2 class="text-2xl font-semibold mb-4">
          {{ selectedEmployee.name }}'s Details
        </h2>
        <div class="space-y-2 text-sm">
          <p><strong>ID:</strong> {{ selectedEmployee.id }}</p>
          <p><strong>Role:</strong> {{ selectedEmployee.role }}</p>
          <p>
            <strong>Base Salary:</strong>
            {{ formatCurrency(selectedEmployee.baseSalary) }}
          </p>
          <p>
            <strong>Current Balance:</strong>
            {{ formatCurrency(selectedEmployee.currentBalance) }}
          </p>
          <p>
            <strong>Total Earned:</strong>
            {{ formatCurrency(selectedEmployee.totalEarned) }}
          </p>
          <p>
            <strong>Last Payment:</strong> {{ selectedEmployee.lastPayment }}
          </p>
          <p>
            <strong>Acres Managed:</strong>
            {{ selectedEmployee.acresManaged || "N/A" }}
          </p>
          <p>
            <strong>Crops Overseen:</strong>
            {{ selectedEmployee.crops || "N/A" }}
          </p>
          <p>
            <strong>Work Hours:</strong>
            {{ selectedEmployee.workHours || "N/A" }} hrs
          </p>
        </div>
        <button
          @click="showDetailsModal = false"
          class="mt-4 bg-green-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition"
        >
          Close
        </button>
      </div>
    </div>

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 class="text-2xl font-semibold mb-4">Salary Processing Complete</h2>
        <p class="mb-4">All staff salaries processed on {{ currentDate }}.</p>
        <ul class="space-y-2 text-sm">
          <li
            v-for="staff in staffList"
            :key="staff.id"
            class="flex justify-between"
          >
            <span>{{ staff.name }}</span>
            <span>{{ formatCurrency(staff.baseSalary) }} paid</span>
          </li>
        </ul>
        <button
          @click="showSuccessModal = false"
          class="mt-4 bg-green-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import SalaryCard from "@/components/salary/SalaryCard.vue";
import WithdrawalTable from "@/components/salary/WithdrawalTable.vue";

// Reactive state
const activeTab = ref("salaries");
const searchQuery = ref("");
const withdrawalSearch = ref("");
const showDetailsModal = ref(false);
const showSuccessModal = ref(false);
const selectedEmployee = ref({});

// Staff data
const staffList = ref([
  {
    id: 1,
    name: "John Smith",
    role: "Farm Manager",
    baseSalary: 4500,
    currentBalance: 2340,
    totalEarned: 54000,
    lastPayment: "2024-01-01",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Veterinarian",
    baseSalary: 3800,
    currentBalance: 1890,
    totalEarned: 38000,
    lastPayment: "2024-01-01",
  },
  {
    id: 3,
    name: "Mike Davis",
    role: "Farmhand",
    baseSalary: 2800,
    currentBalance: 980,
    totalEarned: 25200,
    lastPayment: "2024-01-01",
  },
  {
    id: 4,
    name: "Emily Wilson",
    role: "Administrator",
    baseSalary: 3200,
    currentBalance: 1560,
    totalEarned: 32000,
    lastPayment: "2024-01-01",
  },
]);

// Withdrawal data
const withdrawals = ref([
  {
    id: 1,
    staffMember: "John Smith",
    amount: 1500,
    requestDate: "2024-01-15",
    status: "Pending",
    reason: "Personal expenses",
  },
  {
    id: 2,
    staffMember: "Sarah Johnson",
    amount: 800,
    requestDate: "2024-01-14",
    status: "Approved",
    reason: "Medical bills",
  },
  {
    id: 3,
    staffMember: "Mike Davis",
    amount: 500,
    requestDate: "2024-01-13",
    status: "Completed",
    reason: "Family support",
  },
  {
    id: 4,
    staffMember: "Emily Wilson",
    amount: 1200,
    requestDate: "2024-01-12",
    status: "Rejected",
    reason: "Home renovation",
  },
]);

// Computed filters
const filteredStaff = computed(() =>
  staffList.value.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      member.baseSalary.toString().includes(searchQuery.value)
  )
);

const filteredWithdrawals = computed(() =>
  withdrawals.value.filter(
    (w) =>
      w.staffMember
        .toLowerCase()
        .includes(withdrawalSearch.value.toLowerCase()) ||
      w.reason.toLowerCase().includes(withdrawalSearch.value.toLowerCase())
  )
);

const currentDate = computed(() =>
  new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
);

// UI helpers
function tabClasses(tab) {
  return [
    "py-2 px-1 border-b-2 font-medium text-sm",
    activeTab.value === tab
      ? "border-green-500 text-green-600"
      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
  ];
}

// Event handlers
function openDetailsModal(employee) {
  selectedEmployee.value = { ...employee };
  showDetailsModal.value = true;
}

function handlePaymentProcessed(info) {
  console.log("Salary payment processed:", info);
}

function processAllSalaries() {
  staffList.value.forEach((staff) => {
    staff.currentBalance += staff.baseSalary;
    staff.totalEarned += staff.baseSalary;
    staff.lastPayment = currentDate.value;
  });
  showSuccessModal.value = true;
}
function approveWithdrawal(withdrawal) {
  console.log("Approved:", withdrawal);
}
function rejectWithdrawal(withdrawal) {
  console.log("Rejected:", withdrawal);
}
function completeWithdrawal(withdrawal) {
  console.log("Completed:", withdrawal);
}
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
</script>
