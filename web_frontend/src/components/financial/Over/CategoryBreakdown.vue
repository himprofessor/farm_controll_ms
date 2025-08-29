<template>
  <div class="bg-white p-6 rounded-lg shadow-sm border">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ $t(title) }}</h3>
    <div class="space-y-4">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center justify-between"
      >
        <span class="text-gray-600">{{ item.label }}</span>
        <span :class="['font-semibold', valueColor]">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  items: Array,
  valueColor: String
})
</script>