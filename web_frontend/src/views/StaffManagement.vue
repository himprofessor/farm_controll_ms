<template>
  <div class="p-6 bg-gray-100 rounded-lg shadow">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Staff Management</h1>
        <p class="text-gray-600">Manage your farm staff information and roles</p>
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
      v-model:searchQuery="searchQuery" 
      v-model:selectedDepartment="selectedDepartment"
      v-model:selectedStatus="selectedStatus" 
    />

    <!-- Staff Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StaffCard 
        v-for="staffMember in filteredStaff" 
        :key="staffMember.id" 
        :staff="staffMember" 
        @view="openViewStaffModal"
        @edit="openEditStaffModal" 
        @delete="openDeleteConfirmDialog" 
      />
    </div>

    <!-- Staff Form Modal -->
    <StaffFormModal 
      :is-visible="isFormModalVisible" 
      :staff-to-edit="staffToEdit" 
      @close="closeFormModal"
      @save="handleSaveStaff" 
    />

    <!-- View Staff Modal -->
    <div 
      v-if="isViewModalVisible"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
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
          <button 
            @click="isViewModalVisible = false"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <ConfirmationDialog 
      :is-visible="isConfirmDialogVisible"
      :message="`Are you sure you want to delete ${staffToDelete?.name || 'this staff member'}?`" 
      @confirm="confirmDeleteStaff"
      @cancel="isConfirmDialogVisible = false" 
    />
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
