<template>
  <router-link
    :to="item.path"
    class="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200"
    :class="isActive
      ? 'bg-gray-300 text-white font-semibold'
      : 'text-gray-800 hover:bg-gray-100'"
  >
    <span
      class="material-symbols-outlined text-xl"
      :class="[item.iconColor, isActive ? 'text-white' : '']"
    >
      {{ item.icon }}
    </span>
    <span>{{ item.label }}</span>
  </router-link>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const props = defineProps({
  item: { type: Object, required: true }
});

const route = useRoute();
const isActive = computed(() => route.path === props.item.path);
</script>
