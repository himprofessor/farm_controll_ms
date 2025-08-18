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
            placeholder="Search income..." 
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
      
      <!-- Add Income Button -->
      <button 
        @click="showAddForm = !showAddForm"
        class="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
      >
        <Plus class="w-4 h-4" />
        Add Income
      </button>
    </div>

    <!-- Add Income Form (Collapsible) -->
    <div v-if="showAddForm" class="bg-white p-6 rounded-lg shadow-sm border">
      <h4 class="font-medium text-gray-900 mb-4">Add New Income</h4>
      <form @submit.prevent="addIncome" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <input 
          v-model="newIncome.category"
          type="text" 
          placeholder="Category" 
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
        <input 
          v-model="newIncome.description"
          type="text" 
          placeholder="Description" 
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
        <input 
          v-model="newIncome.customer"
          type="text" 
          placeholder="Customer" 
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
        <input 
          v-model="newIncome.amount"
          type="number" 
          placeholder="Amount" 
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
            Add Income
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
    
    <!-- Edit Income Form (Modal) -->
    <div v-if="showEditForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-sm border p-6 w-full max-w-2xl">
        <h4 class="font-medium text-gray-900 mb-4">Edit Income</h4>
        <form @submit.prevent="updateIncome" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <input 
            v-model="editingIncome.category"
            type="text" 
            placeholder="Category" 
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
          <input 
            v-model="editingIncome.description"
            type="text" 
            placeholder="Description" 
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
          <input 
            v-model="editingIncome.customer"
            type="text" 
            placeholder="Customer" 
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
          <input 
            v-model="editingIncome.amount"
            type="number" 
            placeholder="Amount" 
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
        <p class="text-gray-700 mb-6">Are you sure you want to delete this income record? This action cannot be undone.</p>
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
    
    <!-- Income Table -->
    <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-green-600 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Product_Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Description</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Customer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="income in filteredIncome" :key="income.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(income.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ income.category }}
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
                        Edit
                      </button>
                      <button 
                        @click="prepareDelete(income.id); toggleMenu(income.id)" 
                        class="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left rounded-b-lg"
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
      <div v-if="filteredIncome.length === 0" class="text-center py-12">
        <div class="text-gray-400 mb-2">
          <DollarSign class="w-12 h-12 mx-auto" />
        </div>
        <p class="text-gray-500">No income records found</p>
        <p class="text-sm text-gray-400">Try adjusting your search or filters</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, Plus, DollarSign, MoreVertical } from 'lucide-vue-next'

const showAddForm = ref(false)
const showEditForm = ref(false)
const showDeleteConfirmation = ref(false)
const searchQuery = ref('')
const timeFilter = ref('all')
const incomeToDelete = ref(null)
const openMenuId = ref(null)

const newIncome = ref({
  category: '',
  description: '',
  customer: '',
  amount: '',
  date: ''
})

const editingIncome = ref({
  id: null,
  category: '',
  description: '',
  customer: '',
  amount: '',
  date: ''
})

const incomeHistory = ref([
  { 
    id: 1, 
    category: 'Pig Sales', 
    description: '50 pigs sold to local market',
    customer: 'Local Market Co.',
    amount: 15000, 
    date: '2024-01-15' 
  },
  { 
    id: 2, 
    category: 'Manure Sales', 
    description: 'Organic fertilizer sales',
    customer: 'Garden Center',
    amount: 800, 
    date: '2024-01-13' 
  },
  { 
    id: 3, 
    category: 'Pig Sales', 
    description: '30 pigs sold to restaurant chain',
    customer: 'Restaurant Chain',
    amount: 8500, 
    date: '2024-01-08' 
  },
  { 
    id: 4, 
    category: 'Egg Sales', 
    description: 'Fresh eggs weekly delivery',
    customer: 'Local Grocery',
    amount: 1200, 
    date: '2024-01-05' 
  }
])

const filteredIncome = computed(() => {
  let filtered = incomeHistory.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(income => 
      income.category.toLowerCase().includes(query) ||
      income.description.toLowerCase().includes(query) ||
      income.customer.toLowerCase().includes(query)
    )
  }

  // Apply time filter
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

const addIncome = () => {
  if (newIncome.value.category && newIncome.value.description && newIncome.value.customer && newIncome.value.amount && newIncome.value.date) {
    incomeHistory.value.unshift({
      id: Date.now(),
      category: newIncome.value.category,
      description: newIncome.value.description,
      customer: newIncome.value.customer,
      amount: parseFloat(newIncome.value.amount),
      date: newIncome.value.date
    })
    
    // Reset form
    newIncome.value = {
      category: '',
      description: '',
      customer: '',
      amount: '',
      date: ''
    }
    showAddForm.value = false
  }
}

const startEdit = (income) => {
  editingIncome.value = {
    id: income.id,
    category: income.category,
    description: income.description,
    customer: income.customer,
    amount: income.amount,
    date: income.date
  }
  showEditForm.value = true
}

const updateIncome = () => {
  const index = incomeHistory.value.findIndex(item => item.id === editingIncome.value.id)
  if (index !== -1) {
    incomeHistory.value[index] = {
      ...editingIncome.value,
      amount: parseFloat(editingIncome.value.amount)
    }
    showEditForm.value = false
  }
}

const prepareDelete = (id) => {
  incomeToDelete.value = id
  showDeleteConfirmation.value = true
}

const confirmDelete = () => {
  if (incomeToDelete.value) {
    incomeHistory.value = incomeHistory.value.filter(income => income.id !== incomeToDelete.value)
    showDeleteConfirmation.value = false
    incomeToDelete.value = null
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