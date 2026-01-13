import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import * as lucide from 'lucide-vue-next'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import i18n from './i18n' // Import i18n configuration
import Sidebar from './components/Sidebar.vue' // Import Sidebar

const app = createApp(App)
app.use(Toast)
Object.entries(lucide).forEach(([name, component]) => {
  app.component(name, component)
})
app.use(createPinia())
app.use(router)
app.use(i18n) // Install i18n - CRITICAL for translations
app.component('Sidebar', Sidebar) // Register Sidebar globally
app.mount('#app')