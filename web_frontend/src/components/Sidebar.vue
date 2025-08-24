<template>
  <div class="w-64 h-screen bg-white shadow-lg flex flex-col fixed top-0 left-0 z-50">
    <!-- Logo -->
    <div class="bg-green-500 text-white p-4 flex items-center space-x-3">
      <div
        class="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center"
      >
        <span class="text-lg font-bold">π</span>
      </div>
      <span class="text-lg font-semibold">{{ $t('sidebar.logo') }}</span>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
      <SidebarItem v-for="item in navItems" :key="item.path" :item="item" />
    </nav>

    <button
      @click="handleLogout"
      class="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-500 transition-colors duration-200"
    >
      <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg> -->
      <span class="text-sm font-medium">Logout</span>
    </button>

    <!-- Language Toggle -->
    <div class="p-4 border-t">
      <LanguageToggle />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

import SidebarItem from "./SidebarItem.vue";
import LanguageToggle from "@/components/language/LanguageToggle.vue";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push("/"); // redirects to HomeScreen
};

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "dashboard",
    iconColor: "text-sky-500",
  },
  {
    label: "Staff Management",
    path: "/staff",
    icon: "group",
    iconColor: "text-blue-500",
  },
  {
    label: "Salary Management",
    path: "/salary",
    icon: "monetization_on",
    iconColor: "text-yellow-500",
  },
  {
    label: "Inventory",
    path: "/inventory",
    icon: "inventory_2",
    iconColor: "text-purple-500",
  },
  {
    label: "Financial",
    path: "/financial",
    icon: "account_balance_wallet",
    iconColor: "text-red-500",
  },
];
</script>

<style scoped>
/* ============ Base Sidebar ============ */
.sidebar {
  @apply h-screen bg-white shadow-lg flex flex-col fixed top-0 left-0 z-50 transition-all duration-300;
  width: 16rem; /* default desktop size */
}

.sidebar__logo {
  @apply bg-green-500 text-white p-4 flex items-center space-x-3;
}

.logo-box {
  @apply w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center text-lg font-bold;
}

.logo-text {
  @apply text-lg font-semibold;
}

.sidebar__nav {
  @apply flex-1 p-4 space-y-2 overflow-y-auto;
}

.sidebar__logout {
  @apply flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-500 transition-colors duration-200;
}

.logout-text {
  @apply text-sm font-medium;
}

.sidebar__lang {
  @apply p-4 border-t;
}

/* ============ Responsive ============ */

/* Tablet (769px–1024px) */
@media (max-width: 1024px) {
  .sidebar {
    width: 12rem; /* reduced width */
  }

  .logo-text {
    font-size: 0.9rem;
  }
}

/* Mobile (≤768px) */
@media (max-width: 768px) {
  .sidebar {
    width: 4rem; /* icon-only */
  }

  /* hide all labels */
  .logo-text,
  .logout-text,
  .sidebar__nav span,
  .sidebar__lang {
    display: none !important;
  }

  /* center icons */
  .sidebar__nav,
  .sidebar__logout {
    @apply flex justify-center;
  }
}

/* Extra Small Phones (≤480px) */
@media (max-width: 480px) {
  .sidebar {
    width: 3.5rem; 
  }

  .material-icons {
    font-size: 1.25rem;
  }
}
</style>
