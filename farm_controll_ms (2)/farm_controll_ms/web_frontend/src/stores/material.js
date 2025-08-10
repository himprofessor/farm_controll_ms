// src/stores/materials.js
import { defineStore } from 'pinia'
import API from '@/plugin/axios'

export const useMaterialsStore = defineStore('materials', {
  state: () => ({
    materials: [],
    lowStockItems: []
  }),

  getters: {
    lowStockCount: (state) => state.lowStockItems.length
  },

  actions: {
    async fetchMaterials() {
      try {
        const res = await API.get('/materials')
        this.materials = res.data
        this.lowStockItems = res.data
          .filter(item => item.currentStock < 50)
          .map(item => ({
            ...item,
            percentage: Math.round((item.currentStock / item.minStock) * 10)
          }))
      } catch (error) {
        console.error('Error fetching materials:', error)
      }
    }
  }
})
