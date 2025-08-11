<template>
  <div class="flex items-center justify-center min-h-screen bg-blue-50">
    <div class="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md w-full">
      <img src="/src/assets/image/image2.png" alt="Farm Logo" class="mx-auto mb-2 w-10 h-10">
      <h1 class="text-2xl font-bold text-green-600 text-center">Pig Farm Management System</h1>
      <p class="text-lg text-green-600 text-center">Welcome! Create your account.</p>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Full Name Field -->
        <div>
          <label class="block text-gray-700 mb-1">Full Name</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Enter your full name"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1"
            :class="{ 'border-red-500': errors.name }"
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
        </div>

        <!-- Password Field -->
        <div>
          <label class="block text-gray-700 mb-1">Password</label>
          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter password"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 pr-10"
              :class="{ 'border-red-500': errors.password }"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  :d="showPassword 
                    ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' 
                    : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'" />
              </svg>
            </button>
          </div>
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <!-- Confirm Password Field -->
        <div>
          <label class="block text-gray-700 mb-1">Confirm Password</label>
          <input
            v-model="form.password_confirmation"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Confirm password"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1"
            :class="{ 'border-red-500': errors.password_confirmation }"
          />
          <p v-if="errors.password_confirmation" class="text-red-500 text-sm mt-1">{{ errors.password_confirmation }}</p>
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
import * as API from '@/api/service';

const router = useRouter();

const form = ref({
  name: '',
  password: '',
  password_confirmation: '',
});

const errors = ref({});
const submitError = ref('');
const isSubmitting = ref(false);
const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const validateForm = () => {
  let valid = true;
  errors.value = {};

  if (!form.value.name.trim()) {
    errors.value.name = 'Full name is required';
    valid = false;
  }

  if (!form.value.password) {
    errors.value.password = 'Password is required';
    valid = false;
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters';
    valid = false;
  }

  if (form.value.password !== form.value.password_confirmation) {
    errors.value.password_confirmation = 'Passwords do not match';
    valid = false;
  }

  return valid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  isSubmitting.value = true;

  try {
    const res = await API.post('/register', {
      name: form.value.name,
      password: form.value.password,
      password_confirmation: form.value.password_confirmation,
    });

    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard'); // ✅ Go to dashboard, not homescreen
    } else {
      submitError.value = res.data.message || 'Signup failed. Try again.';
    }
  } catch (err) {
    if (err.response?.data?.errors) {
      const serverErrors = err.response.data.errors;
      errors.value.name = serverErrors.name?.[0] || '';
      errors.value.password = serverErrors.password?.[0] || '';
      errors.value.password_confirmation = serverErrors.password_confirmation?.[0] || '';
    }
    submitError.value = err.response?.data?.message || 'Registration failed.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>
