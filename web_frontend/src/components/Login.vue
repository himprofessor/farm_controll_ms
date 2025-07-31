<template>
    <div class="flex items-center justify-center min-h-screen bg-blue-50">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

            <!-- Header Section -->
            <div class="text-center mb-6">
                <img src="../assets/image/image2.png" alt="Farm Logo" class="mx-auto mb-2 w-10 h-10" />
                <h1 class="text-2xl font-bold text-green-600">Pig Farm Management System</h1>
                <p class="text-lg text-green-600">Welcome! My account login.</p>
            </div>

            <!-- Login Form -->
            <form @submit.prevent="login">
                <!-- Username -->
                <div class="mb-4">
                    <label for="name" class="block text-gray-700 mb-2">Username</label>
                    <input v-model="credentials.name" type="text" id="name" placeholder="Enter username"
                        class="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </div>

                <!-- Password -->
                <div class="mb-4">
                    <label for="password" class="block text-gray-700 mb-2">Password</label>
                    <input v-model="credentials.password" type="password" id="password" placeholder="Enter password"
                        class="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600" />
                </div>

                <!-- Remember Me Checkbox -->
                <div class="mb-6 flex items-center">
                    <input v-model="rememberMe" type="checkbox" id="remember" class="mr-2" />
                    <label for="remember" class="text-gray-700 text-sm">Remember Me</label>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">
                    Login
                </button>

                <!-- Error Message -->
                <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>

                <!-- Signup Link -->
                <p class="text-sm text-gray-600 mt-4 text-center">
                    Don't have an account?
                    <router-link to="/signup" class="text-green-600 hover:underline">
                        Sign up
                    </router-link>
                </p>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api'; 

const router = useRouter();

const credentials = ref({ name: '', password: '' });
const error = ref('');
const rememberMe = ref(false);

const login = async () => {
  error.value = '';

  if (!credentials.value.name || !credentials.value.password) {
    error.value = 'Please enter both username and password.';
    return;
  }

  try {
    const response = await api.post('/login', {
      name: credentials.value.name,
      password: credentials.value.password,
    });

    const token = response.data.token;
    const auth = response.data.auth;

    localStorage.setItem('token', token);
    localStorage.setItem('authUser', JSON.stringify(auth));

    if (rememberMe.value) {
      localStorage.setItem('rememberedname', credentials.value.name);
    }

    router.push('/dashboard');
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed.';
  }
};
</script>

