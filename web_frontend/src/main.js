import "@/assets/main.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import en from './locales/en.json'
import kh from './locales/kh.json'

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token} `
  console.log('🔐 Token applied to Axios headers')
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    kh,
  },
})

const app = createApp(App)
app.use(createPinia())
app.use(i18n)
app.use(router)
app.mount('#app')
