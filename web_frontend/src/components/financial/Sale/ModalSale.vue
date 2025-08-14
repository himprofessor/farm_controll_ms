<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
      <h2 class="text-xl font-semibold mb-4">Add Sale</h2>

      <form @submit.prevent="$emit('save')">
        <label class="block mb-2">
          Product Name:
          <input v-model="saleData.product" type="text" required class="w-full border rounded p-2"/>
        </label>

        <label class="block mb-2">
          Quantity:
          <input v-model.number="saleData.quantity" type="number" min="1" required class="w-full border rounded p-2"/>
        </label>

        <label class="block mb-2">
          Unit Price:
          <input v-model.number="saleData.unitPrice" type="number" step="0.01" min="0" required class="w-full border rounded p-2"/>
        </label>

        <label class="block mb-2">
          Total Price:
          <input :value="(saleData.quantity * saleData.unitPrice).toFixed(2)" type="text" readonly class="w-full border rounded p-2 bg-gray-100"/>
        </label>

        <label class="block mb-2">
          Sale Date:
          <input v-model="saleData.date" type="date" required class="w-full border rounded p-2"/>
        </label>

        <label class="block mb-4">
          Description:
          <textarea v-model="saleData.description" rows="3" class="w-full border rounded p-2"></textarea>
        </label>

        <div class="flex justify-end gap-4">
          <button type="button" @click="$emit('close')" class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
            Cancel
          </button>
          <button type="submit" class="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">
            Add
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  saleData: Object,
})

const emit = defineEmits(['close','save'])
</script>
