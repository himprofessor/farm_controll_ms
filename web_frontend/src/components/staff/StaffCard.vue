<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center space-x-3">
        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-user w-6 h-6 text-green-600"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div>
          <h3 class="text-lg font-medium text-gray-900">{{ $t('staff.name') }}: {{ staff.name }}</h3>
          <p class="text-sm text-gray-600">{{ $t('staff.role') }}: {{ staff.role }}</p>
        </div>
      </div>
      <span :class="statusClasses" class="px-2 py-1 text-xs font-medium rounded-full">
        {{ $t(`staff.status.${staff.status.toLowerCase()}`) || staff.status }}
      </span>
    </div>
    <div class="space-y-2 mb-4">
      <div class="flex items-center text-sm text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-mail w-4 h-4 mr-2"
        >
          <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
        </svg>
        {{ $t('staff.email') }}: {{ staff.email }}
      </div>
      <div class="flex items-center text-sm text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-phone w-4 h-4 mr-2"
        >
          <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
        </svg>
        {{ $t('staff.phone') }}: {{ staff.phone }}
      </div>
      <div class="flex items-center text-sm text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-calendar w-4 h-4 mr-2"
        >
          <path d="M8 2v4"></path><path d="M16 2v4"></path>
          <rect width="18" height="18" x="3" y="4" rx="2"></rect>
          <path d="M3 10h18"></path>
        </svg>
        {{ $t('staff.started') }}: {{ staff.start_date }}
      </div>
      <div class="flex items-center text-sm text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-building w-4 h-4 mr-2"
        >
          <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
          <path d="M9 22v-4h6v4"></path>
          <path d="M8 6h.01"></path><path d="M16 6h.01"></path>
          <path d="M12 6h.01"></path><path d="M12 10h.01"></path>
          <path d="M12 14h.01"></path><path d="M16 10h.01"></path>
          <path d="M16 14h.01"></path><path d="M8 10h.01"></path>
          <path d="M8 14h.01"></path>
        </svg>
        {{ $t('staff.department') }}: {{ staff.department }}
      </div>
    </div>
    <div class="flex space-x-2">
      <button
        @click="$emit('view', staff)"
        class="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded text-sm font-medium hover:bg-blue-100"
      >
        {{ $t('staff.view') }}
      </button>
      <button
        @click="$emit('edit', staff)"
        class="flex-1 bg-green-50 text-green-600 px-3 py-2 rounded text-sm font-medium hover:bg-green-100"
      >
        {{ $t('staff.edit') }}
      </button>
      <button
        @click="$emit('delete', staff)"
        class="bg-red-50 text-red-600 px-3 py-2 rounded text-sm font-medium hover:bg-red-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-trash-2 w-4 h-4"
        >
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          <line x1="10" x2="10" y1="11" y2="17"></line>
          <line x1="14" x2="14" y1="11" y2="17"></line>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps({
  staff: {
    type: Object,
    required: true
  }
})

const statusClasses = computed(() => {
  const classes = {
    'active': 'bg-green-100 text-green-800',
    'inactive': 'bg-gray-100 text-gray-800'
  }
  return classes[props.staff.status.toLowerCase()] || 'bg-gray-100 text-gray-800'
})
</script>