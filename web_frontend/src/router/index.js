import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue'; // Import the layout
import InventoryManagement from '@/views/InventoryManagement.vue';
import FinancialView from '@/views/FinancialView.vue';
import Signup from '@/pages/auth/signup.vue'


// Use consistent aliasing
import HomeScreen from '@/components/HomeScreen.vue';
import Login from '@/components/Login.vue'; // use @ instead of relative path
import StaffManagement from '../views/StaffManagement.vue';
import DashboardView from '../views/Dashboard.vue'  // Correct path based on your structure

// import StaffManagement from '@/views/StaffManagement.vue';
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
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/',
    component: DefaultLayout, // Wrap all authenticated routes here
    children: [
      {
        path: 'dashboard', // Default child route (e.g., /dashboard)
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
      },
      {
        path: 'staff', // Default child route (e.g., /dashboard)
        name: 'StaffManagement',
        component: () => import('@/views/StaffManagement.vue'),
      },
      {
        path: 'salary', // Now accessible at /salary (not /salary/)
        name: 'SalaryManagement',
        component: () => import('@/views/SalaryManagement.vue'),
      },
      {
        path: "/inventory",
        name: "inventory",
        component: InventoryManagement,
      },
      {
        path: "financial",
        name: "financial",
        component: FinancialView,
      }
    ],
  },
];
 


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
