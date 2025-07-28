<template>
  <div class="p-6 bg-gray-100 rounded-lg shadow">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Staff Management</h1>
        <p class="text-gray-600">Manage your farm staff information and roles</p>
      </div>
      <button @click="openAddStaffModal" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center space-x-2">
        <PlusIcon class="w-4 h-4" />
        <span>Add Staff</span>
      </button>
    </div>

    <!-- Filters -->
    <StaffFilters
      v-model:searchQuery="searchQuery"
      v-model:selectedDepartment="selectedDepartment"
      v-model:selectedStatus="selectedStatus"
    />

    <!-- Staff Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StaffCard
        v-for="staff in filteredStaff"
        :key="staff.id"
        :staff="staff"
        @view="viewStaff"
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

import { PlusIcon } from 'lucide-vue-next'

const searchQuery = ref('')
const selectedDepartment = ref('')
const selectedStatus = ref('')

const staff = ref([
  {
    id: 1,
    name: 'John Smith',
    role: 'Farm Manager',
    email: 'john.smith@farm.com',
    phone: '+1 234-567-8901',
    startDate: '2022-01-15', // Changed to YYYY-MM-DD for date input compatibility
    department: 'Management',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Veterinarian',
    email: 'sarah.johnson@farm.com',
    phone: '+1 234-567-8902',
    startDate: '2022-03-20',
    department: 'Health',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Mike Davis',
    role: 'Farmhand',
    email: 'mike.davis@farm.com',
    phone: '+1 234-567-8903',
    startDate: '2023-01-10',
    department: 'Operations',
    status: 'On Leave'
  },
  {
    id: 4,
    name: 'Emily Wilson',
    role: 'Administrator',
    email: 'emily.wilson@farm.com',
    phone: '+1 234-567-8904',
    startDate: '2021-11-05',
    department: 'Administration',
    status: 'Active'
  }
])

const isFormModalVisible = ref(false)
const staffToEdit = ref(null) // Holds staff data for editing
const isConfirmDialogVisible = ref(false)
const staffToDelete = ref(null) // Holds staff data for deletion confirmation

const filteredStaff = computed(() => {
  let filtered = staff.value

  // Apply search query filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(member =>
      member.name.toLowerCase().includes(query) ||
      member.role.toLowerCase().includes(query) ||
      member.department.toLowerCase().includes(query)
    )
  }

  // Apply department filter
  if (selectedDepartment.value) {
    filtered = filtered.filter(member => member.department === selectedDepartment.value)
  }

  // Apply status filter
  if (selectedStatus.value) {
    filtered = filtered.filter(member => member.status === selectedStatus.value)
  }

  return filtered
})

const openAddStaffModal = () => {
  staffToEdit.value = null // Clear any previous edit data
  isFormModalVisible.value = true
}

const openEditStaffModal = (staffMember) => {
  staffToEdit.value = staffMember
  isFormModalVisible.value = true
}

const saveStaff = (newStaffData) => {
  if (newStaffData.id) {
    // Editing existing staff
    const index = staff.value.findIndex(s => s.id === newStaffData.id)
    if (index !== -1) {
      staff.value[index] = newStaffData
    }
  } else {
    // Adding new staff
    newStaffData.id = Date.now() // Simple ID generation
    staff.value.push(newStaffData)
  }
  isFormModalVisible.value = false
}

const viewStaff = (staffMember) => {
  // For viewing, you might open a read-only modal or navigate to a detail page.
  // For now, we'll just log it.
  console.log('View staff:', staffMember)
  alert(`Viewing Staff: ${staffMember.name}\nRole: ${staffMember.role}\nEmail: ${staffMember.email}`)
}

const openDeleteConfirmDialog = (staffMember) => {
  staffToDelete.value = staffMember
  isConfirmDialogVisible.value = true
}

const confirmDeleteStaff = () => {
  if (staffToDelete.value) {
    staff.value = staff.value.filter(s => s.id !== staffToDelete.value.id)
    staffToDelete.value = null
  }
  isConfirmDialogVisible.value = false
}
</script>