import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import kh from './locales/kh.json'

// Define translations
const messages = { en, kh }

// Create i18n instance
const i18n = createI18n({
  legacy: false, // Vue 3 setup
  globalInjection: true, // Allow $t globally
  locale: localStorage.getItem('language') || 'en', // Default to 'en' or stored locale
  fallbackLocale: 'en', // Fallback to 'en'
  messages // Use the provided messages
})

export default i18n