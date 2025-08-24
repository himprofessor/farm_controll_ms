<template>
  <button
    @click="toggleLanguage"
    class="flex items-center gap-2 px-2 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-auto ml-auto justify-center"
  >
    <img :src="flagSrc" :key="localeKey" alt="flag" class="w-5 h-4 object-cover rounded-sm" />
    <span class="text-sm">{{ languageText }}</span>
  </button>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import khFlag from '@/assets/flags/khFlag.png'
import usFlag from '@/assets/flags/usFlag.png'
import { computed } from 'vue'

const { locale } = useI18n()

const flagSrc = computed(() => locale.value === 'en' ? usFlag : khFlag)
const languageText = computed(() => locale.value === 'en' ? 'EN' : 'ខ្មែរ')
const localeKey = computed(() => locale.value)

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'kh' : 'en'
  localStorage.setItem('language', locale.value)
  console.log('Switched locale to:', locale.value)
  console.log('Current flag src:', flagSrc.value)
}
</script>