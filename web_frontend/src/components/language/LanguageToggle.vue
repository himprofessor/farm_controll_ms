<template>
  <button
    @click="toggleLanguage"
    class="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full justify-center"
  >
    <img
      :src="currentLanguage === 'en' ? khFlag : usFlag"
      alt="flag"
      class="w-7 h-5 object-cover rounded-sm"
    />
    <span class="truncate">
      {{ currentLanguage === 'en' ? 'ខ្មែរ' : 'English' }}
    </span>
  </button>
</template>

<script setup>
import { useLanguageStore } from '@/stores/language'
import khFlag from '@/assets/flags/khFlag.png'
import usFlag from '@/assets/flags/usFlag.png'

const { currentLanguage, toggleLanguage } = useLanguageStore()
</script>