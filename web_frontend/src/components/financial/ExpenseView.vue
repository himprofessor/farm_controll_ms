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
            placeholder="Search expenses..." 
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
        </div>
        
        <!-- Time Filter -->
        <select 
          v-model="timeFilter"
          class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
        >
          <option value="all">All Time</option>
          <option value="this-month">This Month</option>
          <option value="last-month">Last Month</option>
          <option value="this-quarter">This Quarter</option>
          <option value="this-year">This Year</option>
        </select>
      </div>
      
      <!-- Add Expense Button -->
      <button 
        @click="showAddForm = !showAddForm"
        class="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
      >
        <Plus class="w-4 h-4" />
        Add Expense
      </button>
    </div>

    <!-- Add Expense Form (Collapsible) -->
    <div v-if="showAddForm" class="bg-white p-6 rounded-lg shadow-sm border">
      <h4 class="font-medium text-gray-900 mb-4">Add New Expense</h4>
      <form @submit.prevent="addExpense" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <input 
          v-model="newExpense.category"
          type="text" 
          placeholder="Category" 
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
        <input 
          v-model="newExpense.description"
          type="text" 
          placeholder="Description" 
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
        <input 
          v-model="newExpense.vendor"
          type="text" 
          placeholder="Vendor" 
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
        <input 
          v-model="newExpense.amount"
          type="number" 
          placeholder="Amount" 
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
            Add Expense
          </button>
          <button 
            type="button" 
            @click="showAddForm = false"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
    
    <!-- Edit Expense Form (Modal) -->
    <div v-if="showEditForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-sm border p-6 w-full max-w-2xl">
        <h4 class="font-medium text-gray-900 mb-4">Edit Expense</h4>
        <form @submit.prevent="updateExpense" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <input 
            v-model="editingExpense.category"
            type="text" 
            placeholder="Category" 
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
          <input 
            v-model="editingExpense.description"
            type="text" 
            placeholder="Description" 
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
          <input 
            v-model="editingExpense.vendor"
            type="text" 
            placeholder="Vendor" 
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
          <input 
            v-model="editingExpense.amount"
            type="number" 
            placeholder="Amount" 
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
              Save Changes
            </button>
            <button 
              type="button" 
              @click="showEditForm = false"
              class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-sm border p-6 max-w-md w-full">
        <h4 class="font-medium text-gray-900 mb-4">Confirm Deletion</h4>
        <p class="text-gray-700 mb-6">Are you sure you want to delete this expense record? This action cannot be undone.</p>
        <div class="flex gap-2 justify-end">
          <button 
            @click="showDeleteConfirmation = false"
            class="bg-white border text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-200"
          >
            Cancel
          </button>
          <button 
            @click="confirmDelete"
            class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
          >
            Delete
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
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Description</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Vendor</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-green-500" @click="toggleSort">
                <div class="flex items-center gap-1">
                  Amount
                  <div class="flex flex-col">
                    <ChevronUp class="w-3 h-3" :class="sortOrder === 'asc' ? 'text-white' : 'text-gray-400'" />
                    <ChevronDown class="w-3 h-3 -mt-1" :class="sortOrder === 'desc' ? 'text-white' : 'text-gray-400'" />
                  </div>
                </div>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="expense in filteredExpenses" :key="expense.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(expense.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ expense.category }}
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
                        Edit
                      </button>
                      <button 
                        @click="prepareDelete(expense.id); toggleMenu(expense.id)" 
                        class="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                      >
                        <svg class="mr-3 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        Delete
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
        <p class="text-gray-500">No expense records found</p>
        <p class="text-sm text-gray-400">Try adjusting your search or filters</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, Plus, CreditCard, ChevronUp, ChevronDown, MoreVertical } from 'lucide-vue-next'

const showAddForm = ref(false)
const showEditForm = ref(false)
const showDeleteConfirmation = ref(false)
const searchQuery = ref('')
const timeFilter = ref('this-month')
const sortOrder = ref('desc')
const expenseToDelete = ref(null)
const openMenuId = ref(null)

const newExpense = ref({
  category: '',
  description: '',
  vendor: '',
  amount: '',
  date: ''
})

