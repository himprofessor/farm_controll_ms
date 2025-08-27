import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import * as lucide from 'lucide-vue-next'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import i18n from './i18n'
import Sidebar from './components/Sidebar.vue' // Sidebar component

const app = createApp(App)

app.use(Toast)
app.use(createPinia())
app.use(router)
app.use(i18n)

// Register all lucide icons globally
Object.entries(lucide).forEach(([name, component]) => {
  app.component(name, component)
})

// Register Sidebar globally
app.component('Sidebar', Sidebar)

app.mount('#app')
