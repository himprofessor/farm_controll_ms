// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

// Layout
import DefaultLayout from '@/layouts/DefaultLayout.vue'

// Public Pages
import HomeScreen from '@/components/HomeScreen.vue'
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'

// Authenticated Views (lazy-loaded)
const DashboardView = () => import('@/views/Dashboard.vue')
const StaffManagement = () => import('@/views/StaffManagement.vue')
const SalaryManagement = () => import('@/views/SalaryManagement.vue')
const InventoryManagement = () => import('@/views/InventoryManagement.vue')
const FinancialView = () => import('@/views/FinancialView.vue')

// // Optional 404 page (lazy-loaded)
// const NotFound = () => import('@/components/NotFound.vue')

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
      },
      {
        path: 'financial',
        name: 'FinancialView',
        component: FinancialView,
      },
    ],
  },

  // // Catch-all 404 route
  // {
  //   path: '/:catchAll(.*)',
  //   name: 'NotFound',
  //   component: NotFound,
  // },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation guard to check auth status before routing
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = !!authStore.token

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Not authenticated and trying to access protected route
    next({ name: 'Login' })
  } else if (
    (to.name === 'Login' || to.name === 'Signup') &&
    isAuthenticated
  ) {
    // Prevent authenticated users from visiting login/signup
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
