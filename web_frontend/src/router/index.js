import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/Dashboard.vue'  // Correct path based on your structure

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'), // No Sidebar
  },
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;