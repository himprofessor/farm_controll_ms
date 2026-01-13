<template>
  <div class="min-h-screen flex bg-blue-50">
    <!-- Sidebar visible only when authenticated -->
    <Sidebar v-if="isAuthenticated" />

    <!-- Main content area -->
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')

// Logout function
const logout = () => {
  isAuthenticated.value = false
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('username')
  router.push('/')
}
</script>

<style scoped>
/* Base styles */
body, html {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.min-h-screen {
  display: flex;
  min-height: 100vh;
}

/* Main content */
.flex-1 {
  flex: 1;
  padding: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .flex-1 {
    padding: 0.5rem;
  }
}

@media (max-width: 480px) {
  .flex-1 {
    padding: 0.5rem;
  }
}
</style>
