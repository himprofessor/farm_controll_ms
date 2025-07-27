<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <CardInventory title="Total Items" :value="items.length.toString()" :icon="CubeIcon" />
      <CardInventory title="Low Stock Alerts" :value="lowStockCount.toString()" :icon="ExclamationTriangleIcon" :alert="true" />
      <CardInventory title="Total Value" :value="'$' + totalValue.toLocaleString()" :icon="ChartBarIcon" />
      <CardInventory title="Categories" :value="uniqueCategories.length.toString()" :icon="TagIcon" />
    </div>

    <div class="flex flex-wrap justify-between items-center mb-4 gap-2">
      <input
        v-model="search"
        type="text"
        placeholder="Search items by name or supplier..."
        class="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded"
      />
      <div class="flex gap-2">
        <select v-model="selectedCategory" class="px-4 py-2 border rounded">
          <option value="">All Categories</option>
          <option v-for="cat in uniqueCategories" :key="cat">{{ cat }}</option>
        </select>
        <button class="bg-green-600 text-white px-4 py-2 rounded">+ Add Item</button>
      </div>
    </div>

    <InventoryTable :items="filteredItems" />
  </div>
</template>

<script>
import CardInventory from '../components/dashboard/CardInventory.vue';
import InventoryTable from '../components/inventory/InventoryTable.vue';
import { CubeIcon, ExclamationTriangleIcon, ChartBarIcon, TagIcon } from '@heroicons/vue/24/outline';

export default {
  name: 'InventoryManagement',
  components: {
    CardInventory,
    InventoryTable,
    CubeIcon,
    ExclamationTriangleIcon,
    ChartBarIcon,
    TagIcon
  },
  data() {
    return {
      search: '',
      selectedCategory: '',
      items: [
        {
          id: 1,
          name: 'Pig Feed - Starter',
          category: 'Feed',
          stock: '45 kg',
          min: '100 kg',
          status: 'critical',
          value: 112.5,
          unitPrice: '2.50/kg',
          supplier: 'Farm Supply Co.',
          last: '1/10/2024',
          expires: '6/10/2024'
        },
        {
          id: 2,
          name: 'Antibiotics - Penicillin',
          category: 'Medication',
          stock: '8 bottles',
          min: '15 bottles',
          status: 'low',
          value: 360,
          unitPrice: '45.00/bottles',
          supplier: 'Vet Supplies Ltd.',
          last: '1/5/2024',
          expires: '1/5/2025'
        },
        {
          id: 3,
          name: 'Vitamins Mix',
          category: 'Medication',
          stock: '12 bottles',
          min: '20 bottles',
          status: 'low',
          value: 300,
          unitPrice: '25.00/bottles',
          supplier: 'Health Plus',
          last: '1/8/2024',
          expires: '12/8/2024'
        },
        {
          id: 4,
          name: 'Water Tanks',
          category: 'Equipment',
          stock: '5 units',
          min: '2 units',
          status: 'good',
          value: 750,
          unitPrice: '150.00/units',
          supplier: 'Equipment Pro',
          last: '12/15/2023',
          expires: ''
        },
        {
          id: 5,
          name: 'Cleaning Supplies',
          category: 'Supplies',
          stock: '25 bottles',
          min: '10 bottles',
          status: 'good',
          value: 212.5,
          unitPrice: '8.50/bottles',
          supplier: 'Clean Co.',
          last: '12/20/2023',
          expires: ''
        }
      ]
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(this.search.toLowerCase()) ||
          item.supplier.toLowerCase().includes(this.search.toLowerCase());
        const matchesCategory = this.selectedCategory === '' || item.category === this.selectedCategory;
        return matchesSearch && matchesCategory;
      });
    },
    lowStockCount() {
      return this.items.filter(i => i.status !== 'good').length;
    },
    totalValue() {
      return this.items.reduce((sum, item) => sum + item.value, 0);
    },
    uniqueCategories() {
      return [...new Set(this.items.map(i => i.category))];
    }
  }
};
</script>

<style scoped>
</style>
