import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/Dashboard.vue' 
import SalaryManagement from '../views/SalaryManagement.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
   {
    path: '/salary',
    name: 'SalaryManagement',
    component: SalaryManagement
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router