<template>
  <div class="p-2 min-h-screen text-left">
    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 text-left">
        <h3 class="text-md font-medium text-gray-500">Total Sales</h3>
        <p class="text-3xl font-bold mt-2 text-gray-800">${{ totalSales.toLocaleString() }}</p>
        <p class="text-sm text-green-600 mt-1">+12% from last month</p>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 text-left">
        <h3 class="text-md font-medium text-gray-500">Total Quantity Sold</h3>
        <p class="text-3xl font-bold mt-2 text-gray-800">{{ totalQuantity.toLocaleString() }}</p>
        <p class="text-sm text-green-600 mt-1">+8% from last month</p>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 text-left">
        <h3 class="text-md font-medium text-gray-500">Average Price</h3>
        <p class="text-3xl font-bold mt-2 text-gray-800">${{ averagePrice.toFixed(2) }}</p>
        <p class="text-sm text-red-600 mt-1">-2% from last month</p>
      </div>
    </div>

    <!-- Header and Add Button -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Sales Records</h1>
      <button 
        @click="openAddModal"
        class="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg flex items-center gap-2 shadow-md transition-all duration-200">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        Add Sale
      </button>
    </div>

    <!-- Individual Sales Table -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="p-5 border-b border-gray-200 text-left">
        <h2 class="text-xl font-semibold text-gray-800">Individual Sales</h2>
        <span class="text-sm text-gray-500 block mt-1">
          Showing {{ salesData.length }} {{ salesData.length === 1 ? 'record' : 'records' }}
        </span>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 text-left">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th class="px-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th class="px-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
              <th class="px-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th class="px-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th class="px-6 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(sale, index) in salesData" :key="index" class="hover:bg-gray-50 transition-colors duration-200">
              <td class="px-6 py-2 whitespace-nowrap text-xs font-medium text-gray-900">{{ sale.product }}</td>
              <td class="px-6 py-2 whitespace-nowrap text-xs text-gray-500">{{ sale.quantity }}</td>
              <td class="px-6 py-2 whitespace-nowrap text-xs text-gray-500">${{ sale.unitPrice.toFixed(2) }}</td>
              <td class="px-6 py-2 whitespace-nowrap text-xs text-gray-500">${{ (sale.quantity * sale.unitPrice).toFixed(2) }}</td>
              <td class="px-6 py-2 whitespace-nowrap text-xs text-gray-500">{{ sale.description || '-' }}</td>
              <td class="px-6 py-2 whitespace-nowrap text-xs font-medium text-right">
                <div class="relative">
                  <button 
                    @click="toggleActions(index)"
                    class="text-gray-600 hover:text-gray-800 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                    title="Show Actions"
                  >
                    <svg class="w-5 h-5" fill="#4B5563" viewBox="0 0 24 24">
                      <circle cx="12" cy="5" r="2"/>
                      <circle cx="12" cy="12" r="2"/>
                      <circle cx="12" cy="19" r="2"/>
                    </svg>
                  </button>
                  <div v-if="activeIndex === index" class="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <button 
                      @click="editSale(index)"
                      class="w-full text-left px-4 py-1 text-blue-600 hover:bg-blue-50 flex items-center gap-2 rounded-t-md transition-colors duration-200"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                      Edit
                    </button>
                    <button 
                      @click="confirmDelete(index)"
                      class="w-full text-left px-4 py-1 text-red-600 hover:bg-red-50 flex items-center gap-2 rounded-b-md transition-colors duration-200"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Sale Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 ease-in-out">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800">{{ isEditing ? 'Edit Sale' : 'Add New Sale' }}</h2>

        <form @submit.prevent="isEditing ? updateSale() : addNewSale()" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Product</label>
            <input 
              v-model="currentSale.product"
              type="text" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
              required>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <input 
                v-model.number="currentSale.quantity"
                type="number" 
                min="1"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Unit Price ($)</label>
              <input 
                v-model.number="currentSale.unitPrice"
                type="number" 
                min="0.01"
                step="0.01"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                required>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              v-model="currentSale.description"
              rows="3"
              placeholder="Enter description or notes about the sale"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 resize-none"
            ></textarea>
          </div>

          <div class="flex justify-start space-x-4">
            <button 
              type="button"
              @click="closeModal"
              class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700 transition duration-200">
              Cancel
            </button>
            <button 
              type="submit"
              class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200">
              {{ isEditing ? 'Update' : 'Save' }} Sale
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 ease-in-out">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800">Confirm Deletion</h2>
        <p class="mb-6 text-gray-600">Are you sure you want to delete this sale record? This action cannot be undone.</p>
        <div class="flex justify-end space-x-4">
          <button 
            @click="cancelDelete"
            class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700 transition duration-200">
            Cancel
          </button>
          <button 
            @click="deleteSale"
            class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

// State
const salesData = ref([
  { product: 'Laptop', quantity: 3, unitPrice: 1200, description: 'Client order' },
  { product: 'Smartphone', quantity: 5, unitPrice: 600, description: '' },
  { product: 'Tablet', quantity: 2, unitPrice: 400, description: 'Discounted' },
]);

const showModal = ref(false);
const isEditing = ref(false);
const currentSaleIndex = ref(null);
const currentSale = reactive({ product: '', quantity: 1, unitPrice: 0, description: '' });
const activeIndex = ref(null);
const showDeleteModal = ref(false);
const deleteIndex = ref(null);

// Computed properties
const totalSales = computed(() => {
  return salesData.value.reduce((acc, sale) => acc + sale.quantity * sale.unitPrice, 0);
});

const totalQuantity = computed(() => {
  return salesData.value.reduce((acc, sale) => acc + sale.quantity, 0);
});

const averagePrice = computed(() => {
  if (totalQuantity.value === 0) return 0;
  return totalSales.value / totalQuantity.value;
});

// Methods
function openAddModal() {
  isEditing.value = false;
  currentSale.product = '';
  currentSale.quantity = 1;
  currentSale.unitPrice = 0;
  currentSale.description = '';
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function addNewSale() {
  salesData.value.push({ 
    product: currentSale.product, 
    quantity: currentSale.quantity, 
    unitPrice: currentSale.unitPrice,
    description: currentSale.description || ''
  });
  closeModal();
}

function editSale(index) {
  const sale = salesData.value[index];
  currentSale.product = sale.product;
  currentSale.quantity = sale.quantity;
  currentSale.unitPrice = sale.unitPrice;
  currentSale.description = sale.description;
  currentSaleIndex.value = index;
  isEditing.value = true;
  showModal.value = true;
  activeIndex.value = null;
}

function updateSale() {
  if (currentSaleIndex.value !== null) {
    salesData.value[currentSaleIndex.value] = { 
      product: currentSale.product, 
      quantity: currentSale.quantity, 
      unitPrice: currentSale.unitPrice,
      description: currentSale.description || ''
    };
    closeModal();
  }
}

function toggleActions(index) {
  activeIndex.value = activeIndex.value === index ? null : index;
}

function confirmDelete(index) {
  deleteIndex.value = index;
  showDeleteModal.value = true;
  activeIndex.value = null;
}

function cancelDelete() {
  showDeleteModal.value = false;
  deleteIndex.value = null;
}

function deleteSale() {
  if (deleteIndex.value !== null) {
    salesData.value.splice(deleteIndex.value, 1);
    cancelDelete();
  }
}
</script>

<style scoped>
/* Optional custom styles can be added here */
</style>