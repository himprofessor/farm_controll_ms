import { createRouter, createWebHistory } from 'vue-router';

// Layouts and views
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import HomeScreen from '@/components/HomeScreen.vue';
import Login from '@/components/Login.vue';
import InventoryManagement from '@/views/InventoryManagement.vue';
import FinancialView from '@/views/FinancialView.vue';
<<<<<<< HEAD
import Signup from '@/pages/auth/signup.vue'
=======
import StaffManagement from '@/views/StaffManagement.vue';
import DashboardView from '@/views/Dashboard.vue';
>>>>>>> Invetory_frontend

const routes = [
  {
    path: '/',
    name: 'homescreen',
    component: HomeScreen,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
   {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: DashboardView,
        meta: { requiresAuth: true },
      },
      {
        path: 'staff',
        name: 'StaffManagement',
        component: StaffManagement,
        meta: { requiresAuth: true },
      },
      {
        path: 'salary',
        name: 'SalaryManagement',
        component: () => import('@/views/SalaryManagement.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'inventory',
        name: 'inventory',
        component: InventoryManagement,
        meta: { requiresAuth: true },
      },
      {
        path: 'financial',
        name: 'financial',
        component: FinancialView,
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 🔐 Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
