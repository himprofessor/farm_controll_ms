<template>
  <div v-if="show" class="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300">
    {{ message }}
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  message: String
})
</script>