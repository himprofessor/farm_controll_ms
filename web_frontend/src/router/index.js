import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue'; // Import the layout

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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;