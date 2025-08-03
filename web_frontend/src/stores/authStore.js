import { defineStore } from 'pinia'
import http from '@/api/service'  // your axios instance with correct baseURL pointing to backend API

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  }),

  actions: {
    async login(credentials) {
      try {
        // Make sure your axios baseURL points to your backend API (e.g., http://localhost:8000/api)
        const response = await http.post('/login', credentials)

        // Assuming backend returns token and user info like this:
        this.token = response.data.token
        this.user = response.data.user || response.data.auth || null

        // Store token and user locally
        localStorage.setItem('token', this.token)
        localStorage.setItem('user', JSON.stringify(this.user))

        // Set default Authorization header for all future requests
        http.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

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

      // Remove Authorization header
      delete http.defaults.headers.common['Authorization']
    },

    // Optionally, add a method to check if user is logged in
    isLoggedIn() {
      return !!this.token && !!this.user
    },
  },
})
