import { createRouter, createWebHistory } from 'vue-router'


// Use consistent aliasing
import HomeScreen from '@/components/HomeScreen.vue';
import Login from '@/components/Login.vue'; // use @ instead of relative path
// import StaffManagement from '@/views/StaffManagement.vue';
import DashboardView from '../views/Dashboard.vue'  // Correct path based on your structure

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeScreen
  },
 {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // {
  //   path: '/Staff',
  //   name: 'StaffManagement',
  //   component: StaffManagement
  // }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

