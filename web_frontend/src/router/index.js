<<<<<<< HEAD
import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue'; // Import the layout
import FinancialView from '@/views/FinancialView.vue';
=======
import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/Dashboard.vue'  // Correct path based on your structure
import InventoryManagement from '@/views/InventoryManagement.vue'
>>>>>>> Invetory_frontend

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'), // No Sidebar
  },
  {
    path: '/',
<<<<<<< HEAD
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
        path: 'financial',
        name: 'financial',
        component: FinancialView
      }
    ],
  },
];
=======
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/inventory',
    name: 'inventory',
    component: InventoryManagement
  }
]
>>>>>>> Invetory_frontend

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
