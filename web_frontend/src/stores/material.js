// src/stores/materials.js
import { defineStore } from 'pinia'

import http from '@/api/sevice'

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
        const res = await http.get('/materials')
        const materialsArray = Array.isArray(res.data) ? res.data : res.data.data

        this.materials = materialsArray

        this.lowStockItems = materialsArray
          .filter(item => item.currentStock < 50)
          .map(item => ({
            ...item,
            percentage: Math.round((item.currentStock / item.minStock) * 10)
          }))
      } catch (error) {
        console.error('Error fetching materials:', error)
      }
    }
    },

})
