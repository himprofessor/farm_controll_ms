import axios from 'axios'

// Create an Axios instance
const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Matches .env name
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add token from localStorage
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor to handle global errors
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.log('Unauthorized! Redirect to login.')
        // Optionally trigger logout or redirect here
      }
    } else if (error.request) {
      console.log('Network error or no response received')
    }
    return Promise.reject(error)
  }
)

export default http
