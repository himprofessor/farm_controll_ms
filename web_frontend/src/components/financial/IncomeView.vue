<template>
  <div class="space-y-6">
    <!-- Header Controls -->
    <div class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4 bg-white p-6 rounded-lg shadow">
      <div class="flex flex-col sm:flex-row gap-4 flex-1">
        <!-- Search Bar -->
        <div class="relative flex-1 max-w-md">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            v-model="searchQuery"
            type="text" 
            :placeholder="$t('financial.searchIncomePlaceholder')"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
        </div>
        
        <!-- Time Filter -->
        <select 
          v-model="timeFilter"
          class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
        >
          <option value="all">{{ $t('financial.allTime') }}</option>
          <option value="this-month">{{ $t('financial.thisMonth') }}</option>
          <option value="last-month">{{ $t('financial.lastMonth') }}</option>
          <option value="this-quarter">{{ $t('financial.thisQuarter') }}</option>
          <option value="this-year">{{ $t('financial.thisYear') }}</option>
        </select>
      </div>
      
      <!-- Add Income Button -->
      <button 
        @click="showAddForm = !showAddForm"
        class="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
      >
        <Plus class="w-4 h-4" />
        {{ $t('financial.addNewIncome') }}
      </button>
    </div>

    <!-- Feedback Messages -->
    <div v-if="successMessage" class="mb-4 text-green-600 text-sm">{{ successMessage }}</div>
    <div v-if="errorMessage" class="mb-4 text-red-600 text-sm">{{ errorMessage }}</div>

    <!-- Add Income Form (Collapsible) -->
    <div v-if="showAddForm" class="bg-white p-6 rounded-lg shadow-sm border">
      <h4 class="font-medium text-gray-900 mb-4">{{ $t('financial.addNewIncome') }}</h4>
      <form @submit.prevent="addIncome" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <input 
          v-model="newIncome.name"
          type="text" 
          :placeholder="$t('financial.name')"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
        <input 
          v-model="newIncome.description"
          type="text" 
          :placeholder="$t('financial.description')"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
        <input 
          v-model="newIncome.customer"
          type="text" 
          :placeholder="$t('financial.customer')"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
        <input 
          v-model.number="newIncome.amount"
          type="number" 
          :placeholder="$t('financial.amount')"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
        <input 
          v-model="newIncome.date"
          type="date" 
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
        <div class="md:col-span-2 lg:col-span-5 flex gap-2">
          <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200">
            {{ $t('financial.addNewIncome') }}
          </button>
          <button 
            type="button" 
            @click="cancelAdd"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
          >
            {{ $t('financial.cancel') }}
          </button>
        </div>
      </form>
    </div>
    
    <!-- Edit Income Form (Modal) -->
    <div v-if="showEditForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-sm border p-6 w-full max-w-2xl">
        <h4 class="font-medium text-gray-900 mb-4">{{ $t('financial.editIncome') }}</h4>
        <form @submit.prevent="updateIncome" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <input
            v-model="editingIncome.name"
            type="text" 
            :placeholder="$t('financial.name')"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
          <input 
            v-model="editingIncome.description"
            type="text" 
            :placeholder="$t('financial.description')"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
          <input 
            v-model="editingIncome.customer"
            type="text" 
            :placeholder="$t('financial.customer')"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
          <input 
            v-model.number="editingIncome.amount"
            type="number" 
            :placeholder="$t('financial.amount')"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
          <input 
            v-model="editingIncome.date"
            type="date" 
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
          <div class="md:col-span-2 lg:col-span-5 flex gap-2">
            <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200">
              {{ $t('financial.saveChanges') }}
            </button>
            <button 
              type="button" 
              @click="cancelEdit"
              class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
            >
              {{ $t('financial.cancel') }}
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-sm border p-6 max-w-md w-full">
        <h4 class="font-medium text-gray-900 mb-4">{{ $t('financial.confirmDeletion') }}</h4>
        <p class="text-gray-700 mb-6">{{ $t('financial.deleteIncomeConfirmation') }}</p>
        <div class="flex gap-2 justify-end">
          <button 
            @click="showDeleteConfirmation = false"
            class="bg-white border text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-200"
          >
            {{ $t('financial.cancel') }}
          </button>
          <button 
            @click="confirmDelete"
            class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
          >
            {{ $t('financial.delete') }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Income Table -->
    <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-green-600 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">{{ $t('financial.date') }}</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">{{ $t('financial.name') }}</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">{{ $t('financial.description') }}</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">{{ $t('financial.customer') }}</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">{{ $t('financial.amount') }}</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">{{ $t('financial.actions') }}</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="income in filteredIncome" :key="income.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(income.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ income.name }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                {{ income.description }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ income.customer }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                ${{ income.amount.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="relative inline-block text-left">
                  <button 
                    @click="toggleMenu(income.id)" 
                    class="inline-flex justify-center w-full rounded-md px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                  >
                    <MoreVertical class="w-5 h-5" />
                  </button>
                  <div 
                    v-if="openMenuId === income.id" 
                    class="absolute right-0 z-10 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  >
                    <div class="py-1">
                      <button 
                        @click="startEdit(income); toggleMenu(income.id)" 
                        class="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 w-full text-left rounded-t-lg"
                      >
                        <svg class="mr-3 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 110 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                        {{ $t('financial.edit') }}
                      </button>
                      <button 
                        @click="prepareDelete(income.id); toggleMenu(income.id)" 
                        class="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left rounded-b-lg"
                      >
                        <svg class="mr-3 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        {{ $t('financial.delete') }}
                      </button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Empty State -->
      <div v-if="filteredIncome.length === 0" class="text-center py-12">
        <div class="text-gray-400 mb-2">
          <DollarSign class="w-12 h-12 mx-auto" />
        </div>
        <p class="text-gray-500">{{ $t('financial.noIncomeRecords') }}</p>
        <p class="text-sm text-gray-400">{{ $t('financial.adjustSearch') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useIncomeStore } from '@/stores/incomeStore'
import { Search, Plus, DollarSign, MoreVertical } from 'lucide-vue-next'

const { t } = useI18n()
const incomeStore = useIncomeStore()

const showAddForm = ref(false)
const showEditForm = ref(false)
const showDeleteConfirmation = ref(false)
const searchQuery = ref('')
const timeFilter = ref('all')
const incomeToDelete = ref(null)
const openMenuId = ref(null)
const successMessage = ref('')
const errorMessage = ref('')

const newIncome = ref({
  name: '',
  description: '',
  customer: '',
  amount: '',
  date: ''
})

const editingIncome = ref({
  id: null,
  name: '',
  description: '',
  customer: '',
  amount: '',
  date: ''
})

onMounted(() => {
  incomeStore.fetchIncomes()
})

const filteredIncome = computed(() => {
  let filtered = incomeStore.incomes

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(income =>
      income.name.toLowerCase().includes(query) ||
      income.description.toLowerCase().includes(query) ||
      income.customer.toLowerCase().includes(query)
    )
  }

  // Time filter
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  filtered = filtered.filter(income => {
    const incomeDate = new Date(income.date)
    switch (timeFilter.value) {
      case 'this-month':
        return incomeDate.getMonth() === currentMonth && incomeDate.getFullYear() === currentYear
      case 'last-month':
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
        const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear
        return incomeDate.getMonth() === lastMonth && incomeDate.getFullYear() === lastMonthYear
      case 'this-quarter':
        const currentQuarter = Math.floor(currentMonth / 3)
        const incomeQuarter = Math.floor(incomeDate.getMonth() / 3)
        return incomeQuarter === currentQuarter && incomeDate.getFullYear() === currentYear
      case 'this-year':
        return incomeDate.getFullYear() === currentYear
      default:
        return true
    }
  })

  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
})

const addIncome = async () => {
  try {
    await incomeStore.addIncome(newIncome.value)
    await incomeStore.fetchIncomes() // Refresh from server after add
    newIncome.value = { name: '', description: '', customer: '', amount: '', date: '' }
    showAddForm.value = false
    successMessage.value = t('financial.reportGeneratedSuccessfully')
    setTimeout(() => { successMessage.value = '' }, 3000)
  } catch (error) {
    errorMessage.value = t('financial.errorProcessingPayment')
    setTimeout(() => { errorMessage.value = '' }, 3000)
  }
}

const startEdit = (income) => {
  editingIncome.value = { ...income, amount: Number(income.amount) }
  showEditForm.value = true
}

const updateIncome = async () => {
  try {
    await incomeStore.updateIncome(editingIncome.value.id, editingIncome.value)
    await incomeStore.fetchIncomes() // Refresh from server after update
    showEditForm.value = false
    editingIncome.value = { id: null, name: '', description: '', customer: '', amount: '', date: '' }
    successMessage.value = t('financial.reportGeneratedSuccessfully')
    setTimeout(() => { successMessage.value = '' }, 3000)
  } catch (error) {
    errorMessage.value = t('financial.errorProcessingPayment')
    setTimeout(() => { errorMessage.value = '' }, 3000)
  }
}

const cancelEdit = () => {
  showEditForm.value = false
  editingIncome.value = { id: null, name: '', description: '', customer: '', amount: '', date: '' }
}

const cancelAdd = () => {
  showAddForm.value = false
  newIncome.value = { name: '', description: '', customer: '', amount: '', date: '' }
}

const prepareDelete = (id) => {
  incomeToDelete.value = id
  showDeleteConfirmation.value = true
}

const confirmDelete = async () => {
  try {
    if (incomeToDelete.value) {
      await incomeStore.deleteIncome(incomeToDelete.value)
      await incomeStore.fetchIncomes() // Refresh from server after delete
      showDeleteConfirmation.value = false
      incomeToDelete.value = null
      successMessage.value = t('financial.reportGeneratedSuccessfully')
      setTimeout(() => { successMessage.value = '' }, 3000)
    }
  } catch (error) {
    errorMessage.value = t('financial.errorProcessingPayment')
    setTimeout(() => { errorMessage.value = '' }, 3000)
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  })
}

const toggleMenu = (id) => {
  openMenuId.value = openMenuId.value === id ? null : id
}
</script>