<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
      <h2 class="text-xl font-semibold mb-4">Add Sale</h2>
      
      <form @submit.prevent="onSave">
        <label class="block mb-2">
          Product Name:
          <input v-model="form.product_name" type="text" required class="w-full border rounded p-2"/>
        </label>

        <label class="block mb-2">
          Quantity:
          <input v-model.number="form.quantity" type="number" min="1" required class="w-full border rounded p-2"/>
        </label>

        <label class="block mb-2">
          Unit Price:
          <input v-model.number="form.unit_price" type="number" step="0.01" min="0" required class="w-full border rounded p-2"/>
        </label>

        <!-- Auto-calculated total price -->
        <label class="block mb-2">
          Total Price:
          <input :value="totalPrice.toFixed(2)" type="text" readonly class="w-full border rounded p-2 bg-gray-100"/>
        </label>

        <label class="block mb-2">
          Sale Date:
          <input v-model="form.sale_date" type="date" required class="w-full border rounded p-2"/>
        </label>

        <label class="block mb-4">
          Description:
          <textarea v-model="form.description" rows="3" class="w-full border rounded p-2"></textarea>
        </label>

        <div class="flex justify-end gap-4">
          <button type="button" @click="$emit('close')" class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
          <button type="submit" class="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">
            Add
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  saleData: Object
})

const emit = defineEmits(['close', 'save'])

const form = reactive({
  id: null,
  product_name: '',
  quantity: 1,
  unit_price: 0,
  description: '',
  sale_date: new Date().toISOString().split('T')[0],
})

// Computed total price
const totalPrice = computed(() => form.quantity * form.unit_price)

watch(() => props.saleData, (newVal) => {
  if (newVal) {
    Object.assign(form, newVal)
  }
})

function onSave() {
  emit('save', { ...form, total_price: totalPrice.value })
}
</script>
