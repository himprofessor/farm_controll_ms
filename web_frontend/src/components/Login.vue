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
                <div class="mb-4 relative">
                    <label for="password" class="block text-gray-700 mb-2">Password</label>
                    <div class="relative">
                        <input 
                            v-model="credentials.password" 
                            :type="showPassword ? 'text' : 'password'" 
                            id="password" 
                            placeholder="Enter password"
                            class="w-full border p-2 rounded focus:outline-none focus:ring-2 pr-10"
                        />
                        <button
                            type="button"
                            @click="togglePasswordVisibility"
                            class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
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
                                    :d="showPassword ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'"
                                />
                            </svg>
                        </button>
                    </div>
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
const showPassword = ref(false);

// Toggle password visibility
const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

// Password validation function
const isPasswordStrong = (password) => {
    // At least 8 characters, one uppercase, one lowercase, one number, one special character
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
        password.length >= minLength &&
        hasUppercase &&
        hasLowercase &&
        hasNumber &&
        hasSpecialChar
    );
};

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

