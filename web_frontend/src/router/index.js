import { createRouter, createWebHistory } from 'vue-router'


// Use consistent aliasing
import HomeScreen from '@/components/HomeScreen.vue';
import Login from '@/components/Login.vue';

// import StaffManagement from '@/views/StaffManagement.vue';
import DashboardView from '@/views/Dashboard.vue'  // Correct path based on your structure
const routes = [
    {
    path: '/',
    name: 'homescreen',
    component: HomeScreen
  },
    {
    path: '/login',
    name: 'login',
    component: Login
  },
 {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },


];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
