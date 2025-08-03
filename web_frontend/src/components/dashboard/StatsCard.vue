<template>
  <div :class="['p-4 rounded-lg shadow', bg, textColor || 'text-white']">
    <div class="flex items-center space-x-3">
      <span class="material-icons" :class="textColor || 'text-white'">{{ icon }}</span>
      <div>
        <h3 class="text-lg font-semibold">{{ title }}</h3>
        <p class="text-2xl font-bold">{{ value }}</p>
        <p v-if="change" class="text-sm">{{ change }}</p>
        <p v-if="desc" class="text-sm">{{ desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: String,
  change: String,
  desc: String,
  icon: String,
  bg: String,
  textColor: String,
})
</script>