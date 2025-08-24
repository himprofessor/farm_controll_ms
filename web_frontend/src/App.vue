<!-- App.vue -->
<template>
  <div class="min-h-screen bg-blue-50">
    <NavBar v-if="isAuthenticated" @logout="logout" />
    <router-view />
    <!-- <Sidebar /> -->
  </div>
  
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from './components/Sidebar.vue'


const router = useRouter();
const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true');

const logout = () => {
  isAuthenticated.value = false;
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('username');
  router.push('/');
};
</script>

<style scoped>
/* Base styles */
body, html {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

/* App container */
.min-h-screen {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ebf8ff; /* same as bg-blue-50 */
}

/* NavBar default styles */
nav {
  width: 100%;
  background-color: #4299e1; /* blue */
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Main content area */
.router-view {
  flex: 1;
  padding: 1rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  nav {
    flex-direction: column;
    text-align: center;
  }

  .router-view {
    padding: 0.5rem;
  }
}

@media (max-width: 480px) {
  nav {
    font-size: 0.9rem;
    padding: 0.5rem;
  }

  .router-view {
    padding: 0.5rem;
  }
}
</style>

