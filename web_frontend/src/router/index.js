import { createRouter, createWebHistory } from 'vue-router'
// import DashboardView from '../views/Dashboard.vue'  // Correct path based on your structure


// Use consistent aliasing
import HomeScreen from '@/components/HomeScreen.vue';
// import Login from '@/components/Login.vue'; // use @ instead of relative path
// import StaffManagement from '@/views/StaffManagement.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeScreen
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: Login
  // },
  // {
  //   path: '/Staff',
  //   name: 'StaffManagement',
  //   component: StaffManagement
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;


