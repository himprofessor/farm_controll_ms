import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue'; // Import the layout
import InventoryManagement from '@/views/InventoryManagement.vue';
import FinancialView from '@/views/FinancialView.vue';
<<<<<<< HEAD
import InventoryManagement from '@/views/InventoryManagement.vue'
=======
>>>>>>> Invetory_frontend

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'), // No Sidebar
  },
  {
    path: '/',
    component: DefaultLayout, // Wrap all authenticated routes here
    children: [
      {
        path: '', // Default child route (e.g., /dashboard)
        name: 'dashboard',
        component: () => import('@/views/Dashboard.vue'),
      },
      {
        path: 'salary', // Now accessible at /salary (not /salary/)
        name: 'SalaryManagement',
        component: () => import('@/views/SalaryManagement.vue'),
      },
      {
<<<<<<< HEAD
        path: 'financial',
        name: 'financial',
        component: FinancialView
      },
      {
        path: 'inventory',
        name: 'inventory',
        component: InventoryManagement
      }
=======
        path: "/inventory",
        name: "inventory",
        component: InventoryManagement,
      },
      {
        path: "financial",
        name: "financial",
        component: FinancialView,
      },
>>>>>>> Invetory_frontend
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
