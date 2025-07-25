import { createRouter, createWebHistory } from 'vue-router'

// Use consistent aliasing
import HomeScreen from '@/components/HomeScreen.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeScreen
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;


