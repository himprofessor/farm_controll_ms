// src/stores/language.js
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export const useLanguageStore = defineStore('language', () => {
    const { locale } = useI18n()
    const supportedLocales = ['en', 'kh']
    const currentLanguage = ref('en')

    // Initialize locale
    locale.value = supportedLocales.includes(currentLanguage.value) ? currentLanguage.value : 'en'

    // Watch for changes with immediate: false to avoid initial trigger
    watch(currentLanguage, (newLang) => {
        if (supportedLocales.includes(newLang)) {
            locale.value = newLang
        } else {
            console.warn(`Unsupported locale: ${newLang}. Falling back to 'en'`)
            locale.value = 'en'
            currentLanguage.value = 'en'
        }
    }, { immediate: false })

    const toggleLanguage = () => {
        currentLanguage.value = currentLanguage.value === 'en' ? 'kh' : 'en'
    }

    return { currentLanguage, toggleLanguage }
})