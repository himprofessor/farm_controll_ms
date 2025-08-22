// stores/incomeStore.js
import { defineStore } from 'pinia'
import API from '@/plugin/axios'  // Axios instance

export const useIncomeStore = defineStore('income', {
  state: () => ({
    incomes: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchIncomes() {
      this.loading = true
      try {
        const res = await API.get('/incomes')
        this.incomes = res.data
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to fetch incomes'
      } finally {
        this.loading = false
      }
    },

    async addIncome(payload) {
      try {
        const res = await API.post('/incomes', payload)
        this.incomes.unshift(res.data) // insert at top
      } catch (err) {
        throw err
      }
    },

    async updateIncome(id, payload) {
      try {
        const res = await API.put(`/incomes/${id}`, payload)
        const index = this.incomes.findIndex(i => i.id === id)
        if (index !== -1) this.incomes[index] = res.data
      } catch (err) {
        throw err
      }
    },

    async deleteIncome(id) {
      try {
        await API.delete(`/incomes/${id}`)
        this.incomes = this.incomes.filter(i => i.id !== id)
      } catch (err) {
        throw err
      }
    }
  }
})
