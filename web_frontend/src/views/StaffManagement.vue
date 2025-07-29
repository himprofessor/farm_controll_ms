<template>
  <div class="p-6 bg-gray-100 rounded-lg shadow">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Staff Management</h1>
        <p class="text-gray-600">
          Manage your farm staff information and roles
        </p>
      </div>
      <button
        @click="openAddStaffModal"
        class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center space-x-2"
      >
        <PlusIcon class="w-4 h-4" />
        <span>Add Staff</span>
      </button>
    </div>

    <!-- Filters -->
    <StaffFilters
      :search-query="searchQuery"
      @update:search-query="searchQuery = $event"
      :selected-department="selectedDepartment"
      @update:selected-department="selectedDepartment = $event"
      :selected-status="selectedStatus"
      @update:selected-status="selectedStatus = $event"
    />

    <!-- Staff Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StaffCard
        v-for="staff in filteredStaff"
        :key="staff.id"
        :staff="staff"
        @view="openViewStaffModal"
        @edit="openEditStaffModal"
        @delete="openDeleteConfirmDialog"
      />
    </div>

    <!-- Staff Form Modal -->
    <StaffFormModal
      :is-visible="isFormModalVisible"
      :staff-to-edit="staffToEdit"
      @close="isFormModalVisible = false"
      @save="saveStaff"
    />

    <!-- View Staff Modal -->
    <div v-if="isViewModalVisible" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button
          @click="isViewModalVisible = false"
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <XIcon class="w-6 h-6" />
        </button>
        <h2 class="text-2xl font-bold mb-6 text-gray-900">Staff Details</h2>
        
        <div class="space-y-4">
          <div class="flex items-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <UserIcon class="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 class="text-xl font-semibold">{{ viewedStaff.name }}</h3>
              <p class="text-gray-600">{{ viewedStaff.role }}</p>
              <span :class="getStatusClasses(viewedStaff.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                {{ viewedStaff.status }}
              </span>
            </div>
          </div>
          
          <div class="border-t border-gray-200 pt-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm font-medium text-gray-500">Email</p>
                <p class="text-gray-900">{{ viewedStaff.email }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Phone</p>
                <p class="text-gray-900">{{ viewedStaff.phone }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Department</p>
                <p class="text-gray-900">{{ viewedStaff.department }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Start Date</p>
                <p class="text-gray-900">{{ formatDate(viewedStaff.startDate) }}</p>
              </div>
            </div>
          </div>
          
          <div v-if="viewedStaff.notes" class="border-t border-gray-200 pt-4">
            <p class="text-sm font-medium text-gray-500">Additional Notes</p>
            <p class="text-gray-900">{{ viewedStaff.notes }}</p>
          </div>
        </div>
        
        <div class="mt-6 flex justify-end">
          <button
            @click="isViewModalVisible = false"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-red-500 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <ConfirmationDialog
      :is-visible="isConfirmDialogVisible"
      :message="`Are you sure you want to delete ${staffToDelete?.name}?`"
      @confirm="confirmDeleteStaff"
      @cancel="isConfirmDialogVisible = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import StaffCard from '@/components/staff/StaffCard.vue'
import StaffFilters from '@/components/staff/StaffFilters.vue'
import StaffFormModal from '@/components/staff/StaffFormModal.vue'
import ConfirmationDialog from '@/components/staff/ConfirmationDialog.vue'
import { PlusIcon, XIcon, UserIcon } from 'lucide-vue-next'

const searchQuery = ref("");
const selectedDepartment = ref("");
const selectedStatus = ref("");

const staff = ref([
  {
    id: 1,
    name: 'John Smith',
    role: 'Farm Manager',
    email: 'john.smith@farm.com',
    phone: '+1 234-567-8901',
    startDate: '2022-01-15',
    department: 'Management',
    status: 'Active',
    notes: 'Responsible for overall farm operations and management.'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Veterinarian',
    email: 'sarah.johnson@farm.com',
    phone: '+1 234-567-8902',
    startDate: '2022-03-20',
    department: 'Health',
    status: 'Active',
    notes: 'Specializes in livestock health and wellness.'
  },
  {
    id: 3,
    name: 'Mike Davis',
    role: 'Farmhand',
    email: 'mike.davis@farm.com',
    phone: '+1 234-567-8903',
    startDate: '2023-01-10',
    department: 'Operations',
    status: 'On Leave',
    notes: 'Currently on leave until June 2023.'
  },
  {
    id: 4,
    name: 'Emily Wilson',
    role: 'Administrator',
    email: 'emily.wilson@farm.com',
    phone: '+1 234-567-8904',
    startDate: '2021-11-05',
    department: 'Administration',
    status: 'Active',
    notes: 'Handles all administrative tasks and payroll.'
  }
])

const isFormModalVisible = ref(false)
const isViewModalVisible = ref(false)
const staffToEdit = ref(null)
const viewedStaff = ref({})
const isConfirmDialogVisible = ref(false)
const staffToDelete = ref(null)

const filteredStaff = computed(() => {
  let filtered = staff.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (member) =>
        member.name.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query) ||
        member.department.toLowerCase().includes(query)
    );
  }

  if (selectedDepartment.value) {
    filtered = filtered.filter(
      (member) => member.department === selectedDepartment.value
    );
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(
      (member) => member.status === selectedStatus.value
    );
  }

  return filtered;
});

const openAddStaffModal = () => {
  staffToEdit.value = null
  isFormModalVisible.value = true
}

const openEditStaffModal = (staffMember) => {
  staffToEdit.value = staffMember;
  isFormModalVisible.value = true;
};

const openViewStaffModal = (staffMember) => {
  viewedStaff.value = staffMember
  isViewModalVisible.value = true
}

const saveStaff = (newStaffData) => {
  if (newStaffData.id) {
    const index = staff.value.findIndex(s => s.id === newStaffData.id)
    if (index !== -1) {
      staff.value[index] = newStaffData;
    }
  } else {
    newStaffData.id = Date.now()
    staff.value.push(newStaffData)
  }
  isFormModalVisible.value = false;
};

const openDeleteConfirmDialog = (staffMember) => {
  staffToDelete.value = staffMember;
  isConfirmDialogVisible.value = true;
};

const confirmDeleteStaff = () => {
  if (staffToDelete.value) {
    staff.value = staff.value.filter((s) => s.id !== staffToDelete.value.id);
    staffToDelete.value = null;
  }
  isConfirmDialogVisible.value = false
}

const getStatusClasses = (status) => {
  const classes = {
    'Active': 'bg-green-100 text-green-800',
    'On Leave': 'bg-yellow-100 text-yellow-800',
    'Inactive': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>