<template>
  <div :class="['rounded-xl shadow-md p-5 relative overflow-hidden', bg]">
    <!-- Icon -->
    <div class="absolute top-4 right-4" :class="isColored ? 'text-white' : textColor">
      <component :is="iconMap[icon]" class="w-6 h-6" />
    </div>

    <!-- Title -->
    <h2 class="font-semibold text-lg mb-1" :class="textColor">{{ title }}</h2>

    <!-- Main Value -->
    <div class="text-2xl font-bold mb-1" :class="textColor">{{ value }}</div>

    <!-- Either 'change' or 'desc' shown -->
    <p class="text-sm opacity-90" :class="textColor">
      {{ change || desc }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  Users,
  Wrench,
  Box,
  DollarSign,
  Archive,
  CreditCard,
  Settings,
  TrendingUp
} from 'lucide-vue-next'

const props = defineProps({
  title: String,
  value: String,
  change: String,
  desc: String,
  icon: String,
  bg: {
    type: String,
    default: 'bg-white'
  },
  textColor: {
    type: String,
    default: 'text-white'
  }
})

const iconMap = {
  users: Users,
  wrench: Wrench,
  box: Box,
  dollar: DollarSign,
  'dollar-sign': DollarSign,
  archive: Archive,
  'credit-card': CreditCard,
  settings: Settings,
  trending: TrendingUp
}

const isColored = computed(() => !props.bg.includes('white'))
</script>
