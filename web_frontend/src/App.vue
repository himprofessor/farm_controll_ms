<!-- App.vue -->
<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar v-if="isAuthenticated" @logout="logout" />
    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// import NavBar from './components/NavBar.vue';

const router = useRouter();
const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true');

const logout = () => {
  isAuthenticated.value = false;
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('username');
  router.push('/');
};
</script>

