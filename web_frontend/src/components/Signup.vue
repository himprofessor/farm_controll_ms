<template>
  <div class="flex items-center justify-center min-h-screen bg-blue-50">
    <div class="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md w-full">
      <img src="/src/assets/image/image2.png" alt="Farm Logo" class="mx-auto mb-2 w-10 h-10" />
      <h1 class="text-2xl font-bold text-green-600 text-center">Pig Farm Management System</h1>
      <p class="text-lg text-green-600 text-center">Welcome! Create your account.</p>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Full Name -->
        <div>
          <label class="block text-gray-700 mb-1" for="name">Full Name</label>
          <input
            v-model="form.name"
            id="name"
            type="text"
            placeholder="Enter your full name"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1"
            :class="{ 'border-red-500': errors.name }"
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-gray-700 mb-1" for="email">Email Address</label>
          <input
            v-model="form.email"
            id="email"
            type="email"
            placeholder="Enter your email"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1"
            :class="{ 'border-red-500': errors.email }"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-gray-700 mb-1" for="password">Password</label>
          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              placeholder="Enter your password"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 pr-10"
              :class="{ 'border-red-500': errors.password }"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="showPassword
                    ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                    : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'"
                />
              </svg>
            </button>
          </div>
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <!-- Confirm Password -->
        <div>
          <label class="block text-gray-700 mb-1" for="password_confirmation">Confirm Password</label>
          <input
            v-model="form.password_confirmation"
            :type="showPassword ? 'text' : 'password'"
            id="password_confirmation"
            placeholder="Confirm your password"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1"
            :class="{ 'border-red-500': errors.password_confirmation }"
          />
          <p v-if="errors.password_confirmation" class="text-red-500 text-sm mt-1">{{ errors.password_confirmation }}</p>
        </div>

        <!-- Remember Me -->
        <div class="flex items-center">
          <input
            v-model="form.rememberMe"
            type="checkbox"
            id="rememberMe"
            class="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <label for="rememberMe" class="ml-2 text-gray-700">Remember Me</label>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          :disabled="isSubmitting"
        >
          <span v-if="!isSubmitting">Sign Up</span>
          <span v-else>Processing...</span>
        </button>

        <!-- General Error -->
        <div v-if="submitError" class="text-red-500 text-center text-sm mt-2">
          {{ submitError }}
        </div>
      </form>

      <!-- Login Link -->
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

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  rememberMe: false,
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

  if (!form.value.email.trim()) {
    errors.value.email = 'Email is required';
    valid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(form.value.email)) {
    errors.value.email = 'Invalid email format';
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

  submitError.value = valid ? '' : 'Please fix the errors above';
  return valid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;

  try {
    const response = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.value.name,
        email: form.value.email,
        password: form.value.password,
        password_confirmation: form.value.password_confirmation,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      if (result.errors) {
        Object.entries(result.errors).forEach(([key, msg]) => {
          errors.value[key] = msg[0];
        });
        submitError.value = 'Please fix the errors above';
      } else {
        submitError.value = result.message || 'Registration failed';
      }
      return;
    }

    // Optional: Save token or user data if provided
    if (form.value.rememberMe) {
      localStorage.setItem('rememberMe', 'true');
    }

    router.push('/dashboard');
  } catch (err) {
    console.error(err);
    submitError.value = 'Signup failed. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>
