<template>
  <div class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
    <div class="relative flex-1 w-full bg-white">
      <SearchIcon class="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
      <input
        v-model="searchQuery"
        placeholder="Search by name, category, status, stock, supplier..."
        class="w-full pl-8 pr-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        @input="debouncedSearch"
      />
    </div>
    <div class="relative w-full sm:w-auto">
      <select
        v-model="selectedCategory"
        class="w-full py-1 pl-3 pr-6 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        @change="onCategoryChange"
      >
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
      <ChevronDownIcon class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
    </div>
  </div>
</template>

<script setup>
import { SearchIcon, ChevronDownIcon } from 'lucide-vue-next'
import { debounce } from 'lodash' // Ensure lodash is installed (npm install lodash)

defineProps({ categories: Array })
const searchQuery = defineModel('searchQuery', { type: String })
const selectedCategory = defineModel('selectedCategory', { type: String })

// Debounce the search input to limit updates
const debouncedSearch = debounce((event) => {
  console.log('Debounced Search Value:', event.target.value) // Debug log
  searchQuery.value = event.target.value
}, 300)

// Handle category change manually to avoid unnecessary fetch
const onCategoryChange = (event) => {
  selectedCategory.value = event.target.value
  console.log('Category Changed:', selectedCategory.value) // Debug log
}

// No need to expose fetchInventory here since filtering is client-side
</script>