import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8000/api', // or your production URL
  headers: {
    'Content-Type': 'application/json',
  },
})

export default API