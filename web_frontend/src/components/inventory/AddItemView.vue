// AddItemView.vue
<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div class="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-2xl overflow-y-auto max-h-[90vh]">
      <h3 class="text-2xl font-bold mb-6 text-gray-800">
        {{ isEdit ? $t('inventory.editMaterial') : $t('inventory.addNewMaterial') }}
      </h3>

      <form @submit.prevent="submit" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="col-span-full">
          <label class="block text-sm font-medium mb-1">{{ $t('inventory.itemName') }}</label>
          <input v-model="form.name" class="input" required />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">{{ $t('inventory.expires') }}</label>
          <input v-model="form.expires" type="text" class="input" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">{{ $t('inventory.category') }}</label>
          <select v-model="form.category" class="input" required>
            <option disabled value="">{{ $t('inventory.selectCategory') }}</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">{{ $t('inventory.currentStock') }}</label>
          <input v-model.number="form.currentStock" type="number" class="input" required />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">{{ $t('inventory.minStock') }}</label>
          <input v-model.number="form.minStock" type="number" class="input" required />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">{{ $t('inventory.unit') }}</label>
          <input v-model="form.unit" class="input" required />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">{{ $t('inventory.status') }}</label>
          <input :value="form.status" class="input bg-gray-100 text-gray-600" readonly />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">{{ $t('inventory.totalValue') }}</label>
          <input :value="form.value" type="number" class="input bg-gray-100 text-gray-600" readonly />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">{{ $t('inventory.pricePerUnit') }}</label>
          <input v-model.number="form.pricePerUnit" type="number" class="input" required />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">{{ $t('inventory.supplier') }}</label>
          <input v-model="form.supplier" class="input" required />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">{{ $t('inventory.lastUpdated') }}</label>
          <input v-model="form.lastUpdated" type="date" class="input" required />
        </div>

        <div class="col-span-full flex justify-end mt-4 space-x-3">
          <button type="button" @click="$emit('close')" class="px-4 py-2 border rounded-lg hover:bg-gray-100">
            {{ $t('inventory.cancel') }}
          </button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            {{ isEdit ? $t('inventory.update') : $t('inventory.add') }} {{ $t('inventory.addMaterial') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, computed } from 'vue'
import API from '@/plugin/axios'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps({
  item: Object,
  categories: Array
})
const emit = defineEmits(['close', 'material-added', 'material-updated', 'success', 'error'])

const form = reactive({
  name: '',
  expires: '',
  category: '',
  currentStock: 0,
  minStock: 0,
  unit: '',
  status: 'ok',
  value: 0,
  pricePerUnit: 0,
  supplier: '',
  lastUpdated: ''
})

const isEdit = computed(() => !!props.item?.id)

watch(
  () => props.item,
  (val) => {
    if (val) {
      Object.assign(form, { ...val })
    } else {
      Object.assign(form, {
        name: '',
        expires: '',
        category: '',
        currentStock: 0,
        minStock: 0,
        unit: '',
        status: 'ok',
        value: 0,
        pricePerUnit: 0,
        supplier: '',
        lastUpdated: ''
      })
    }
  },
  { immediate: true }
)

watch(
  () => [form.currentStock],
  ([stock]) => {
    if (stock <= 40) {
      form.status = 'critical'
    } else if (stock > 40 && stock <= 60) {
      form.status = 'low'
    } else {
      form.status = 'ok'
    }
  },
  { immediate: true }
)

watch(
  () => [form.currentStock, form.pricePerUnit],
  ([stock, price]) => {
    form.value = stock * price
  },
  { immediate: true }
)

const submit = async () => {
  const isUpdating = isEdit.value
  const payload = { ...form }

  emit('close')

  try {
    if (isUpdating) {
      const { data } = await API.put(`/materials/${props.item.id}`, payload)
      emit('material-updated', data.data)
      emit('success', t('inventory.successBorrowUpdated'))
    } else {
      const { data } = await API.post('/materials', payload)
      emit('material-added', data.material)
      emit('success', t('inventory.successBorrowUpdated'))
    }
  } catch (error) {
    emit('error', t('inventory.errorProcessingPayment'))
  }
}
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}
</style>