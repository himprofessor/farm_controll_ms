import { createRouter, createWebHistory } from 'vue-router';

// Layout
import DefaultLayout from '@/layouts/DefaultLayout.vue';

// Public Pages
import HomeScreen from '@/components/HomeScreen.vue';
import Login from '@/components/Login.vue';
import Signup from '@/pages/auth/signup.vue';

// Authenticated Views (lazy or eager loaded)
import DashboardView from '@/views/Dashboard.vue';
import StaffManagement from '@/views/StaffManagement.vue';
import SalaryManagement from '@/views/SalaryManagement.vue';
import InventoryManagement from '@/views/InventoryManagement.vue';
import FinancialView from '@/views/FinancialView.vue';
// import NotFound from '@/components/NotFound.vue'; // Optional 404 page

const routes = [
  // Public routes
  {
    path: '/',
    name: 'Home',
    component: HomeScreen,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },

  // Authenticated routes under DefaultLayout
  {
    path: '/',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: DashboardView,
      },
      {
        path: 'staff',
        name: 'StaffManagement',
        component: StaffManagement,
      },
      {
        path: 'salary',
        name: 'SalaryManagement',
        component: SalaryManagement,
      },
      {
        path: 'inventory',
        name: 'InventoryManagement',
        component: InventoryManagement,
        meta: { requiresAuth: true },
      },
      {
        path: 'financial',
        name: 'FinancialView',
        component: FinancialView,
      },
    ],
  },

  // Optional catch-all 404 route
  // {
  //   path: '/:catchAll(.*)',
  //   name: 'NotFound',
  //   component: NotFound,
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Optional: Navigation guard
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = false; // Replace with your actual auth logic
//   if (to.meta.requiresAuth && !isAuthenticated) {
//     next({ name: 'Login' });
//   } else {
//     next();
//   }
// });

export default router;
