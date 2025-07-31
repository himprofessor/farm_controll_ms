<<<<<<< HEAD
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
=======
import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8000/api', // or your production URL
  headers: {
    'Content-Type': 'application/json',
  },
})

export default API
>>>>>>> 4770fbf0af71bd9aa2fd792056808132076fea1b
