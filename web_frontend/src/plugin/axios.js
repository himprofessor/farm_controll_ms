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

export default API ;
