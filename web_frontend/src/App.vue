<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar v-if="isAuthenticated" @logout="logout" />
    <router-view />
    </div>
  <div class="flex">
    <Sidebar />
    <main class="flex-1 ml-64 p-6">
      <!-- <router-view /> -->
     </main>
  </div>
 
  
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// import Sidebar from '@/components/Sidebar.vue'

const router = useRouter();
const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true');

const logout = () => {
  isAuthenticated.value = false;
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('username');
  router.push('/');
};
</script>



