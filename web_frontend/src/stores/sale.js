// stores/sales.js
import { defineStore } from "pinia";
import API from "@/plugin/axios";

export const useSalesStore = defineStore("sales", {
  state: () => ({
    salesData: [],         // unified sales array
    loading: false,        // from oversale.js
    activeIndex: null,

    // Modal for adding sale
    showModal: false,
    currentSale: {
      product: "",
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
      description: "",
      date: new Date().toISOString().split("T")[0],
    },

    // Modal for deleting sale
    showDeleteModal: false,
    deleteIndex: null,
  }),

  getters: {
    // 🔹 Combined total sales value
    totalSales: (state) =>
      state.salesData.reduce((acc, sale) => acc + sale.totalPrice, 0),

    // 🔹 Total quantity of items sold
    totalQuantity: (state) =>
      state.salesData.reduce((acc, sale) => acc + sale.quantity, 0),

    // 🔹 Average price per unit
    averagePrice() {
      return this.totalQuantity === 0
        ? 0
        : this.totalSales / this.totalQuantity;
    },

    // 🔹 Grouped product name + total
    productName: (state) => {
      const productTotal = {};
      state.salesData.forEach((sale) => {
        const product_name = sale.product || "Unknown";
        const value = parseFloat(sale.totalPrice) || 0;
        if (!productTotal[product_name]) productTotal[product_name] = 0;
        productTotal[product_name] += value;
      });
      return Object.entries(productTotal).map(([product, total]) => ({
        label: product,
        value: `$${total}`,
      }));
    },

    // 🔹 Total income from sales
    totalIncome: (state) => {
      return state.salesData.reduce(
        (sum, sale) => sum + (parseFloat(sale.totalPrice) || 0),
        0
      );
    },
  },

  actions: {
    async fetchSales() {
      this.loading = true;
      try {
        const res = await API.get("/sales");
        this.salesData = res.data.map((item) => ({
          id: item.id,
          product: item.product_name,
          quantity: Number(item.quantity),
          unitPrice: Number(item.unit_price),
          totalPrice: Number(item.total_price),
          description: item.description,
          date: item.sale_date,
        }));
      } catch (error) {
        console.error("Failed to fetch sales:", error);
      } finally {
        this.loading = false;
      }
    },

    openAddModal() {
      this.currentSale = {
        product: "",
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0,
        description: "",
        date: new Date().toISOString().split("T")[0],
      };
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    async addNewSale() {
      try {
        this.currentSale.totalPrice =
          Number(this.currentSale.quantity) * Number(this.currentSale.unitPrice);

        const payload = {
          product_name: this.currentSale.product,
          quantity: this.currentSale.quantity,
          unit_price: this.currentSale.unitPrice,
          total_price: this.currentSale.totalPrice,
          description: this.currentSale.description,
          sale_date: this.currentSale.date,
        };

        const res = await API.post("/sales", payload);

        // Add new sale to local state
        this.salesData.push({
          id: res.data.id,
          product: res.data.product_name,
          quantity: res.data.quantity,
          unitPrice: res.data.unit_price,
          totalPrice: res.data.total_price,
          description: res.data.description,
          date: res.data.sale_date,
        });

        this.closeModal();
      } catch (error) {
        console.error("Failed to add sale:", error);
      }
    },

    toggleActions(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },

    confirmDelete(index) {
      this.deleteIndex = index;
      this.showDeleteModal = true;
      this.activeIndex = null;
    },

    cancelDelete() {
      this.showDeleteModal = false;
      this.deleteIndex = null;
    },

    async deleteSale() {
      if (this.deleteIndex === null) return;
      try {
        const id = this.salesData[this.deleteIndex].id;
        await API.delete(`/sales/${id}`);
        this.salesData.splice(this.deleteIndex, 1);
        this.cancelDelete();
      } catch (error) {
        console.error("Failed to delete sale:", error);
      }
    },
  },
});
