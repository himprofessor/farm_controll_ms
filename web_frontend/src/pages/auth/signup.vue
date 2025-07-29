<template>
  <div class="flex items-center justify-center min-h-screen bg-blue-50">
    <div class="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md w-full">
      <img src="/src/assets/image/image2.png" alt="Farm Logo" class="mx-auto mb-2 w-10 h-10">
      <h1 class="text-2xl font-bold text-green-600 text-center">Pig Farm Management System</h1>
      <p class="text-lg text-green-600 text-center">Welcome! My account signup.</p>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Full Name Field -->
        <div>
          <label class="block text-gray-700 mb-1">Full Name</label>
          <input 
            v-model="form.name" 
            type="text" 
            placeholder="Enter your full name"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1"
            :class="{'border-red-500': errors.name}"
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
        </div>

        <!-- Email Field -->
        <div>
          <label class="block text-gray-700 mb-1">Email Address</label>
          <input 
            v-model="form.email" 
            type="email" 
            placeholder="Enter email address"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 "
            :class="{'border-red-500': errors.email}"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <!-- Password Field -->
        <div>
          <label class="block text-gray-700 mb-1">Password</label>
          <input 
            v-model="form.password" 
            type="password" 
            placeholder="Enter password"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 "
            :class="{'border-red-500': errors.password}"
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <!-- Remember Me Checkbox -->
        <div class="flex items-center">
          <input 
            v-model="form.rememberMe" 
            type="checkbox"
            class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" 
          />
          <label class="ml-2 text-gray-700">Remember Me</label>
        </div>

        <!-- Submit Button -->
        <button 
          type="submit"
          class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          :disabled="isSubmitting"
        >
          <span v-if="!isSubmitting">Sign Up</span>
          <span v-else>Processing...</span>
        </button>

        <!-- Error Message -->
        <div v-if="submitError" class="text-red-500 text-center text-sm">
          {{ submitError }}
        </div>
      </form>

      <div class="mt-4 text-center text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-green-600 hover:underline ml-1">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Form data
const form = ref({
  name: '',
  email: '',
  password: '',
  rememberMe: false
});

// Error handling
const errors = ref({
  name: '',
  email: '',
  password: ''
});

const submitError = ref('');
const isSubmitting = ref(false);

// Validation function - modified to check all fields
const validateForm = () => {
  let isValid = true;
  errors.value = { name: '', email: '', password: '' };

  // Check email
  if (!form.value.email.trim()) {
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email';
    isValid = false;
  }

  // Check password
  if (!form.value.password) {
    isValid = false;
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters';
    isValid = false;
  }

  // Show combined error message if any field is invalid
  if (!isValid) {
    submitError.value = 'Please enter all required fields correctly';
  } else {
    submitError.value = '';
  }

  return isValid;
};

// Submit handler
const handleSubmit = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  submitError.value = '';

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // On success:
    if (form.value.rememberMe) {
      localStorage.setItem('rememberMe', 'true');
    }
    router.push('/dashboard');
  } catch (error) {
    submitError.value = 'Signup failed. Please try again.';
    console.error('Signup error:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>