// src/stores/staff.js
import { defineStore } from 'pinia'
import API from '@/plugin/axios'

export const useStoreStaff = defineStore('staff', {
  state: () => ({
    staff: [],
    loading: false,
    error: null,
  }),

  getters: {
    // Total staff count
    totalStaff: (state) => state.staff.length,

    // Number of staff added in current month
    newStaffThisMonth: (state) => {
      const now = new Date()
      return state.staff.filter((item) => {
        const created = new Date(item.created_at)
        return (
          created.getMonth() === now.getMonth() &&
          created.getFullYear() === now.getFullYear()
        )
      }).length
    },

    // Smooth message for dashboard display
    smoothChangeText: (state) => {
      const now = new Date()
      const added = state.staff.filter((item) => {
        const created = new Date(item.created_at)
        return (
          created.getMonth() === now.getMonth() &&
          created.getFullYear() === now.getFullYear()
        )
      }).length

      if (added > 0) {
        return `↑ ${added} added this month`
      } else {
        return '— No new staff this month'
      }
    },
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
