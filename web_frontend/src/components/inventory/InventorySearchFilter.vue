<!-- InventorySearchFilter.vue -->
<template>
  <div class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4 bg-white p-6 rounded-lg shadow">
    <div class="relative flex-1 w-full">
      <SearchIcon class="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
      <input
        v-model="searchQuery"
        :placeholder="$t('inventory.searchPlaceholder')"
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
        <option value="">{{ $t('inventory.allCategories') }}</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ $t(`inventory.categories.${category}`) }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { SearchIcon } from 'lucide-vue-next'
import { debounce } from 'lodash'

defineProps({ categories: Array })
const searchQuery = defineModel('searchQuery', { type: String })
const selectedCategory = defineModel('selectedCategory', { type: String })
const emit = defineEmits(['update:searchQuery', 'update:selectedCategory'])

const debouncedSearch = debounce((event) => {
  emit('update:searchQuery', event.target.value)
}, 300)

const onCategoryChange = (event) => {
  emit('update:selectedCategory', event.target.value)
}
</script>