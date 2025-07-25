import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/Dashboard.vue'  // Correct path based on your structure
import InventoryManagement from '@/views/InventoryManagement.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/inventory',
    name: 'inventory',
    component: InventoryManagement
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router