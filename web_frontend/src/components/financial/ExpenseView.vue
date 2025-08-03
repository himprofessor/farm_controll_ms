
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
            :placeholder="$t('financial.expenses.searchPlaceholder')"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <!-- Time Filter -->
        <select
          v-model="timeFilter"
          class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          @change="fetchExpenses"
        >
          <option value="this-month">{{ $t('financial.expenses.filters.thisMonth') }}</option>
          <option value="last-month">{{ $t('financial.expenses.filters.lastMonth') }}</option>
          <option value="this-quarter">{{ $t('financial.expenses.filters.thisQuarter') }}</option>
          <option value="this-year">{{ $t('financial.expenses.filters.thisYear') }}</option>
          <option value="all">{{ $t('financial.expenses.filters.allTime') }}</option>
        </select>
      </div>

      <!-- Add Expense Button -->
      <button
        @click="toggleAddForm"
        class="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
      >
        <Plus class="w-4 h-4" />
        {{ $t('financial.expenses.add') }}
      </button>
    </div>

    <!-- Add/Edit Expense Form (Collapsible) -->
    <div v-if="showAddForm || showEditForm" class="bg-white p-6 rounded-lg shadow-sm border">
      <h4 class="font-medium text-gray-900 mb-4">
        {{ showEditForm ? $t('financial.expenses.edit') : $t('financial.expenses.add') }}
      </h4>
      <form @submit.prevent="submitExpense" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <input
          v-model="form.category"
          type="text"
          :placeholder="$t('financial.expenses.category')"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          v-model="form.description"
          type="text"
          :placeholder="$t('financial.expenses.description')"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          v-model="form.vendor"
          type="text"
          :placeholder="$t('financial.expenses.vendor')"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          v-model.number="form.amount"
          type="number"
          step="0.01"
          :placeholder="$t('financial.expenses.amount')"
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
            {{ showEditForm ? $t('financial.expenses.save') : $t('financial.expenses.add') }}
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
          {{ $t('financial.expenses.deleteConfirm', { description: selectedExpense?.description || $t('staffCard.na') }) }}
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

    <!-- Expense Table -->
    <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('financial.expenses.date') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('financial.expenses.category') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('financial.expenses.description') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('financial.expenses.vendor') }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                @click="toggleSort"
              >
                <div class="flex items-center gap-1">
                  {{ $t('financial.expenses.amount') }}
                  <div class="flex flex-col">
                    <ChevronUp class="w-3 h-3" :class="sortOrder === 'asc' ? 'text-gray-900' : 'text-gray-400'" />
                    <ChevronDown class="w-3 h-3 -mt-1" :class="sortOrder === 'desc' ? 'text-gray-900' : 'text-gray-400'" />
                  </div>
                </div>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('financial.expenses.actions') }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="expense in filteredExpenses" :key="expense.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(expense.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ expense.category || $t('staffCard.na') }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                {{ expense.description || $t('staffCard.na') }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ expense.vendor || $t('staffCard.na') }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">
                {{ formatCurrency(expense.amount) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center gap-2">
                  <button
                    @click="editExpense(expense)"
                    class="text-blue-600 hover:text-blue-800"
                    :aria-label="$t('financial.expenses.edit')"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button
                    @click="openDeleteConfirm(expense)"
                    class="text-red-600 hover:text-red-800"
                    :aria-label="$t('financial.expenses.delete')"
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
      <div v-if="filteredExpenses.length === 0 && !isLoading" class="text-center py-12">
        <div class="text-gray-400 mb-2">
          <CreditCard class="w-12 h-12 mx-auto" />
        </div>
        <p class="text-gray-500">{{ $t('financial.expenses.noRecords') }}</p>
        <p class="text-sm text-gray-400">{{ $t('financial.expenses.noRecordsHint') }}</p>
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
import { Search, Plus, Edit, Trash2, CreditCard, ChevronUp, ChevronDown } from 'lucide-vue-next'
import API from '@/plugin/axios'

const { t: $t, locale } = useI18n()
const toast = useToast()
const showAddForm = ref(false)
const showEditForm = ref(false)
const showDeleteConfirm = ref(false)
const selectedExpense = ref(null)
const searchQuery = ref('')
const timeFilter = ref('this-month')
const sortOrder = ref('desc')
const isLoading = ref(true)
const error = ref(null)

const form = ref({
  id: '',
  category: '',
  description: '',
  vendor: '',
  amount: '',
  date: '',
})

const expenses = ref([])

const fetchExpenses = async () => {
  try {
    isLoading.value = true
    const params = { timeFilter: timeFilter.value }
    const res = await API.get('/financial/expenses', { params })
    expenses.value = res.data.map(expense => ({
      id: expense.id || '',
      category: expense.category || $t('staffCard.na'),
      description: expense.description || $t('staffCard.na'),
      vendor: expense.vendor || $t('staffCard.na'),
      amount: Number(expense.amount) || 0,
      date: expense.date || $t('staffCard.na'),
    }))
  } catch (err) {
    error.value = err.message
    toast.error($t('financial.error'))
  } finally {
    await nextTick()
    isLoading.value = false
  }
}

const filteredExpenses = computed(() => {
  let filtered = expenses.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(expense =>
      (expense.category || '').toLowerCase().includes(query) ||
      (expense.description || '').toLowerCase().includes(query) ||
      (expense.vendor || '').toLowerCase().includes(query)
    )
  }

  // Apply sorting
  return filtered.sort((a, b) => {
    if (sortOrder.value === 'asc') {
      return a.amount - b.amount
    } else {
      return b.amount - b.amount
    }
  })
})

const toggleAddForm = async () => {
  showAddForm.value = !showAddForm.value
  showEditForm.value = false
  form.value = {
    id: '',
    category: '',
    description: '',
    vendor: '',
    amount: '',
    date: '',
  }
  await nextTick()
}

const editExpense = async (expense) => {
  showEditForm.value = true
  showAddForm.value = false
  form.value = {
    id: expense.id,
    category: expense.category,
    description: expense.description,
    vendor: expense.vendor,
    amount: expense.amount,
    date: expense.date,
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
    vendor: '',
    amount: '',
    date: '',
  }
  await nextTick()
}

const submitExpense = async () => {
  const payload = {
    category: form.value.category,
    description: form.value.description,
    vendor: form.value.vendor,
    amount: Number(form.value.amount),
    date: form.value.date,
  }

  try {
    if (showEditForm.value) {
      const res = await API.put(`/financial/expenses/${form.value.id}`, payload)
      const index = expenses.value.findIndex(exp => exp.id === form.value.id)
      if (index !== -1) {
        expenses.value[index] = { ...res.data, amount: Number(res.data.amount) }
      }
      toast.success($t('financial.expenses.updated'))
    } else {
      const res = await API.post('/financial/expenses', payload)
      expenses.value.unshift({ ...res.data, amount: Number(res.data.amount) })
      toast.success($t('financial.expenses.added'))
    }
  } catch (error) {
    toast.error($t('financial.error'))
    console.error('Submit error:', error)
  } finally {
    await cancelForm()
  }
}

const openDeleteConfirm = async (expense) => {
  selectedExpense.value = expense
  showDeleteConfirm.value = true
  await nextTick()
}

const cancelDelete = async () => {
  showDeleteConfirm.value = false
  selectedExpense.value = null
  await nextTick()
}

const confirmDelete = async () => {
  if (!selectedExpense.value || !selectedExpense.value.id) {
    toast.error($t('financial.error'))
    return
  }
  try {
    await API.delete(`/financial/expenses/${selectedExpense.value.id}`)
    expenses.value = expenses.value.filter(exp => exp.id !== selectedExpense.value.id)
    toast.success($t('financial.expenses.deleted'))
  } catch (error) {
    toast.error($t('financial.error'))
    console.error('Delete error:', error)
  } finally {
    await cancelDelete()
  }
}

const toggleSort = async () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  await nextTick()
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

onMounted(fetchExpenses)
</script>
