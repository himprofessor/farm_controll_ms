<template>
  <div class="h-screen overflow-hidden flex md:flex-row bg-white">
    <!-- Mobile Sidebar Toggle -->
    <button
      @click="toggleSidebar"
      aria-label="Toggle sidebar"
      :aria-expanded="sidebarOpen"
      class="md:hidden p-3 m-4 z-50 bg-green-500 text-white rounded-full fixed top-4 left-4 shadow-md hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-400"
    >
      ☰
    </button>

    <!-- Sidebar -->
    <transition name="slide">
      <Sidebar
        v-if="auth.isAuthenticated && (sidebarOpen || isDesktop)"
        class="z-40 md:z-0 md:relative w-64 h-full bg-white shadow-md"
        role="navigation"
        aria-label="Sidebar navigation"
      />
    </transition>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto bg-blue-100">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const sidebarOpen = ref(false)
const isDesktop = ref(window.innerWidth >= 768)

const updateDeviceWidth = () => {
  isDesktop.value = window.innerWidth >= 768
  if (isDesktop.value) sidebarOpen.value = false
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

// Close sidebar on route change (for mobile)
const router = useRouter()
router.afterEach(() => {
  if (!isDesktop.value) {
    sidebarOpen.value = false
  }
})

onMounted(() => {
  window.addEventListener('resize', updateDeviceWidth)
  updateDeviceWidth()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateDeviceWidth)
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
