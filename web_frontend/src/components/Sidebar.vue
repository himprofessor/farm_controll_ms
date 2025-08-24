<template>
  <div class="w-64 h-screen bg-white shadow-lg flex flex-col fixed top-0 left-0 z-50">
    <!-- Logo -->
    <div class="bg-blue-500 text-white p-4 flex items-center space-x-3">
     
        <span class="text-lg font-bold">π</span>
      
      <span class="text-lg font-semibold">{{ $t('sidebar.logo') }}</span>
    </div>


    <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
      <SidebarItem v-for="item in navItems" :key="item.path" :item="item" />
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

/* Base styles */
.sidebar {
  width: 16rem; /* w-64 = 16rem */
}

.bg-white {
  background-color: #ffffff;
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.bg-blue-500 {
  background-color: #3b82f6;
}

.text-white {
  color: #ffffff;
}

.p-4 {
  padding: 1rem;
}

.space-x-3 > * + * {
  margin-left: 0.75rem;
}

.w-8 {
  width: 2rem;
  height: 2rem;
}

.bg-opacity-20 {
  background-opacity: 0.2;
}

.rounded {
  border-radius: 0.25rem;
}

.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.font-bold {
  font-weight: 700;
}

.font-semibold {
  font-weight: 600;
}

.text-gray-900 {
  color: #111827;
}

.flex-1 {
  flex: 1 1 0%;
}

.space-y-2 > * + * {
  margin-top: 0.5rem;
}

.overflow-y-auto {
  overflow-y: auto;
}

.gap-2 {
  gap: 0.5rem;
}

.text-gray-600 {
  color: #4b5563;
}

.hover\:text-red-500:hover {
  color: #ef4444;
}

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
}

.duration-200 {
  transition-duration: 200ms;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.font-medium {
  font-weight: 500;
}

.border-t {
  border-top: 1px solid #e5e7eb;
}

/* Tablet (≤1024px) */
@media (max-width: 1024px) {
  .sidebar {
    width: 12rem;
  }

  .logo-text {
    font-size: 0.9rem;
  }

  .p-4 {
    padding: 0.75rem;
  }
}

/* Mobile (≤768px) */
@media (max-width: 768px) {
  .sidebar {
    width: 4rem;
  }

  .logo-text,
  .logout-text,
  .sidebar__nav span,
  .sidebar__lang span {
    display: none !important;
  }

  .sidebar__logo {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    space-y: 0.5rem;
  }

  .logo-box {
    display: flex !important;
  }

  .sidebar__nav,
  .sidebar__logout {
    justify-content: center;
  }

  .p-4 {
    padding: 0.5rem;
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

  .w-8 {
    width: 1.5rem;
    height: 1.5rem;
  }

  .text-lg {
    font-size: 0.875rem;
  }
}
</style>
