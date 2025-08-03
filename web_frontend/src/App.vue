<template>
  <div id="app">
    <RouterView v-if="!error" />
    <div v-else class="error-message">
      An error occurred. Please try refreshing the page or contact support.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const error = ref(null)

// Global error handler
import { getCurrentInstance } from 'vue'
const { appContext } = getCurrentInstance()
appContext.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err, 'Instance:', instance, 'Info:', info)
  error.value = err
}
</script>

<style scoped>
.error-message {
  color: red;
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
}
</style>