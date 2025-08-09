import { defineStore } from 'pinia'
import http from '@/api/sevice'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token && !!state.user,
  },

  actions: {
    async login(credentials) {
      try {
        const response = await http.post('/login', credentials)
        this.token = response.data.token
        this.user = response.data.user || response.data.auth || null

        localStorage.setItem('token', this.token)
        localStorage.setItem('user', JSON.stringify(this.user))

        // No need to manually set Authorization header, interceptor handles it
        return true
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')

      // No need to manually delete headers here; interceptor reads localStorage each time
    },
  },
})
