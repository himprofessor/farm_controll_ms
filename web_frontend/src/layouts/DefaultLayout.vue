<!-- layouts/DefaultLayout.vue -->
<template>
  <div class="flex">
    <Sidebar />
    <main class="flex-1 ml-64 p-6 bg-white min-h-screen">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Sidebar from "@/components/Sidebar.vue";
</script>

<style>

.flex {
  display: flex;
}


.w-64.h-screen.bg-white.shadow-lg.flex.flex-col.fixed.top-0.left-0.z-50 {
  transition: width 0.3s ease;
}

main.flex-1 {
  transition: margin-left 0.3s ease;
}


@media (min-width: 1025px) {
  main.flex-1 {
    margin-left: 16rem !important;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .w-64.h-screen.bg-white.shadow-lg.flex.flex-col.fixed.top-0.left-0.z-50 {
    width: 12rem !important;
  }

  main.flex-1 {
    margin-left: 12rem !important;
  }
}
@media (max-width: 768px) {
  .w-64.h-screen.bg-white.shadow-lg.flex.flex-col.fixed.top-0.left-0.z-50 {
    width: 4rem !important;
  }

  main.flex-1 {
    margin-left: 4rem !important;
  }

  .w-64.h-screen.bg-white.shadow-lg.flex.flex-col.fixed.top-0.left-0.z-50
    span:last-child {
    display: none !important;
  }

  .w-64.h-screen.bg-white.shadow-lg.flex.flex-col.fixed.top-0.left-0.z-50 nav,
  .w-64.h-screen.bg-white.shadow-lg.flex.flex-col.fixed.top-0.left-0.z-50 button,
  .w-64.h-screen.bg-white.shadow-lg.flex.flex-col.fixed.top-0.left-0.z-50 .p-4 {
    justify-content: center !important;
  }
}
</style>
