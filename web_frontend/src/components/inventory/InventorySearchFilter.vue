<template>
  <div class="flex space-x-4 mb-8">
    <div class="flex-1 relative">
      <SearchIcon class="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
      <input
        :value="searchQuery"
        @input="$emit('update:searchQuery', $event.target.value)"
        type="text"
        placeholder="Search items by name or supplier..."
        class="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
      />
    </div>
    <select
      :value="selectedCategory"
      @change="$emit('update:selectedCategory', $event.target.value)"
      class="px-6 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm min-w-[180px]"
    >
      <option value="">All Categories</option>
      <option value="Feed">Feed</option>
      <option value="Medication">Medication</option>
      <option value="Equipment">Equipment</option>
      <option value="Supplies">Supplies</option>
    </select>
  </div>
</template>

<script setup>
import { SearchIcon } from 'lucide-vue-next'

defineProps({
  searchQuery: String,
  selectedCategory: String
})

defineEmits(['update:searchQuery', 'update:selectedCategory'])
</script>