<template>
  <div class="p-6 bg-gray-100 rounded-lg shadow">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Staff Management</h1>
        <p class="text-gray-600">Manage your farm staff information and roles</p>
      </div>
      <button @click="openAddStaffModal"
        class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center space-x-2">
        <PlusIcon class="w-4 h-4" />
        <span>Add Staff</span>
      </button>
    </div>

    <!-- Filters -->
    <StaffFilters v-model:searchQuery="searchQuery" v-model:selectedDepartment="selectedDepartment"
      v-model:selectedStatus="selectedStatus" />

    <!-- Staff Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StaffCard v-for="staffMember in filteredStaff" :key="staffMember.id" :staff="staffMember"
        @view="openViewStaffModal" @edit="openEditStaffModal" @delete="openDeleteConfirmDialog" />
    </div>

    <!-- Staff Form Modal -->
    <StaffFormModal :is-visible="isFormModalVisible" :staff-to-edit="staffToEdit" @close="closeFormModal"
      @save="handleSaveStaff" />

    <!-- View Staff Modal -->
    <div v-if="isViewModalVisible"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button @click="isViewModalVisible = false" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <XIcon class="w-6 h-6" />
        </button>
        <h2 class="text-2xl font-bold mb-6 text-gray-900">Staff Details</h2>
        <div class="space-y-4">
          <div class="flex items-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <UserIcon class="w-8 h-8 text-green-600" />
            </div>
            <div>
              <div class="flex items-center space-x-4">
                <h3 class="text-xl font-semibold">{{ viewedStaff.name || 'N/A' }}</h3>
                <span class="text-gray-600">•</span>
                <p class="text-gray-600">{{ viewedStaff.role || 'N/A' }}</p>
              </div>
              <div class="flex items-center space-x-4 mt-1">
                <p class="text-gray-600">{{ viewedStaff.email || 'N/A' }}</p>
                <span class="text-gray-600">•</span>
                <p class="text-gray-600">{{ viewedStaff.phone || 'N/A' }}</p>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm font-medium text-gray-500">Department</p>
                <p class="text-gray-900">{{ viewedStaff.department || 'N/A' }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Status</p>
                <p class="text-gray-900">{{ viewedStaff.status || 'N/A' }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Start Date</p>
                <p class="text-gray-900">{{ formatDate(viewedStaff.start_date) }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button @click="isViewModalVisible = false"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100">
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <ConfirmationDialog :is-visible="isConfirmDialogVisible"
      :message="`Are you sure you want to delete ${staffToDelete?.name || 'this staff member'}?`"
      @confirm="confirmDeleteStaff" @cancel="isConfirmDialogVisible = false" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import StaffCard from '@/components/staff/StaffCard.vue'
import StaffFilters from '@/components/staff/StaffFilters.vue'
import StaffFormModal from '@/components/staff/StaffFormModal.vue'
import ConfirmationDialog from '@/components/staff/ConfirmationDialog.vue'
import { PlusIcon, XIcon, UserIcon } from 'lucide-vue-next'
import API from '@/plugin/axios'

// Reactive state
const searchQuery = ref('')
const selectedDepartment = ref('')
const selectedStatus = ref('')
const staff = ref([])
const isFormModalVisible = ref(false)
const isViewModalVisible = ref(false)
const staffToEdit = ref(null)
const viewedStaff = ref({})
const isConfirmDialogVisible = ref(false)
const staffToDelete = ref(null)

// Load initial staff data
onMounted(async () => {
  try {
    const response = await API.get('/staff')
    staff.value = response.data || []
  } catch (error) {
    console.error('Failed to load staff:', error)
    staff.value = []
  }
})

// Computed filtered staff
const filteredStaff = computed(() => {
  return staff.value.filter(member => {
    const matchesSearch = searchQuery.value
      ? (member.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        member.role?.toLowerCase().includes(searchQuery.value.toLowerCase()))
      : true
    const matchesDept = selectedDepartment.value ? member.department === selectedDepartment.value : true
    const matchesStatus = selectedStatus.value ? member.status === selectedStatus.value : true
    return matchesSearch && matchesDept && matchesStatus
  })
})

// Modal handlers
const openAddStaffModal = () => {
  staffToEdit.value = null
  isFormModalVisible.value = true
}

const openEditStaffModal = (staffMember) => {
  staffToEdit.value = staffMember
  isFormModalVisible.value = true
}

const openViewStaffModal = (staffMember) => {
  viewedStaff.value = staffMember
  isViewModalVisible.value = true
}

const closeFormModal = () => {
  isFormModalVisible.value = false
  staffToEdit.value = null
}

// Optimistic save handler (Add/Edit)
const handleSaveStaff = async (newStaffData) => {
  if (staffToEdit.value) {
    // Edit: update UI immediately
    const index = staff.value.findIndex(s => s.id === staffToEdit.value.id)
    if (index !== -1) staff.value[index] = { ...staff.value[index], ...newStaffData }
  } else {
    // Add: temporary staff object for instant UI update
    const tempId = Date.now()
    staff.value.unshift({ ...newStaffData, id: tempId })
  }

  closeFormModal()

  try {
    if (staffToEdit.value) {
      // API update
      const response = await API.put(`/staff/${staffToEdit.value.id}`, newStaffData)
      const index = staff.value.findIndex(s => s.id === staffToEdit.value.id)
      if (index !== -1) staff.value[index] = response.data
    } else {
      // API create
      const response = await API.post('/staff', newStaffData)
      const tempIndex = staff.value.findIndex(s => s.id === tempId)
      if (tempIndex !== -1) staff.value[tempIndex] = response.data
    }
  } catch (error) {
    console.error("Error saving staff:", error)
    if (staffToEdit.value) {
      const res = await API.get('/staff')
      staff.value = res.data
    } else {
      staff.value = staff.value.filter(s => s.id !== tempId)
    }
  }
}

// Delete staff
const openDeleteConfirmDialog = (staffMember) => {
  staffToDelete.value = staffMember
  isConfirmDialogVisible.value = true
}

const confirmDeleteStaff = async () => {
  if (!staffToDelete.value) return

  const deletedStaff = staffToDelete.value
  staff.value = staff.value.filter(s => s.id !== deletedStaff.id)
  staffToDelete.value = null
  isConfirmDialogVisible.value = false

  try {
    await API.delete(`/staff/${deletedStaff.id}`)
  } catch (error) {
    console.error('Error deleting staff:', error)
    staff.value.push(deletedStaff)
  }
}

// Helper
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  try {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  } catch {
    return dateString
  }
}
</script>

<style scoped>
/* Base styles for all devices */
.p-6 {
  padding: 1.5rem;
}

.bg-gray-100 {
  background-color: #f3f4f6;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
}

/* Header styles */
.text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}

.text-gray-900 {
  color: #111827;
}

.text-gray-600 {
  color: #4b5563;
}

.bg-green-500 {
  background-color: #22c55e;
}

.bg-green-600 {
  background-color: #16a34a;
}

.text-white {
  color: #ffffff;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.space-x-2>*+* {
  margin-left: 0.5rem;
}

/* Grid for staff cards */
.grid {
  display: grid;
  gap: 1.5rem;
}

/* Modal styles */
.fixed {
  position: fixed;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.bg-gray-600 {
  background-color: #4b5563;
}

.bg-opacity-50 {
  background-opacity: 0.5;
}

.z-50 {
  z-index: 50;
}

.max-w-md {
  max-width: 28rem;
}

.w-full {
  width: 100%;
}

.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

.space-y-4>*+* {
  margin-top: 1rem;
}

.border-t {
  border-top: 1px solid #e5e7eb;
}

.border-gray-200 {
  border-color: #e5e7eb;
}

.pt-4 {
  padding-top: 1rem;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.font-medium {
  font-weight: 500;
}

.text-gray-500 {
  color: #6b7280;
}

.mt-6 {
  margin-top: 1.5rem;
}

.border {
  border: 1px solid #d1d5db;
}

.border-gray-300 {
  border-color: #d1d5db;
}

.rounded-md {
  border-radius: 0.375rem;
}

.shadow-sm {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.text-gray-700 {
  color: #374151;
}

.bg-gray-100:hover {
  background-color: #f3f4f6;
}

/* Responsive adjustments */

/* Mobile devices (up to 640px) */
@media (max-width: 640px) {
  .p-6 {
    padding: 1rem;
  }

  .text-3xl {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .text-2xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .max-w-md {
    max-width: 90%;
  }

  .px-4 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .w-16 {
    width: 3rem;
    height: 3rem;
  }

  .w-8 {
    width: 1.5rem;
    height: 1.5rem;
  }

  .text-xl {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }

  .text-sm {
    font-size: 0.8125rem;
  }

  .mb-6 {
    margin-bottom: 1rem;
  }
}

/* Tablet devices (641px to 1024px) */
@media (min-width: 641px) and (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .p-6 {
    padding: 1.25rem;
  }

  .text-3xl {
    font-size: 1.75rem;
  }

  .max-w-md {
    max-width: 80%;
  }
}

/* Desktop devices (1025px and above) */
@media (min-width: 1025px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>