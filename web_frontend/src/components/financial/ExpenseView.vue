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
            placeholder="Search expenses..." 
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
        </div>
        
        <!-- Time Filter -->
        <select 
          v-model="timeFilter"
          class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
        >
          <option value="this-month">This Month</option>
          <option value="last-month">Last Month</option>
          <option value="this-quarter">This Quarter</option>
          <option value="this-year">This Year</option>
          <option value="all">All Time</option>
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
    
    <!-- Expense Table -->
    <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" @click="toggleSort">
                <div class="flex items-center gap-1">
                  Amount
                  <div class="flex flex-col">
                    <ChevronUp class="w-3 h-3" :class="sortOrder === 'asc' ? 'text-gray-900' : 'text-gray-400'" />
                    <ChevronDown class="w-3 h-3 -mt-1" :class="sortOrder === 'desc' ? 'text-gray-900' : 'text-gray-400'" />
                  </div>
                </div>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                <div class="flex items-center gap-2">
                  <button 
                    @click="editExpense(expense)"
                    class="text-blue-600 hover:text-blue-800"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button 
                    @click="deleteExpense(expense.id)"
                    class="text-red-600 hover:text-red-800"
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
import { Search, Plus, Edit, Trash2, CreditCard, ChevronUp, ChevronDown } from 'lucide-vue-next'

const showAddForm = ref(false)
const searchQuery = ref('')
const timeFilter = ref('this-month')
const sortOrder = ref('desc')

const newExpense = ref({
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

const editExpense = (expense) => {
  // Implement edit functionality
  console.log('Edit expense:', expense)
}

const deleteExpense = (id) => {
  if (confirm('Are you sure you want to delete this expense record?')) {
    expenseHistory.value = expenseHistory.value.filter(expense => expense.id !== id)
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
</script>