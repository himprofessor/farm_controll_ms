<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-6 rounded-lg shadow">
    <div class="max-w-7xl mx-auto">
      <InventoryHeader />
      <InventoryCard
        :totalItems="inventoryItems.length"
        :lowStockCount="lowStockCount"
        :totalValue="totalValue"
        :uniqueCategoriesCount="uniqueCategories.length"
      />
      <InventorySearchFilter
        v-model:searchQuery="searchQuery"
        v-model:selectedCategory="selectedCategory"
        :categories="uniqueCategories"
        ref="searchFilter"
      />
      <InventoryTable
        :items="filteredItems"
        @delete-item="deleteItem"
        @edit-item="editItem"
        @item-added="fetchInventory"
      />
      <div v-if="successMessage" class="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center transition-opacity duration-300" :class="{ 'opacity-0' : !successMessage }" @animationend="successMessage = ''">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="mt-4 p-4 bg-red-100 text-red-800 rounded-lg text-center transition-opacity duration-300" :class="{ 'opacity-0' : !errorMessage }" @animationend="errorMessage = ''">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import InventoryHeader from '@/components/inventory/InventoryHeader.vue';
import InventoryCard from '@/components/inventory/InventoryCard.vue';
import InventoryTable from '@/components/inventory/InventoryTable.vue';
import InventorySearchFilter from '@/components/inventory/InventorySearchFilter.vue';
import API from '@/plugin/axios';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const inventoryItems = ref([]);
const searchQuery = ref('');
const selectedCategory = ref('');
const successMessage = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const fetchInventory = async () => {
  isLoading.value = true;
  try {
    const res = await API.get('/materials');
    if (res.data && Array.isArray(res.data)) {
      inventoryItems.value = res.data;
    } else {
      inventoryItems.value = [];
    }
    errorMessage.value = '';
  } catch (error) {
    console.error(t('inventory.errorFetchInventory'), error);
    errorMessage.value = t('inventory.errorFetchInventory');
  } finally {
    isLoading.value = false;
  }
};

watch([searchQuery, selectedCategory], () => {
  // Trigger filter logic
}, { immediate: true });

onMounted(() => {
  fetchInventory();
});

const lowStockCount = computed(() =>
  inventoryItems.value.filter(item => ['low', 'critical'].includes(item.status)).length
);

const totalValue = computed(() =>
  inventoryItems.value.reduce((sum, item) => sum + (Number(item.value) || 0), 0)
);

const uniqueCategories = computed(() => {
  const categories = new Set(inventoryItems.value.map(i => i.category));
  return Array.from(categories).sort();
});

const filteredItems = computed(() => {
  let items = [...inventoryItems.value];
  if (selectedCategory.value) {
    items = items.filter(i => i.category === selectedCategory.value);
  }
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    items = items.filter(i =>
      i.name?.toLowerCase().includes(query) ||
      i.category?.toLowerCase().includes(query) ||
      i.status?.toLowerCase().includes(query) ||
      i.currentStock?.toString().includes(query) ||
      i.supplier?.toLowerCase().includes(query)
    );
  }
  return items;
});

const deleteItem = async (id) => {
  isLoading.value = true;
  try {
    await API.delete(`/materials/${id}`);
    inventoryItems.value = inventoryItems.value.filter(item => item.id !== id);
    successMessage.value = t('inventory.successMaterialDeleted');
    setTimeout(() => { successMessage.value = '' }, 3000);
  } catch (error) {
    console.error(t('inventory.errorDeleteItem'), error);
    errorMessage.value = t('inventory.errorDeleteItem');
  } finally {
    isLoading.value = false;
  }
};

const editItem = (item) => {
  const index = inventoryItems.value.findIndex(i => i.id === item.id);
  if (index !== -1) {
    inventoryItems.value = [
      ...inventoryItems.value.slice(0, index),
      { ...item },
      ...inventoryItems.value.slice(index + 1),
    ];
    successMessage.value = t('inventory.successMaterialUpdated');
    setTimeout(() => { successMessage.value = '' }, 3000);
  } else {
    errorMessage.value = t('inventory.errorEditItem');
  }
};
</script>