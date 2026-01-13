// stores/overmaterial.js
import { defineStore } from 'pinia'
import API from '@/plugin/axios'

export const useMaterialStore = defineStore('materials', {
  state: () => ({
    materials: [],
    loading: false,
  }),

  actions: {
    async fetchMaterials() {
      this.loading = true
      try {
        const response = await API.get('/materials')
        this.materials = response.data || []
      } catch (error) {
        console.error('Failed to fetch materials:', error)
      } finally {
        this.loading = false
      }
    }
  },

  getters: {
    totalExpenses: (state) => {
      return state.materials.reduce((sum, m) => sum + (parseFloat(m.value) || 0), 0)
    },

    categorySummary: (state) => {
      const catTotal = {}
      state.materials.forEach((m) => {
        const category = m.category || 'Unknown'
        const value = parseFloat(m.value) || 0
        if (!catTotal[category]) catTotal[category] = 0
        catTotal[category] += value
      })
      return Object.entries(catTotal).map(([cat, total]) => ({
        label: cat,
        value: `$${total}`
      }))
    }
  }
})
