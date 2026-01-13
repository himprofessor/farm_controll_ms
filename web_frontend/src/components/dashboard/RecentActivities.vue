<template>
  <div class="bg-white rounded-lg shadow">
    <div class="p-6 border-b border-gray-200">
      <h3 class="text-lg font-medium text-gray-900">{{ $t('dashboard.recentActivities') }}</h3>
    </div>
    <div class="p-6">
      <div class="space-y-4">
        <div v-if="items.length" v-for="(activity, index) in items" :key="index" class="flex items-start space-x-3">
          <div :class="getIconClass(index)" class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">
            <svg v-if="index % 2 === 0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 text-white">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 text-white">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-gray-900">{{ activity }}</p>
            <p class="text-xs text-gray-500">{{ getTime(index) }}</p>
          </div>
        </div>
        <div v-else class="text-gray-500 text-sm">
          {{ $t('dashboard.noActivities') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { defineProps } from 'vue'

const { t } = useI18n()
const props = defineProps(['items'])

const getIconClass = (index) => (index % 2 === 0 ? 'bg-green-500' : 'bg-yellow-500')
const getTime = (index) => (index === 0 ? '2 hours ago' : '4 hours ago')
</script>