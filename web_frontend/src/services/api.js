import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api', // change if your Laravel server is elsewhere
  withCredentials: true, // optional if using Sanctum with cookies
});

export const post = (url, data) => API.post(url, data);
export const get = (url) => API.get(url);

export default API;
