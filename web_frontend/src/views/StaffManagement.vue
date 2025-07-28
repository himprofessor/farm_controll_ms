<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Staff Management</h1>
        <p class="text-gray-600">Manage your farm staff information and roles</p>
      </div>
      <button class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center space-x-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        <span>Add Staff</span>
      </button>
    </div>

    <!-- Filters -->
    <div class="flex space-x-4 mb-6">
      <div class="flex-1">
        <input
          type="text"
          placeholder="Search by name, role, or department..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          v-model="searchQuery"
        />
      </div>
      <select class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
        <option>All Departments</option>
        <option>Management</option>
        <option>Health</option>
        <option>Operations</option>
        <option>Administration</option>
      </select>
      <select class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
        <option>All Status</option>
        <option>Active</option>
        <option>On Leave</option>
        <option>Inactive</option>
      </select>
    </div>

    <!-- Staff Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StaffCard
        v-for="staff in filteredStaff"
        :key="staff.id"
        :staff="staff"
        @view="viewStaff"
        @edit="editStaff"
        @delete="deleteStaff"
      />
    </div>
  </div>
</template>

<script>
import StaffCard from '../components/staff/StaffCard.vue'
import StaffFilters from '../components/staff/StaffFilters.vue'

export default {
  name: 'StaffManagement',
  components: {
    StaffCard
  },
  data() {
    return {
      searchQuery: '',
      staff: [
        {
          id: 1,
          name: 'John Smith',
          role: 'Farm Manager',
          email: 'john.smith@farm.com',
          phone: '+1 234-567-8901',
          startDate: '1/15/2022',
          department: 'Management',
          status: 'Active'
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          role: 'Veterinarian',
          email: 'sarah.johnson@farm.com',
          phone: '+1 234-567-8902',
          startDate: '3/20/2022',
          department: 'Health',
          status: 'Active'
        },
        {
          id: 3,
          name: 'Mike Davis',
          role: 'Farmhand',
          email: 'mike.davis@farm.com',
          phone: '+1 234-567-8903',
          startDate: '1/10/2023',
          department: 'Operations',
          status: 'On Leave'
        },
        {
          id: 4,
          name: 'Emily Wilson',
          role: 'Administrator',
          email: 'emily.wilson@farm.com',
          phone: '+1 234-567-8904',
          startDate: '11/5/2021',
          department: 'Administration',
          status: 'Active'
        }
      ]
    }
  },
  computed: {
    filteredStaff() {
      return this.staff.filter(member =>
        member.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        member.department.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  methods: {
    viewStaff(staff) {
      console.log('View staff:', staff)
    },
    editStaff(staff) {
      console.log('Edit staff:', staff)
    },
    deleteStaff(staff) {
      console.log('Delete staff:', staff)
    }
  }
}
</script>