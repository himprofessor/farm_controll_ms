<!-- src/components/InventoryBorrowing.vue -->
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-green-100 p-6 rounded-lg shadow-lg w-full max-w-md border border-green-300">
      <h2 class="text-lg font-bold text-green-800 mb-4">Borrow Form</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block text-green-700 text-sm font-bold mb-2">Quantity:</label>
          <input v-model="form.quantity" type="number" class="w-full p-2 border border-green-400 rounded" required />
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
          <input v-model="form.returned_date" type="date" class="w-full p-2 border border-green-400 rounded" required />
        </div>
        <div class="mb-4">
          <label class="block text-green-700 text-sm font-bold mb-2">Material ID:</label>
          <input v-model="form.material_id" type="text" class="w-full p-2 border border-green-400 rounded" required />
        </div>
        <div class="mb-4">
          <label class="block text-green-700 text-sm font-bold mb-2">Staff ID:</label>
          <input v-model="form.staff_id" type="text" class="w-full p-2 border border-green-400 rounded" required />
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
import { reactive } from 'vue'

const emit = defineEmits(['submitted', 'close'])

const form = reactive({
  quantity: '',
  purpose: '',
  borrowed_date: '',
  returned_date: '',
  material_id: '',
  staff_id: ''
})

const handleSubmit = () => {
  emit('submitted', { ...form })
  Object.keys(form).forEach(key => (form[key] = ''))
}
</script>
