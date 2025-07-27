import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/Dashboard.vue'  // Correct path based on your structure
import HomeScreen from '@/components/HomeScreen.vue'

const routes = [
    {
    path: '/',
    name: 'homescreen',
    component: HomeScreen
  },
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router