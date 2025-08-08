// stores/materials.js
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
        this.materials = response.data
      } catch (error) {
        console.error('Failed to fetch materials:', error)
      } finally {
        this.loading = false
      }
    }
  },

  getters: {
    // ✅ Group by category and sum value
    categorySummary: (state) => {
      const categoryTotals = {}

      state.materials.forEach((material) => {
        const category = material.category || 'Unknown'
        const value = parseFloat(material.value) || 0

        if (!categoryTotals[category]) {
          categoryTotals[category] = 0
        }

        categoryTotals[category] += value
      })

      return Object.entries(categoryTotals).map(([category, total]) => ({
        label: category,
        value: `$${total.toFixed(2)}`
      }))
    },

    // ✅ Total expenses (sum of all material values)
    totalExpenses: (state) => {
      return state.materials.reduce((sum, material) => {
        const value = parseFloat(material.value) || 0
        return sum + value
      }, 0)
    }
  }
})
