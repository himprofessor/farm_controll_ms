<template>
  <div class="flex space-x-4 mb-6">
    <!-- Search Input -->
    <div class="flex-1">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input
          type="text"
          :value="searchQuery"
          @input="$emit('update:searchQuery', $event.target.value)"
          placeholder="Search by name, role, or department..."
          class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
        />
      </div>
    </div>

    <!-- Department Filter -->
    <div class="relative">
      <select
        :value="selectedDepartment"
        @change="$emit('update:selectedDepartment', $event.target.value)"
        class="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer"
      >
        <option value="">All Departments</option>
        <option value="Management">Management</option>
        <option value="Health">Health</option>
        <option value="Operations">Operations</option>
        <option value="Administration">Administration</option>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>

    <!-- Status Filter -->
    <div class="relative">
      <select
        :value="selectedStatus"
        @change="$emit('update:selectedStatus', $event.target.value)"
        class="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer"
      >
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="On Leave">On Leave</option>
        <option value="Inactive">Inactive</option>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StaffFilters',
  props: {
    searchQuery: {
      type: String,
      default: ''
    },
    selectedDepartment: {
      type: String,
      default: ''
    },
    selectedStatus: {
      type: String,
      default: ''
    }
  },
  emits: ['update:searchQuery', 'update:selectedDepartment', 'update:selectedStatus']
}
</script>

<style scoped>
/* Custom styles for select dropdown arrows */
select {
  background-image: none;
}

/* Focus styles */
input:focus,
select:focus {
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

/* Hover effects */
select:hover {
  border-color: #d1d5db;
}

input:hover {
  border-color: #d1d5db;
}
</style>
