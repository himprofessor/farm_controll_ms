// stores/sales.js
import { defineStore } from 'pinia'
import API from '@/plugin/axios'

export const useSalesStore = defineStore('sales', {
  state: () => ({
    salesData: [],
    activeIndex: null,

    // Modal for adding sale
    showModal: false,
    currentSale: {
      product: '',
      quantity: 1,
      unitPrice: 0,
      description: '',
      date: new Date().toISOString().split('T')[0]
    },

    // Modal for deleting sale
    showDeleteModal: false,
    deleteIndex: null,
  }),

  getters: {
    totalSales: (state) =>
      state.salesData.reduce((acc, sale) => acc + sale.quantity * sale.unitPrice, 0),

    totalQuantity: (state) =>
      state.salesData.reduce((acc, sale) => acc + sale.quantity, 0),

    averagePrice: (state) =>
      state.salesData.length === 0 ? 0 : state.totalSales / state.totalQuantity,
  },

  actions: {
    async fetchSales() {
      try {
        const res = await API.get('/sales')
        this.salesData = res.data.map(item => ({
          id: item.id,
          product: item.product_name,
          quantity: item.quantity,
          unitPrice: item.unit_price,
          description: item.description,
          date: item.sale_date,
        }))
      } catch (error) {
        console.error('Failed to fetch sales:', error)
      }
    },

    openAddModal() {
      this.currentSale = {
        product: '',
        quantity: 1,
        unitPrice: 0,
        description: '',
        date: new Date().toISOString().split('T')[0]
      }
      this.showModal = true
    },

    closeModal() {
      this.showModal = false
    },

    async addNewSale(sale) {
      try {
        const payload = {
          product_name: sale.product,
          quantity: sale.quantity,
          unit_price: sale.unitPrice,
          total_price: sale.totalPricePrice,
          description: sale.description,
          sale_date: sale.date,
        }
        const res = await API.post('/sales', payload)
        this.salesData.push({
          id: res.data.id,
          product: res.data.product_name,
          quantity: res.data.quantity,
          unitPrice: res.data.unit_price,
          totalPrice: res.data.total_price,
          description: res.data.description,
          date: res.data.sale_date,
        })
        this.closeModal()
      } catch (error) {
        console.error('Failed to add sale:', error)
      }
    },

    toggleActions(index) {
      this.activeIndex = this.activeIndex === index ? null : index
    },

    confirmDelete(index) {
      this.deleteIndex = index
      this.showDeleteModal = true
      this.activeIndex = null
    },

    cancelDelete() {
      this.showDeleteModal = false
      this.deleteIndex = null
    },

    async deleteSale() {
      if (this.deleteIndex === null) return
      try {
        const id = this.salesData[this.deleteIndex].id
        await API.delete(`/sales/${id}`)
        this.salesData.splice(this.deleteIndex, 1)
        this.cancelDelete()
      } catch (error) {
        console.error('Failed to delete sale:', error)
      }
    },
  }
})
