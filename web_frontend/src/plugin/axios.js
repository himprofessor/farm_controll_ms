import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    // Add auth header if needed:
    // 'Authorization': `Bearer ${yourToken}`
  }
});

export default api;
