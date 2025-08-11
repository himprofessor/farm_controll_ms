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
import Sidebar from '@/components/Sidebar.vue';
</script>


<style>
/* build style responsive sidebar it work all devices */

</style>