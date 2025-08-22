import { defineStore } from 'pinia'
import API from '@/plugin/axios'

export const useExpenseStore = defineStore('expenses', {
  state: () => ({
    expenses: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchExpenses() {
      this.loading = true
      this.error = null
      try {
        const res = await API.get('/expenses')
        this.expenses = res.data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
      }
    },

    async addExpense(expense) {
      this.error = null
      try {
        const res = await API.post('/expenses', expense)
        // unshift keeps new expense at top
        this.expenses.unshift(res.data)
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      }
    },

    async updateExpense(expense) {
      this.error = null
      try {
        const res = await API.put(`/expenses/${expense.id}`, expense)
        const index = this.expenses.findIndex(e => e.id === expense.id)
        if (index !== -1) this.expenses[index] = res.data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      }
    },

    async deleteExpense(id) {
      this.error = null
      try {
        await API.delete(`/expenses/${id}`)
        this.expenses = this.expenses.filter(e => e.id !== id)
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      }
    }
  },

  getters: {
    sortedExpenses: (state) => (sortOrder = 'desc') => {
      return [...state.expenses].sort((a, b) =>
        sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount
      )
    },

    filteredExpenses: (state) => (searchQuery = '', timeFilter = 'all') => {
      let filtered = [...state.expenses]

      // search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        filtered = filtered.filter(expense =>
          expense.name.toLowerCase().includes(q) ||
          expense.description.toLowerCase().includes(q) ||
          expense.vendor.toLowerCase().includes(q)
        )
      }

      // time filter
      const now = new Date()
      const currentMonth = now.getMonth()
      const currentYear = now.getFullYear()

      filtered = filtered.filter(expense => {
        const expenseDate = new Date(expense.date)
        switch (timeFilter) {
          case 'this-month':
            return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
          case 'last-month': {
            const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
            const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear
            return expenseDate.getMonth() === lastMonth && expenseDate.getFullYear() === lastMonthYear
          }
          case 'this-quarter': {
            const currentQuarter = Math.floor(currentMonth / 3)
            const expenseQuarter = Math.floor(expenseDate.getMonth() / 3)
            return expenseQuarter === currentQuarter && expenseDate.getFullYear() === currentYear
          }
          case 'this-year':
            return expenseDate.getFullYear() === currentYear
          default:
            return true
        }
      })

      return filtered
    }
  }
})
