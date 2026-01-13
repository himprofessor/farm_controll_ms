import { defineStore } from "pinia";
import API from "@/plugin/axios";

export const useBorrowStore = defineStore("borrow", {
  state: () => ({
    borrowReports: [],
  }),
  getters: {
    activeBorrows(state) {
      if (!Array.isArray(state.borrowReports)) return 0;
      return state.borrowReports
        .filter((report) => !report.retunred_date)
        .reduce((sum, report) => sum + Number(report.quantity || 0), 0);
    },
  },
  actions: {
    async fetchBorrowReports() {
      try {
        const response = await API.get("/borrowings");
        this.borrowReports = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
      } catch (error) {
        console.error("Failed to fetch borrow reports:", error);
        this.borrowReports = [];
      }
    },
  },
});
