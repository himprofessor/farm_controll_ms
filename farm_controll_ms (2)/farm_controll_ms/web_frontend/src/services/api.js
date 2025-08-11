import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, 
});

export const post = (url, data) => API.post(url, data);
export const get = (url) => API.get(url);

export default API;
