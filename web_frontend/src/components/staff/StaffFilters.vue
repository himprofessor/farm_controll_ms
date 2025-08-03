<template>
  <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
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
          :placeholder="$t('staffFilters.searchPlaceholder')"
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
        <option value="">{{ $t('staffFilters.allDepartments') }}</option>
        <option value="Management">{{ $t('departments.management') }}</option>
        <option value="Health">{{ $t('departments.health') }}</option>
        <option value="Operations">{{ $t('departments.operations') }}</option>
        <option value="Administration">{{ $t('departments.administration') }}</option>
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
        <option value="">{{ $t('staffFilters.allStatus') }}</option>
        <option value="Active">{{ $t('staffStatus.active') }}</option>
        <option value="On Leave">{{ $t('staffStatus.on_leave') }}</option>
        <option value="Inactive">{{ $t('staffStatus.inactive') }}</option>
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
    default: '',
  },
  selectedDepartment: {
    type: String,
    default: '',
  },
  selectedStatus: {
    type: String,
    default: '',
  },
})

defineEmits(['update:searchQuery', 'update:selectedDepartment', 'update:selectedStatus'])
</script>

<style scoped>
/* Custom styles for select dropdown arrows */
select {
  background-image: none;
}
</style>