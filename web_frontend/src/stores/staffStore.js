import { defineStore } from 'pinia'
import API from '@/plugin/axios'

export const useStoreStaff = defineStore('staff', {
  state: () => ({
    staff: [],
    loading: false,
    error: null,
  }),

  getters: {
    totalStaff: (state) => state.staff.length,
  },

  actions: {
    async fetchStaff() {
      this.loading = true
      this.error = null
      try {
        const res = await API.get('/staff')
        this.staff = res.data
      } catch (error) {
        this.error = 'Failed to fetch staff data'
        console.error('Error fetching staff:', error)
      } finally {
        this.loading = false
      }
    },
  },
})
