import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue'; 
import InventoryManagement from '@/views/InventoryManagement.vue';
import FinancialView from '@/views/FinancialView.vue';


// Use consistent aliasing
import HomeScreen from '@/components/HomeScreen.vue';
import Login from '@/components/Login.vue'; 
import StaffManagement from '../views/StaffManagement.vue';
import DashboardView from '../views/Dashboard.vue'  

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
    path: '/',
    component: DefaultLayout, 
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
      },
      {
        path: 'staff', 
        name: 'StaffManagement',
        component: () => import('@/views/StaffManagement.vue'),
      },
      {
        path: 'salary', 
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
      },
    ],
  },
];
 


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
