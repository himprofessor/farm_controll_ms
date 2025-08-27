<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-green-100 p-6 rounded-lg shadow-lg w-full max-w-md border border-green-300">
      <h2 class="text-lg font-bold text-green-800 mb-4">Borrow Form</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block text-green-700 text-sm font-bold mb-2">Material Name:</label>
          <input v-model="form.material_name" type="text" class="w-full p-2 border border-green-400 rounded"
            :disabled="!!material?.name" :value="material?.name || ''" required />
        </div>
        <div class="mb-4">
          <label class="block text-green-700 text-sm font-bold mb-2">Quantity:</label>
          <input v-model.number="form.quantity" type="number" class="w-full p-2 border border-green-400 rounded" required
            min="1" />
        </div>
        <div class="mb-4">
          <label class="block text-green-700 text-sm font-bold mb-2">Purpose:</label>
          <input v-model="form.purpose" type="text" class="w-full p-2 border border-green-400 rounded" required />
        </div>
        <div class="mb-4">
          <label class="block text-green-700 text-sm font-bold mb-2">Borrowed Date:</label>
          <input v-model="form.borrowed_date" type="date" class="w-full p-2 border border-green-400 rounded" required />
        </div>
        <div class="mb-4">
          <label class="block text-green-700 text-sm font-bold mb-2">Returned Date:</label>
          <input v-model="form.returned_date" type="date" class="w-full p-2 border border-green-400 rounded" />
        </div>
        <div class="mb-4">
          <label class="block text-green-700 text-sm font-bold mb-2">Staff Name:</label>
          <input v-model="form.staff_name" type="text" class="w-full p-2 border border-green-400 rounded" required />
        </div>
        <div class="flex justify-between">
          <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Submit</button>
          <button @click="$emit('close')" type="button" class="text-green-700 hover:underline">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({ material: Object })
const emit = defineEmits(['submitted', 'close'])

const form = reactive({
  material_id: props.material?.id || '', // Add material_id
  material_name: props.material?.name || '',
  quantity: '',
  purpose: '',
  borrowed_date: '',
  returned_date: '',
  staff_name: ''
})

watch(() => props.material?.name, (newName) => {
  if (newName) form.material_name = newName
})
watch(() => props.material?.id, (newId) => {
  if (newId) form.material_id = newId // Sync material_id
})

const handleSubmit = () => {
  emit('submitted', { ...form, material_id: form.material_id || props.material?.id }) // Ensure material_id is sent
  emit('close') // Close the form after submission
  Object.keys(form).forEach(key => {
    form[key] = key === 'material_name' && props.material?.name ? props.material.name : ''
    if (key === 'material_id') form[key] = props.material?.id || '' // Reset material_id
  })
}
</script>