import "@/assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import axios from "axios";

const pinia = createPinia();

// Axios token setup
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  console.log("🔐 Token applied to Axios headers");
} else {
  console.log("⚠️ No token found");
}

createApp(App)
  .use(router)
  .use(pinia)
  .mount("#app");