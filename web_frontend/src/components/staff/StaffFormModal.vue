<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
      <button
        @click="$emit('close')"
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
      >
        <XIcon class="w-6 h-6" />
      </button>
      <h2 class="text-2xl font-bold mb-6 text-gray-900">
        {{ staffData.id ? $t('staffForm.editTitle') : $t('staffForm.addTitle') }}
      </h2>
      <form @submit.prevent="saveStaff">
        <div class="grid grid-cols-1 gap-4 mb-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">{{
              $t('staffForm.name')
            }}</label>
            <input
              type="text"
              id="name"
              v-model="staffData.name"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="role" class="block text-sm font-medium text-gray-700">{{
              $t('staffForm.role')
            }}</label>
            <input
              type="text"
              id="role"
              v-model="staffData.role"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">{{
              $t('staffForm.email')
            }}</label>
            <input
              type="email"
              id="email"
              v-model="staffData.email"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">{{
              $t('staffForm.phone')
            }}</label>
            <input
              type="tel"
              id="phone"
              v-model="staffData.phone"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              for="startDate"
              class="block text-sm font-medium text-gray-700"
              >{{ $t('staffForm.startDate') }}</label
            >
            <input
              type="date"
              id="startDate"
              v-model="staffData.startDate"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              for="department"
              class="block text-sm font-medium text-gray-700"
              >{{ $t('staffForm.department') }}</label
            >
            <select
              id="department"
              v-model="staffData.department"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            >
              <option value="">{{ $t('staffForm.selectDepartment') }}</option>
              <option value="Management">{{
                $t('departments.management')
              }}</option>
              <option value="Health">{{ $t('departments.health') }}</option>
              <option value="Operations">{{
                $t('departments.operations')
              }}</option>
              <option value="Administration">{{
                $t('departments.administration')
              }}</option>
            </select>
          </div>
          <div>
            <label
              for="status"
              class="block text-sm font-medium text-gray-700"
              >{{ $t('staffForm.status') }}</label
            >
            <select
              id="status"
              v-model="staffData.status"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            >
              <option value="">{{ $t('staffForm.selectStatus') }}</option>
              <option value="Active">{{ $t('staffStatus.active') }}</option>
              <option value="On Leave">{{
                $t('staffStatus.on_leave')
              }}</option>
              <option value="Inactive">{{
                $t('staffStatus.inactive')
              }}</option>
            </select>
          </div>
        </div>
        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {{ $t('staffForm.cancel') }}
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-green-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {{ $t('staffForm.save') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { XIcon } from 'lucide-vue-next'

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  staffToEdit: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close', 'save'])

const staffData = ref({
  id: null,
  name: '',
  role: '',
  roleKey: '',
  email: '',
  phone: '',
  startDate: '',
  department: '',
  departmentKey: '',
  status: '',
})

watch(
  () => props.staffToEdit,
  (newVal) => {
    if (newVal) {
      // Deep copy to avoid mutating prop directly
      staffData.value = {
        ...newVal,
        roleKey: newVal.roleKey || newVal.role.toLowerCase().replace(' ', '_'),
        departmentKey:
          newVal.departmentKey ||
          newVal.department.toLowerCase().replace(' ', '_'),
      }
    } else {
      // Reset form for new staff
      staffData.value = {
        id: null,
        name: '',
        role: '',
        roleKey: '',
        email: '',
        phone: '',
        startDate: '',
        department: '',
        departmentKey: '',
        status: '',
      }
    }
  },
  { immediate: true }
)

const saveStaff = () => {
  // Ensure roleKey and departmentKey are set
  staffData.value.roleKey = staffData.value.role.toLowerCase().replace(' ', '_')
  staffData.value.departmentKey = staffData.value.department
    .toLowerCase()
    .replace(' ', '_')
  emit('save', staffData.value)
}
</script>