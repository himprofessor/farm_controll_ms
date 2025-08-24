<template>
  <div class="w-64 h-screen bg-white shadow-lg flex flex-col fixed top-0 left-0 z-50">
    <!-- Logo -->
    <div class="bg-blue-500 text-white p-4 flex items-center space-x-3">
      <div
        class="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center"
      >
        <span class="text-lg font-bold">π</span>
      </div>
      <span class="text-lg font-semibold">Farm Control</span>
    </div>


    <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
      <SidebarItem v-for="item in navItems" :key="item.label" :item="item" />
    </nav>

    <button
      @click="handleLogout"
      class="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-500 transition-colors duration-200"
    >
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

@media (max-width: 1024px) {
  .sidebar {
    width: 12rem; 
  }

  .logo-text {
    font-size: 0.9rem;
  }
}

/* Mobile (≤768px) */
@media (max-width: 768px) {
  .sidebar {
    width: 4rem; 
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

/* Mobile (≤768px) */
@media (max-width: 768px) {
  .sidebar {
    width: 4rem; 
  }

  /* hide menu + logout + language labels, but NOT the logo */
  .logout-text,
  .sidebar__nav span,
  .sidebar__lang {
    display: none !important;
  }

  /* keep logo visible */
  .sidebar__logo {
    @apply flex items-center justify-center flex-col space-y-2;
  }

  .logo-text {
    display: block !important;
    font-size: 0.85rem; /* smaller text to fit */
    text-align: center;
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
@media (max-width: 768px) {
  .sidebar {
    width: 4rem; 
  }

  /* hide labels + Farm Control text */
  .logo-text,
  .logout-text,
  .sidebar__nav span,
  .sidebar__lang {
    display: none !important;
  }

  /* keep π visible */
  .logo-box {
    display: flex !important;
  }

  /* center logo + icons */
  .sidebar__logo,
  .sidebar__nav,
  .sidebar__logout {
    @apply flex justify-center;
  }
}
</style>
