// src/stores/language.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLanguageStore = defineStore('language', () => {
    const currentLanguage = ref('en')

    function toggleLanguage() {
        currentLanguage.value = currentLanguage.value === 'en' ? 'kh' : 'en'
    }

    return { currentLanguage, toggleLanguage }
})
