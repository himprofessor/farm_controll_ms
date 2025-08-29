<template>
  <div class="bg-white p-6 rounded-lg shadow-sm border">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-600 mb-1">{{ $t(title) }}</p>
        <p class="text-3xl font-bold text-gray-900">{{ value }}</p>
        <p :class="['text-sm mt-1', changeColor]">{{ change }}</p>
      </div>
      <div :class="['w-12 h-12 rounded-lg flex items-center justify-center', iconBg]">
        <component :is="icon" class="w-6 h-6" :class="iconColor" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: String,
  change: String,
  icon: Object,
  iconColor: String,
  iconBg: String,
  changeColor: String
})
</script>