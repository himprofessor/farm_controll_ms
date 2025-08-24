<template>
  <div class="p-6 bg-gray-100 rounded-lg shadow">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">{{ $t('staff.title') }}</h1>
        <p class="text-gray-600">{{ $t('staff.subtitle') }}</p>
      </div>
      <button 
        @click="openAddStaffModal"
        class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center space-x-2"
      >
        <PlusIcon class="w-4 h-4" />
        <span>{{ $t('staff.addStaff') }}</span>
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
        <h2 class="text-2xl font-bold mb-6 text-gray-900">{{ $t('staff.viewDetails') }}</h2>
        <div class="space-y-4">
          <div class="flex items-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <UserIcon class="w-8 h-8 text-green-600" />
            </div>
            <div>
              <div class="flex items-center space-x-4">
                <h3 class="text-xl font-semibold">{{ viewedStaff.name || $t('staff.na') }}</h3>
                <span class="text-gray-600">•</span>
                <p class="text-gray-600">{{ viewedStaff.role || $t('staff.na') }}</p>
              </div>
              <div class="flex items-center space-x-4 mt-1">
                <p class="text-gray-600">{{ viewedStaff.email || $t('staff.na') }}</p>
                <span class="text-gray-600">•</span>
                <p class="text-gray-600">{{ viewedStaff.phone || $t('staff.na') }}</p>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm font-medium text-gray-500">{{ $t('staff.department') }}</p>
                <p class="text-gray-900">{{ viewedStaff.department || $t('staff.na') }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">{{ $t('staff.status') }}</p>
                <p class="text-gray-900">{{ $t(`staff.status.${viewedStaff.status?.toLowerCase() || ''}`) || viewedStaff.status || $t('staff.na') }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">{{ $t('staff.startDate') }}</p>
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
            {{ $t('staff.close') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <ConfirmationDialog 
      :is-visible="isConfirmDialogVisible"
      :message="`Are you sure you want to delete ${staffToDelete?.name || $t('staff.thisStaff')}?`" 
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
const staff = ref([
  { id: 1, name: 'ya', role: 'worker', email: 'ya@mailinator.com', phone: '0123456871', start_date: '2022-10-07', department: 'Administration', status: 'inactive' },
  { id: 2, name: 'mealea', role: 'manager', email: 'rexeqefis@mailinator.com', phone: '087654345', start_date: '2024-12-29', department: 'Management', status: 'active' },
  { id: 3, name: 'Aiko Mccarthy', role: 'manager', email: 'guzited@mailinator.com', phone: '+1 (781) 934-8385', start_date: '2004-05-03', department: 'Administration', status: 'inactive' },
  { id: 4, name: 'ya', role: 'manager', email: 'yayaaa@gmail.com', phone: '23456789', start_date: '2025-08-23', department: 'Health', status: 'active' }
])
const isFormModalVisible = ref(false)
const isViewModalVisible = ref(false)
const staffToEdit = ref(null)
const viewedStaff = ref({})
const isConfirmDialogVisible = ref(false)
const staffToDelete = ref(null)

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
    const index = staff.value.findIndex(s => s.id === staffToEdit.value.id)
    if (index !== -1) staff.value[index] = { ...staff.value[index], ...newStaffData }
  } else {
    const tempId = Date.now()
    staff.value.unshift({ ...newStaffData, id: tempId })
  }

  closeFormModal()
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
}

// Helper
const formatDate = (dateString) => {
  if (!dateString) return $t('staff.na')
  try {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  } catch {
    return dateString
  }
}
</script>