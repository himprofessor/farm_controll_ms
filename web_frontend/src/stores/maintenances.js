import { defineStore } from "pinia";
import API from "@/plugin/axios";

export const useMaintenanceStore = defineStore("maintenance", {
  state: () => ({
    maintenances: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchMaintenances() {
      this.loading = true;
      try {
        const res = await API.get("/equipment_maintenances");
        this.maintenances = res.data;
      } catch (err) {
        this.error = err.response?.data?.message || "Failed to fetch data";
        console.error(this.error);
      } finally {
        this.loading = false;
      }
    },

    async addMaintenance(data) {
      try {
        const res = await API.post("/equipment_maintenances", data);
        // Use backend response if available, else generate temporary ID
        const newRecord = res.data || { ...data, id: Date.now() };
        this.maintenances.unshift(newRecord);
      } catch (err) {
        console.error("Failed to add maintenance:", err);
        this.error = err.response?.data?.message || "Failed to add maintenance";
      }
    },

    async updateMaintenance(id, data) {
      try {
        const res = await API.put(`/equipment_maintenances/${id}`, data);
        const updated = res.data || { ...data, id }; // fallback if backend doesn't return full object
        const index = this.maintenances.findIndex((m) => m.id === id);
        if (index !== -1) this.maintenances[index] = updated;
      } catch (err) {
        console.error("Failed to update maintenance:", err);
        this.error = err.response?.data?.message || "Failed to update maintenance";
      }
    },

    async deleteMaintenance(id) {
      try {
        await API.delete(`/equipment_maintenances/${id}`);
        this.maintenances = this.maintenances.filter((m) => m.id !== id);
      } catch (err) {
        console.error("Failed to delete maintenance:", err);
        this.error = err.response?.data?.message || "Failed to delete maintenance";
      }
    },
  },
});
