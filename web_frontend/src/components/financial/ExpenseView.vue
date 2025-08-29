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
            :placeholder="$t('financial.searchExpenses')" 
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
      
      <!-- Add Expense Button -->
      <button 
        type="button"
        @click="showAddForm = !showAddForm"
        class="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
      >
        <Plus class="w-4 h-4" />
        {{ $t('financial.addNewExpense') }}
      </button>
    </div>

    <!-- Add Expense Form (Collapsible with Transition) -->
    <Transition name="slide-fade">
      <div v-if="showAddForm" class="bg-white p-6 rounded-lg shadow-sm border">
        <h4 class="font-medium text-gray-900 mb-4">{{ $t('financial.addNewExpense') }}</h4>
        <form @submit.prevent="addExpense" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <input 
            v-model="newExpense.name"
            type="text" 
            :placeholder="$t('staff.name')" 
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
          <input 
            v-model="newExpense.description"
            type="text" 
            :placeholder="$t('sales.description')" 
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
          <input 
            v-model="newExpense.vendor"
            type="text" 
            :placeholder="$t('inventory.supplier')" 
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
          <input 
            v-model="newExpense.amount"
            type="number" 
            :placeholder="$t('staff.salaryManagement.amount')" 
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
          <input 
            v-model="newExpense.date"
            type="date" 
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
          <div class="md:col-span-2 lg:col-span-5 flex gap-2">
            <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200">
              {{ $t('financial.addNewExpense') }}
            </button>
            <button 
              type="button" 
              @click="showAddForm = false"
              class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
            >
              {{ $t('staff.cancel') }}
            </button>
          </div>
        </form>
      </div>
    </Transition>
    
    <!-- Edit Expense Form (Modal) -->
    <div v-if="showEditForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-sm border p-6 w-full max-w-2xl">
        <h4 class="font-medium text-gray-900 mb-4">{{ $t('financial.editExpense') }}</h4>
        <form @submit.prevent="updateExpense" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <input 
            v-model="editingExpense.name"
            type="text" 
            :placeholder="$t('staff.name')" 
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
          <input 
            v-model="editingExpense.description"
            type="text" 
            :placeholder="$t('sales.description')" 
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
          <input 
            v-model="editingExpense.vendor"
            type="text" 
            :placeholder="$t('inventory.supplier')" 
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
          <input 
            v-model="editingExpense.amount"
            type="number" 
            :placeholder="$t('staff.salaryManagement.amount')" 
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
          <input 
            v-model="editingExpense.date"
            type="date" 
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
          <div class="md:col-span-2 lg:col-span-5 flex gap-2">
            <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200">
              {{ $t('staff.save') }}
            </button>
            <button 
              type="button" 
              @click="showEditForm = false"
              class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
            >
              {{ $t('staff.cancel') }}
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-sm border p-6 max-w-md w-full">
        <h4 class="font-medium text-gray-900 mb-4">{{ $t('staff.confirmAction') }}</h4>
        <p class="text-gray-700 mb-6">{{ $t('financial.deleteExpenseConfirmation') }}</p>
        <div class="flex gap-2 justify-end">
          <button 
            @click="showDeleteConfirmation = false"
            class="bg-white border text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-200"
          >
            {{ $t('staff.cancel') }}
          </button>
          <button 
            @click="confirmDelete"
            class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
          >
            {{ $t('staff.delete') }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Expense Table -->
    <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-green-600 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">{{ $t('sales.date') }}</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">{{ $t('staff.name') }}</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">{{ $t('sales.description') }}</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">{{ $t('inventory.supplier') }}</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-green-500" @click="toggleSort">
                <div class="flex items-center gap-1">
                  {{ $t('staff.salaryManagement.amount') }}
                  <div class="flex flex-col">
                    <ChevronUp class="w-3 h-3" :class="sortOrder === 'asc' ? 'text-white' : 'text-gray-400'" />
                    <ChevronDown class="w-3 h-3 -mt-1" :class="sortOrder === 'desc' ? 'text-white' : 'text-gray-400'" />
                  </div>
                </div>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">{{ $t('inventory.actions') }}</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="expense in filteredExpenses" :key="expense.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(expense.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ expense.name }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                {{ expense.description }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ expense.vendor }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">
                ${{ expense.amount.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="relative inline-block text-left">
                  <button 
                    @click="toggleMenu(expense.id)" 
                    class="inline-flex justify-center w-full rounded-md px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                  >
                    <MoreVertical class="w-5 h-5" />
                  </button>
                  <div 
                    v-if="openMenuId === expense.id" 
                    class="absolute right-0 z-10 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  >
                    <div class="py-1">
                      <button 
                        @click="startEdit(expense); toggleMenu(expense.id)" 
                        class="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 w-full text-left"
                      >
                        <svg class="mr-3 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 110 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                        {{ $t('staff.edit') }}
                      </button>
                      <button 
                        @click="prepareDelete(expense.id); toggleMenu(expense.id)" 
                        class="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                      >
                        <svg class="mr-3 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        {{ $t('staff.delete') }}
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
      <div v-if="filteredExpenses.length === 0" class="text-center py-12">
        <div class="text-gray-400 mb-2">
          <CreditCard class="w-12 h-12 mx-auto" />
        </div>
        <p class="text-gray-500">{{ $t('financial.noExpenseRecords') }}</p>
        <p class="text-sm text-gray-400">{{ $t('financial.adjustSearch') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useExpenseStore } from '@/stores/expense'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const expenseStore = useExpenseStore()

const showAddForm = ref(false)
const showEditForm = ref(false)
const showDeleteConfirmation = ref(false)
const searchQuery = ref('')
const timeFilter = ref('all')
const sortOrder = ref('desc')
const expenseToDelete = ref(null)
const openMenuId = ref(null)
const newExpense = ref({ name:'', description:'', vendor:'', amount:'', date:'' })
const editingExpense = ref({ id:null, name:'', description:'', vendor:'', amount:'', date:'' })

onMounted(() => {
  expenseStore.fetchExpenses()
})

const filteredExpenses = computed(() => {
  return expenseStore.filteredExpenses(searchQuery.value, timeFilter.value)
})

const toggleSort = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  expenseStore.expenses = expenseStore.sortedExpenses(sortOrder.value)
}

const addExpense = async () => {
  await expenseStore.addExpense({ ...newExpense.value, amount: parseFloat(newExpense.value.amount) })
  newExpense.value = { name:'', description:'', vendor:'', amount:'', date:'' }
  showAddForm.value = false
}

const startEdit = (expense) => {
  editingExpense.value = { ...expense }
  showEditForm.value = true
}

const updateExpense = async () => {
  await expenseStore.updateExpense({ ...editingExpense.value, amount: parseFloat(editingExpense.value.amount) })
  showEditForm.value = false
}

const prepareDelete = (id) => {
  expenseToDelete.value = id
  showDeleteConfirmation.value = true
}

const confirmDelete = async () => {
  await expenseStore.deleteExpense(expenseToDelete.value)
  showDeleteConfirmation.value = false
  expenseToDelete.value = null
}

const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US')
const toggleMenu = (id) => { openMenuId.value = openMenuId.value === id ? null : id }
</script>
<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>