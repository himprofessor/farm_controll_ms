
<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div class="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-2xl overflow-y-auto max-h-[90vh]">
      <h3 class="text-2xl font-bold mb-6 text-gray-800">
        {{ isEdit ? $t('inventory.editItem') : $t('inventory.addItem') }}
      </h3>

      <form @submit.prevent="submit" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="col-span-full">
          <label class="block text-sm font-medium mb-1">{{ $t('inventory.table.name') }}</label>
          <input
            v-model="form.name"
            :placeholder="$t('inventory.table.name')"
            class="input"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">{{ $t('inventory.table.expires') }}</label>
          <input
            v-model="form.expires"
            type="text"
            :placeholder="$t('inventory.table.expires')"
            class="input"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">{{ $t('inventory.table.category') }}</label>
          <select v-model="form.category" class="input" required>
            <option value="" disabled>{{ $t('inventory.selectCategory') }}</option>
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ $t(`inventory.categories.${cat}`) }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">{{ $t('inventory.table.currentStock') }}</label>
          <input
            v-model.number="form.currentStock"
            type="number"
            :placeholder="$t('inventory.table.currentStock')"
            class="input"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">{{ $t('inventory.table.minStock') }}</label>
          <input
            v-model.number="form.minStock"
            type="number"
            :placeholder="$t('inventory.table.minStock')"
            class="input"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">{{ $t('inventory.table.unit') }}</label>
          <input
            v-model="form.unit"
            :placeholder="$t('inventory.table.unit')"
            class="input"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">{{ $t('inventory.table.status') }}</label>
          <input
            :value="$t(`inventory.statuses.${form.status}`)"
            class="input bg-gray-100 text-gray-600"
            readonly
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">{{ $t('inventory.table.value') }}</label>
          <input
            v-model.number="form.value"
            type="number"
            step="0.01"
            :placeholder="$t('inventory.table.value')"
            class="input"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">{{ $t('inventory.table.pricePerUnit') }}</label>
          <input
            v-model.number="form.pricePerUnit"
            type="number"
            step="0.01"
            :placeholder="$t('inventory.table.pricePerUnit')"
            class="input"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">{{ $t('inventory.table.supplier') }}</label>
          <input
            v-model="form.supplier"
            :placeholder="$t('inventory.table.supplier')"
            class="input"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">{{ $t('inventory.table.lastUpdated') }}</label>
          <input
            v-model="form.lastUpdated"
            type="date"
            class="input"
            required
          />
        </div>

        <div class="col-span-full flex justify-end mt-4 space-x-3">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            {{ $t('confirmationDialog.cancel') }}
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {{ isEdit ? $t('inventory.save') : $t('inventory.add') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, computed, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import API from '@/plugin/axios'

const { t: $t } = useI18n()
const toast = useToast()

const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
  categories: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['close', 'material-added', 'material-updated'])

const form = reactive({
  id: '',
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
  lastUpdated: '',
})

const isEdit = computed(() => !!props.item?.id)

// Watch for props.item (edit mode)
watch(
  () => props.item,
  async (val) => {
    await nextTick()
    if (val) {
      Object.assign(form, {
        id: val.id || '',
        name: val.name || '',
        expires: val.expires || '',
        category: val.category || '',
        currentStock: val.currentStock ?? 0,
        minStock: val.minStock ?? 0,
        unit: val.unit || '',
        status: val.status || 'ok',
        value: Number(val.value) || 0,
        pricePerUnit: Number(val.pricePerUnit) || 0,
        supplier: val.supplier || '',
        lastUpdated: val.lastUpdated || '',
      })
    } else {
      Object.assign(form, {
        id: '',
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
        lastUpdated: '',
      })
    }
  },
  { immediate: true }
)

// Watch stock to compute status
watch(
  () => [form.currentStock],
  async ([stock]) => {
    await nextTick()
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

const submit = async () => {
  const isUpdating = isEdit.value
  const payload = { ...form }

  try {
    if (isUpdating) {
      const response = await API.put(`/materials/${props.item.id}`, payload)
      await nextTick()
      emit('material-updated', response.data)
      toast.success($t('inventory.materialUpdated'))
    } else {
      const response = await API.post('/materials', payload)
      await nextTick()
      emit('material-added', response.data)
      toast.success($t('inventory.materialAdded'))
    }
  } catch (error) {
    toast.error($t('inventory.formError'))
    console.error('Submit error:', error)
  } finally {
    await nextTick()
    emit('close')
  }
}
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}
</style>
