// src/stores/auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  }),
  actions: {
    logout() {
      this.isAuthenticated = false;
      localStorage.clear();
    }
  }
});