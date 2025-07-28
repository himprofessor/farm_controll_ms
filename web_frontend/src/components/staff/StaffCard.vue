<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center space-x-3">
        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <UserIcon class="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h3 class="text-lg font-medium text-gray-900">{{ staff.name }}</h3>
          <p class="text-sm text-gray-600">{{ staff.role }}</p>
        </div>
      </div>
      <span :class="statusClasses" class="px-2 py-1 text-xs font-medium rounded-full">
        {{ staff.status }}
      </span>
    </div>
    <div class="space-y-2 mb-4">
      <div class="flex items-center text-sm text-gray-600">
        <MailIcon class="w-4 h-4 mr-2" />
        {{ staff.email }}
      </div>
      <div class="flex items-center text-sm text-gray-600">
        <PhoneIcon class="w-4 h-4 mr-2" />
        {{ staff.phone }}
      </div>
      <div class="flex items-center text-sm text-gray-600">
        <CalendarIcon class="w-4 h-4 mr-2" />
        Started: {{ staff.startDate }}
      </div>
      <div class="flex items-center text-sm text-gray-600">
        <BuildingIcon class="w-4 h-4 mr-2" />
        {{ staff.department }}
      </div>
    </div>
    <div class="flex space-x-2">
      <button
        @click="$emit('view', staff)"
        class="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded text-sm font-medium hover:bg-blue-100"
      >
        View
      </button>
      <button
        @click="$emit('edit', staff)"
        class="flex-1 bg-green-50 text-green-600 px-3 py-2 rounded text-sm font-medium hover:bg-green-100"
      >
        Edit
      </button>
      <button
        @click="$emit('delete', staff)"
        class="bg-red-50 text-red-600 px-3 py-2 rounded text-sm font-medium hover:bg-red-100"
      >
        <Trash2Icon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { UserIcon, MailIcon, PhoneIcon, CalendarIcon, BuildingIcon, Trash2Icon } from 'lucide-vue-next'

const props = defineProps({
  staff: {
    type: Object,
    required: true
  }
})

const statusClasses = computed(() => {
  const classes = {
    'Active': 'bg-green-100 text-green-800',
    'On Leave': 'bg-yellow-100 text-yellow-800',
    'Inactive': 'bg-red-100 text-red-800'
  }
  return classes[props.staff.status] || 'bg-gray-100 text-gray-800'
})
</script>