<template>
  <LoginForm />
</template>

<script>
import LoginForm from '@/components/auth/LoginForm.vue'

export default {
  name: 'Login',
  components: {
    LoginForm
  },
  beforeRouteEnter(to, from, next) {
    // Check if user is already authenticated
    const token = localStorage.getItem('token')
    if (token) {
      next('/dashboard')
    } else {
      next()
    }
  }
}
</script>
