
<template>
  <div class="space-y-6">
    <!-- Header Controls -->
    <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div class="flex flex-col sm:flex-row gap-4 flex-1">
        <!-- Search Bar -->
        <div class="relative flex-1 max-w-md">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('financial.income.searchPlaceholder')"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <!-- Time Filter -->
        <select
          v-model="timeFilter"
          class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          @change="fetchIncome"
        >
          <option value="this-month">{{ $t('financial.income.filters.thisMonth') }}</option>
          <option value="last-month">{{ $t('financial.income.filters.lastMonth') }}</option>
          <option value="this-quarter">{{ $t('financial.income.filters.thisQuarter') }}</option>
          <option value="this-year">{{ $t('financial.income.filters.thisYear') }}</option>
          <option value="all">{{ $t('financial.income.filters.allTime') }}</option>
        </select>
      </div>

      <!-- Add Income Button -->
      <button
        @click="toggleAddForm"
        class="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
      >
        <Plus class="w-4 h-4" />
        {{ $t('financial.income.add') }}
      </button>
    </div>

    <!-- Add/Edit Income Form (Collapsible) -->
    <div v-if="showAddForm || showEditForm" class="bg-white p-6 rounded-lg shadow-sm border">
      <h4 class="font-medium text-gray-900 mb-4">
        {{ showEditForm ? $t('financial.income.edit') : $t('financial.income.add') }}
      </h4>
      <form @submit.prevent="submitIncome" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <input
          v-model="form.category"
          type="text"
          :placeholder="$t('financial.income.category')"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          v-model="form.description"
          type="text"
          :placeholder="$t('financial.income.description')"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          v-model="form.customer"
          type="text"
          :placeholder="$t('financial.income.customer')"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          v-model.number="form.amount"
          type="number"
          step="0.01"
          :placeholder="$t('financial.income.amount')"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          v-model="form.date"
          type="date"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <div class="md:col-span-2 lg:col-span-5 flex gap-2">
          <button
            type="submit"
            class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
          >
            {{ showEditForm ? $t('financial.income.save') : $t('financial.income.add') }}
          </button>
          <button
            type="button"
            @click="cancelForm"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
          >
            {{ $t('confirmationDialog.cancel') }}
          </button>
        </div>
      </form>
    </div>

    <!-- Delete Confirmation Dialog -->
    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 class="text-xl font-bold text-gray-800 mb-4">{{ $t('confirmationDialog.title') }}</h3>
        <p class="text-gray-600 mb-6">
          {{ $t('financial.income.deleteConfirm', { description: selectedIncome?.description || $t('staffCard.na') }) }}
        </p>
        <div class="flex justify-end space-x-4">
          <button
            @click="cancelDelete"
            class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800"
          >
            {{ $t('confirmationDialog.cancel') }}
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            {{ $t('confirmationDialog.confirm') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Income Table -->
    <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('financial.income.date') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('financial.income.category') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('financial.income.description') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('financial.income.customer') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('financial.income.amount') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('financial.income.actions') }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="income in filteredIncome" :key="income.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(income.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ income.category || $t('staffCard.na') }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                {{ income.description || $t('staffCard.na') }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ income.customer || $t('staffCard.na') }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                {{ formatCurrency(income.amount) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center gap-2">
                  <button
                    @click="editIncome(income)"
                    class="text-blue-600 hover:text-blue-800"
                    :aria-label="$t('financial.income.edit')"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button
                    @click="openDeleteConfirm(income)"
                    class="text-red-600 hover:text-red-800"
                    :aria-label="$t('financial.income.delete')"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="filteredIncome.length === 0 && !isLoading" class="text-center py-12">
        <div class="text-gray-400 mb-2">
          <DollarSign class="w-12 h-12 mx-auto" />
        </div>
        <p class="text-gray-500">{{ $t('financial.income.noRecords') }}</p>
        <p class="text-sm text-gray-400">{{ $t('financial.income.noRecordsHint') }}</p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <p class="text-gray-500">{{ $t('financial.loading') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { Search, Plus, Edit, Trash2, DollarSign } from 'lucide-vue-next'
import API from '@/plugin/axios'

const { t: $t, locale } = useI18n()
const toast = useToast()
const showAddForm = ref(false)
const showEditForm = ref(false)
const showDeleteConfirm = ref(false)
const selectedIncome = ref(null)
const searchQuery = ref('')
const timeFilter = ref('this-month')
const isLoading = ref(true)
const error = ref(null)

const form = ref({
  id: '',
  category: '',
  description: '',
  customer: '',
  amount: '',
  date: '',
})

const incomeRecords = ref([])

const fetchIncome = async () => {
  try {
    isLoading.value = true
    const params = { timeFilter: timeFilter.value }
    const res = await API.get('/financial/income', { params })
    incomeRecords.value = res.data.map(income => ({
      id: income.id || '',
      category: income.category || $t('staffCard.na'),
      description: income.description || $t('staffCard.na'),
      customer: income.customer || $t('staffCard.na'),
      amount: Number(income.amount) || 0,
      date: income.date || $t('staffCard.na'),
    }))
  } catch (err) {
    error.value = err.message
    toast.error($t('financial.error'))
  } finally {
    await nextTick()
    isLoading.value = false
  }
}

const filteredIncome = computed(() => {
  let filtered = incomeRecords.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(income =>
      (income.category || '').toLowerCase().includes(query) ||
      (income.description || '').toLowerCase().includes(query) ||
      (income.customer || '').toLowerCase().includes(query)
    )
  }

  // Apply sorting by date (descending)
  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
})

const toggleAddForm = async () => {
  showAddForm.value = !showAddForm.value
  showEditForm.value = false
  form.value = {
    id: '',
    category: '',
    description: '',
    customer: '',
    amount: '',
    date: '',
  }
  await nextTick()
}

const editIncome = async (income) => {
  showEditForm.value = true
  showAddForm.value = false
  form.value = {
    id: income.id,
    category: income.category,
    description: income.description,
    customer: income.customer,
    amount: income.amount,
    date: income.date,
  }
  await nextTick()
}

const cancelForm = async () => {
  showAddForm.value = false
  showEditForm.value = false
  form.value = {
    id: '',
    category: '',
    description: '',
    customer: '',
    amount: '',
    date: '',
  }
  await nextTick()
}

const submitIncome = async () => {
  const payload = {
    category: form.value.category,
    description: form.value.description,
    customer: form.value.customer,
    amount: Number(form.value.amount),
    date: form.value.date,
  }

  try {
    if (showEditForm.value) {
      const res = await API.put(`/financial/income/${form.value.id}`, payload)
      const index = incomeRecords.value.findIndex(inc => inc.id === form.value.id)
      if (index !== -1) {
        incomeRecords.value[index] = { ...res.data, amount: Number(res.data.amount) }
      }
      toast.success($t('financial.income.updated'))
    } else {
      const res = await API.post('/financial/income', payload)
      incomeRecords.value.unshift({ ...res.data, amount: Number(res.data.amount) })
      toast.success($t('financial.income.added'))
    }
  } catch (error) {
    toast.error($t('financial.error'))
    console.error('Submit error:', error)
  } finally {
    await cancelForm()
  }
}

const openDeleteConfirm = async (income) => {
  selectedIncome.value = income
  showDeleteConfirm.value = true
  await nextTick()
}

const cancelDelete = async () => {
  showDeleteConfirm.value = false
  selectedIncome.value = null
  await nextTick()
}

const confirmDelete = async () => {
  if (!selectedIncome.value || !selectedIncome.value.id) {
    toast.error($t('financial.error'))
    return
  }
  try {
    await API.delete(`/financial/income/${selectedIncome.value.id}`)
    incomeRecords.value = incomeRecords.value.filter(inc => inc.id !== selectedIncome.value.id)
    toast.success($t('financial.income.deleted'))
  } catch (error) {
    toast.error($t('financial.error'))
    console.error('Delete error:', error)
  } finally {
    await cancelDelete()
  }
}

const formatDate = (dateString) => {
  if (!dateString || dateString === $t('staffCard.na')) return $t('staffCard.na')
  return new Intl.DateTimeFormat(locale.value, {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString))
}

const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return $t('staffCard.na')
  return new Intl.NumberFormat(locale.value, {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

onMounted(fetchIncome)
</script>
