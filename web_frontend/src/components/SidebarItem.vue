<template>
  <router-link
    :to="item.path"
    class="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200"
    :class="
      isActive
        ? 'bg-gray-300 text-white font-semibold'
        : 'text-gray-800 hover:bg-gray-100'
    "
  >
    <span
      class="material-symbols-outlined text-xl"
      :class="[item.iconColor, isActive ? 'text-white' : '']"
    >
      {{ item.icon }}
    </span>
    <span>{{ $t(item.label) }}</span>
  </router-link>
</template>

<script setup>
<<<<<<< HEAD
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
=======
import { useRoute } from "vue-router";
import { computed } from "vue";
>>>>>>> 7d26ee0786fe1222283192a2cf6ccfd0e659a530

const { t } = useI18n()
const props = defineProps({
<<<<<<< HEAD
  item: { type: Object, required: true }
})

const route = useRoute()
const isActive = computed(() => route.path === props.item.path)
</script>
=======
  item: { type: Object, required: true },
});

const route = useRoute();
const isActive = computed(() => route.path === props.item.path);
</script>

<style scoped>

@media (max-width: 768px) {
  .flex.items-center.gap-3.px-3.py-2.rounded-lg.transition-all.duration-200
    span:last-child {
    display: none !important; 
  }

  .flex.items-center.gap-3.px-3.py-2.rounded-lg.transition-all.duration-200 {
    justify-content: center; 
  }
}

@media (min-width: 769px) {
  .flex.items-center.gap-3.px-3.py-2.rounded-lg.transition-all.duration-200
    span:last-child {
    display: inline !important; 
  }
}
</style>
>>>>>>> 7d26ee0786fe1222283192a2cf6ccfd0e659a530
