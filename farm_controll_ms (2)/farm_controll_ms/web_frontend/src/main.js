import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import * as lucide from 'lucide-vue-next'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)
app.use(Toast)
// const app = createApp(App)

Object.entries(lucide).forEach(([name, component]) => {
  app.component(name, component)
})

app.use(createPinia())
app.use(router)

app.mount('#app')
