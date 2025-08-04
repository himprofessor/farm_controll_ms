import axios from 'axios';
import { AppleIcon } from 'lucide-vue-next';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // base API URL only
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false
});

<<<<<<< HEAD
export default apiClient;
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};
export const clearAuthToken = () => {
    delete apiClient.defaults.headers.common['Authorization'];
}
=======
export default API
>>>>>>> development
