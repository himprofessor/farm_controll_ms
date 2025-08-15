// stores/materials.js
import { defineStore } from 'pinia'
import API from '@/plugin/axios'

export const useMaterialsStore = defineStore('materials', {
  state: () => ({
    materials: [],
  }),

  actions: {
    async fetchMaterials() {
      try {
        const response = await API.get('/materials')
        this.materials = response.data
      } catch (error) {
        console.error('Failed to fetch materials:', error)
      }
    }
  },

  getters: {
    // Group by category and sum value
    categorySummary: (state) => {
      const categoryTotals = {}

      state.materials.forEach((material) => {
        const category = material.category || 'Unknown'
        const value = parseFloat(material.value) || 0
        categoryTotals[category] = (categoryTotals[category] || 0) + value
      })

      return Object.entries(categoryTotals).map(([category, total]) => ({
        label: category,
        value: `$${total.toFixed(2)}`
      }))
    },

    totalExpenses: (state) => {
      return state.materials.reduce((sum, material) => {
        const value = parseFloat(material.value) || 0
        return sum + value
      }, 0)
    },

    // ✅ Low stock items
    lowStockItems: (state) => {
      return state.materials
        .filter((item) => item.currentStock <= 60)
        .map((item) => ({
          ...item,
          percentage: Math.min((item.currentStock / item.minStock) * 100, 100),
        }))
    },
    lowStockCount: (state) => {
    return state.materials.filter((item) => item.currentStock <= 60).length
  }
  }
})
