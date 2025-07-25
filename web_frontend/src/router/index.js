import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/Dashboard.vue'  // Correct path based on your structure
import FinancialView from '@/views/FinancialView.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/financial',
    name: 'financial',
    component: FinancialView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router