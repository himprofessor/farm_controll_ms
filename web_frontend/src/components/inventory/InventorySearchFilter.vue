<template>
  <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
    <!-- Search Input -->
    <div class="relative flex-1 w-full">
      <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
      <input
        type="text"
        :value="searchQuery"
        @input="$emit('update:searchQuery', $event.target.value)"
        placeholder="Search items by name or supplier..."
        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>

    <!-- Category Dropdown -->
    <div class="relative w-full sm:w-auto">
      <select
        :value="selectedCategory"
        @change="$emit('update:selectedCategory', $event.target.value)"
        class="appearance-none w-full py-2 pl-4 pr-10 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">All Categories</option>
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
      <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
    </div>
  </div>
</template>

<script setup>
import { SearchIcon, ChevronDownIcon } from 'lucide-vue-next'

defineProps({
  searchQuery: String,
  selectedCategory: String,
  categories: Array
})

defineEmits(['update:searchQuery', 'update:selectedCategory'])
</script>