const editingExpense = ref({
  id: null,
  category: '',
  description: '',
  vendor: '',
  amount: '',
  date: ''
})

const expenseHistory = ref([
  { 
    id: 1, 
    category: 'Feed', 
    description: 'Monthly pig feed supply',
    vendor: 'Farm Supply Co.',
    amount: 3500, 
    date: '2024-01-14' 
  },
  { 
    id: 2, 
    category: 'Salaries', 
    description: 'Monthly staff wages',
    vendor: 'Payroll',
    amount: 12000, 
    date: '2024-01-01' 
  },
  { 
    id: 3, 
    category: 'Utilities', 
    description: 'Electricity and water bills',
    vendor: 'Utility Company',
    amount: 1200, 
    date: '2024-01-12' 
  },
  { 
    id: 4, 
    category: 'Veterinary', 
    description: 'Routine health checkups',
    vendor: 'Animal Health Clinic',
    amount: 800, 
    date: '2024-01-09' 
  },
  { 
    id: 5, 
    category: 'Equipment', 
    description: 'Tractor maintenance',
    vendor: 'Equipment Services',
    amount: 2500, 
    date: '2024-01-06' 
  },
  { 
    id: 6, 
    category: 'Insurance', 
    description: 'Farm liability insurance',
    vendor: 'Insurance Corp',
    amount: 1800, 
    date: '2024-01-03' 
  }
])

const filteredExpenses = computed(() => {
  let filtered = expenseHistory.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(expense => 
      expense.category.toLowerCase().includes(query) ||
      expense.description.toLowerCase().includes(query) ||
      expense.vendor.toLowerCase().includes(query)
    )
  }

  // Apply time filter
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  filtered = filtered.filter(expense => {
    const expenseDate = new Date(expense.date)
    
    switch (timeFilter.value) {
      case 'this-month':
        return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
      case 'last-month':
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
        const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear
        return expenseDate.getMonth() === lastMonth && expenseDate.getFullYear() === lastMonthYear
      case 'this-quarter':
        const currentQuarter = Math.floor(currentMonth / 3)
        const expenseQuarter = Math.floor(expenseDate.getMonth() / 3)
        return expenseQuarter === currentQuarter && expenseDate.getFullYear() === currentYear
      case 'this-year':
        return expenseDate.getFullYear() === currentYear
      default:
        return true
    }
  })

  // Apply sorting
  return filtered.sort((a, b) => {
    if (sortOrder.value === 'asc') {
      return a.amount - b.amount
    } else {
      return b.amount - a.amount
    }
  })
})

const addExpense = () => {
  if (newExpense.value.category && newExpense.value.description && newExpense.value.vendor && newExpense.value.amount && newExpense.value.date) {
    expenseHistory.value.unshift({
      id: Date.now(),
      category: newExpense.value.category,
      description: newExpense.value.description,
      vendor: newExpense.value.vendor,
      amount: parseFloat(newExpense.value.amount),
      date: newExpense.value.date
    })
    
    // Reset form
    newExpense.value = {
      category: '',
      description: '',
      vendor: '',
      amount: '',
      date: ''
    }
    showAddForm.value = false
  }
}

const startEdit = (expense) => {
  editingExpense.value = {
    id: expense.id,
    category: expense.category,
    description: expense.description,
    vendor: expense.vendor,
    amount: expense.amount,
    date: expense.date
  }
  showEditForm.value = true
}

const updateExpense = () => {
  const index = expenseHistory.value.findIndex(item => item.id === editingExpense.value.id)
  if (index !== -1) {
    expenseHistory.value[index] = {
      ...editingExpense.value,
      amount: parseFloat(editingExpense.value.amount)
    }
    showEditForm.value = false
  }
}

const prepareDelete = (id) => {
  expenseToDelete.value = id
  showDeleteConfirmation.value = true
}

const confirmDelete = () => {
  if (expenseToDelete.value) {
    expenseHistory.value = expenseHistory.value.filter(expense => expense.id !== expenseToDelete.value)
    showDeleteConfirmation.value = false
    expenseToDelete.value = null
  }
}

const toggleSort = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
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