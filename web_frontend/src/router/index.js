import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import DefaultLayout from '@/layouts/DefaultLayout.vue'

// Pages (eager-loaded for public routes)
import HomeScreen from '@/components/HomeScreen.vue'
import Login from '@/components/Login.vue'
import Signup from '@/pages/auth/signup.vue'

// Lazy-loaded views (authenticated routes)
const DashboardView = () => import('@/views/Dashboard.vue')
const StaffManagement = () => import('@/views/StaffManagement.vue')
const SalaryManagement = () => import('@/views/SalaryManagement.vue')
const InventoryManagement = () => import('@/views/InventoryManagement.vue')
const FinancialView = () => import('@/views/FinancialView.vue')

// Optional: 404 NotFound component
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

  // Authenticated routes wrapped with DefaultLayout
  {
    path: '/',
    component: DefaultLayout,
    meta: { requiresAuth: true }, // Optional meta for auth guard
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

  // Catch-all route for 404 Not Found
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

// Example navigation guard (optional):
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = false // replace with real auth check
//   if (to.meta.requiresAuth && !isAuthenticated) {
//     next({ name: 'Login' })
//   } else {
//     next()
//   }
// })

export default router
