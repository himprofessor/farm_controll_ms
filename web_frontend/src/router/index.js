import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/Dashboard.vue'  // Correct path based on your structure

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/salary',
    name: 'salary',
    component: () => import('../views/SalaryManagement.vue')  // Lazy loading the SalaryView component
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router