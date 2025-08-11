<template>
  <div class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4 bg-white p-6 rounded-lg shadow ">
    <!-- Search Input -->
    <div class="flex-1">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon class="h-5 w-5 text-gray-400" />
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
        class="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer w-full sm:w-auto"
      >
        <option value="">All Departments</option>
        <option value="Management">Management</option>
        <option value="Health">Health</option>
        <option value="Operations">Operations</option>
        <option value="Administration">Administration</option>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <ChevronDownIcon class="w-4 h-4 text-gray-400" />
      </div>
    </div>
    <!-- Status Filter -->
    <div class="relative">
      <select
        :value="selectedStatus"
        @change="$emit('update:selectedStatus', $event.target.value)"
        class="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer w-full sm:w-auto"
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <!-- <option value="On Leave">On Leave</option> -->
        <option value="inactive">Inactive</option>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <ChevronDownIcon class="w-4 h-4 text-gray-400" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { SearchIcon, ChevronDownIcon } from 'lucide-vue-next'

defineProps({
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
})

defineEmits(['update:searchQuery', 'update:selectedDepartment', 'update:selectedStatus'])
</script>

<style scoped>
/* Custom styles for select dropdown arrows */
select {
  background-image: none;
}
</style>