<template>
  <div class="">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-gray-800">{{ $t('inventory.materialsInventory') }}</h2>
      <button @click="openAdd"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow flex items-center space-x-1 transition-colors">
        <Plus class="w-4 h-4" /><span>{{ $t('inventory.addMaterial') }}</span>
      </button>
    </div>

    <AddItemView v-if="showModal" :item="selectedMaterial" :categories="categories" :show="showModal" @close="closeModal"
      @material-added="handleMaterialAdded" @material-updated="handleMaterialUpdated" />

    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300" :class="{ 'opacity-0 pointer-events-none' : !showDeleteConfirm, 'opacity-100' : showDeleteConfirm }">
      <div class="bg-white rounded-lg shadow-lg p-4 w-80 transform transition-all duration-300" :class="{ 'scale-95 opacity-0' : !showDeleteConfirm, 'scale-100 opacity-100' : showDeleteConfirm }">
        <h3 class="text-lg font-bold text-gray-800 mb-2">{{ $t('staff.confirmAction') }}</h3>
        <p class="text-gray-600 mb-2">
          {{ $t('staff.areYouSureDelete') }} {{ selectedToDelete?.item.name || selectedToDelete?.item.purpose }}?
        </p>
        <div class="flex justify-end space-x-2">
          <button @click="cancelDelete" class="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-800 transition-colors">
            {{ $t('staff.cancel') }}
          </button>
          <button @click="confirmDelete" class="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors" :disabled="isDeleting">
            {{ $t('staff.confirm') }}
          </button>
        </div>
      </div>
    </div>

    <div class="overflow-x-auto rounded-lg border border-gray-200">
      <table class="min-w-full text-sm">
        <thead class="bg-green-600">
          <tr>
            <th class="px-6 py-3 text-left font-semibold text-white uppercase tracking-wider">{{ $t('inventory.itemName') }}</th>
            <th class="px-6 py-3 text-left font-semibold text-white uppercase tracking-wider">{{ $t('inventory.category') }}</th>
            <th class="px-6 py-3 text-left font-semibold text-white uppercase tracking-wider">{{ $t('inventory.currentStock') }}</th>
            <th class="px-6 py-3 text-left font-semibold text-white uppercase tracking-wider">{{ $t('inventory.status') }}</th>
            <th class="px-6 py-3 text-left font-semibold text-white uppercase tracking-wider">{{ $t('inventory.value') }}</th>
            <th class="px-6 py-3 text-left font-semibold text-white uppercase tracking-wider">{{ $t('inventory.supplier') }}</th>
            <th class="px-6 py-3 text-center font-semibold text-white uppercase tracking-wider">{{ $t('inventory.actions') }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 bg-white">
          <tr v-for="material in items" :key="material.id" class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-6 py-4">
              <div class="font-medium text-gray-900">{{ material.name }}</div>
              <div class="text-xs text-gray-500">{{ $t('inventory.expires') }}: {{ material.expires || $t('staff.na') }}</div>
            </td>
            <td class="px-6 py-4">
              <span class="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                {{ material.category }}
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="text-gray-900">{{ material.currentStock }} {{ material.unit }}</div>
              <div class="text-xs text-gray-500">{{ $t('inventory.minStock') }}: {{ material.minStock }} {{ material.unit }}</div>
            </td>
            <td class="px-6 py-4">
              <span :class="getStatusClass(material.status)">{{ $t(`inventory.status${material.status.charAt(0).toUpperCase() + material.status.slice(1)}`) }}</span>
            </td>
            <td class="px-6 py-4">
              <div class="text-gray-900 font-medium">$ {{ material.value }}</div>
              <div class="text-xs text-gray-500">@{{ material.pricePerUnit }} $</div>
            </td>
            <td class="px-6 py-4">
              <div class="text-gray-900">{{ material.supplier }}</div>
              <div class="text-xs text-gray-500">{{ $t('inventory.lastUpdated') }}: {{ material.lastUpdated }}</div>
            </td>
            <td class="px-6 py-4 text-center relative">
              <button @click="showMenuId = showMenuId === material.id ? null : material.id"
                class="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 transition-colors"
                :aria-expanded="showMenuId === material.id">
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <circle cx="12" cy="6" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="18" r="2" />
                </svg>
              </button>
              <div v-if="showMenuId === material.id"
                class="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg ring-1 ring-gray-100 z-50 transform transition-opacity duration-200" :class="{ 'opacity-0 invisible' : showMenuId !== material.id, 'opacity-100 visible' : showMenuId === material.id }">
                <button @click="openEdit(material)"
                  class="w-full text-left px-2 py-1 text-sm text-gray-800 hover:bg-blue-50 flex items-center gap-1 transition-colors">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>{{ $t('staff.edit') }}
                </button>
                <div class="border-t border-gray-200"></div>
                <button @click="showDeleteConfirm = true; selectedToDelete = { item: material, type: 'material' }"
                  class="w-full text-left px-2 py-1 text-sm text-red-500 hover:bg-red-50 flex items-center gap-1 transition-colors">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0h4m-7 4v12m10-12v12" />
                  </svg>{{ $t('staff.delete') }}
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="items.length === 0" class="text-center py-6 text-gray-500 italic">
        {{ $t('inventory.noItemsFound') }}
      </div>
    </div>

    <div class="mt-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-gray-800">{{ $t('inventory.borrowInventory') }}</h2>
        <button @click="toggleBorrowForm"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow flex items-center space-x-1 transition-colors">
          <span>{{ $t('inventory.borrow') }}</span>
        </button>
      </div>

      <BorrowForm v-if="showBorrowForm" @close="closeBorrowForm" @submitted="handleBorrowSubmitted" />

      <div class="overflow-x-auto rounded-lg border border-gray-200">
        <table class="min-w-full text-sm">
          <thead class="bg-green-600">
            <tr>
              <th class="px-3 py-3 text-left font-semibold text-white uppercase tracking-wider">{{ $t('inventory.quantity') }}</th>
              <th class="px-3 py-3 text-left font-semibold text-white uppercase tracking-wider">{{ $t('inventory.purpose') }}</th>
              <th class="px-3 py-3 text-left font-semibold text-white uppercase tracking-wider">{{ $t('inventory.borrowedDate') }}</th>
              <th class="px-3 py-3 text-left font-semibold text-white uppercase tracking-wider">{{ $t('inventory.returnedDate') }}</th>
              <th class="px-3 py-3 text-left font-semibold text-white uppercase tracking-wider">{{ $t('inventory.materialName') }}</th>
              <th class="px-3 py-3 text-left font-semibold text-white uppercase tracking-wider">{{ $t('inventory.staffName') }}</th>
              <th class="px-3 py-3 text-left font-semibold text-white uppercase tracking-wider">{{ $t('inventory.actions') }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="report in borrowReports" :key="report.id" class="hover:bg-gray-50 transition-colors duration-200">
              <td class="px-4 py-2 text-sm font-medium text-gray-900">{{ report.quantity }}</td>
              <td class="px-4 py-2 text-sm text-gray-500">{{ report.purpose }}</td>
              <td class="px-4 py-2 text-sm text-gray-500">{{ report.borrowed_date }}</td>
              <td class="px-4 py-2 text-sm text-gray-500">{{ report.returned_date || $t('inventory.notReturned') }}</td>
              <td class="px-4 py-2 text-sm text-gray-500">{{ report.material.name }}</td>
              <td class="px-4 py-2 text-sm text-gray-500">{{ report.staff.name }}</td>
              <td class="px-4 py-2 text-sm text-right relative">
                <button @click="showMenuId = showMenuId === report.id ? null : report.id"
                  class="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 transition-colors"
                  :aria-expanded="showMenuId === report.id">
                  <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <circle cx="12" cy="6" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="18" r="2" />
                  </svg>
                </button>
                <div v-if="showMenuId === report.id"
                  class="absolute right-0 mt-1 w-40 bg-white shadow-lg rounded-lg ring-1 ring-gray-100 z-50 transform transition-opacity duration-200" :class="{ 'opacity-0 invisible' : showMenuId !== report.id, 'opacity-100 visible' : showMenuId === report.id }">
                  <button @click="returnBorrow(report)"
                    class="w-full text-left px-2 py-1 text-sm text-gray-800 hover:bg-blue-50 flex items-center gap-1 transition-colors">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>{{ $t('inventory.return') }}
                  </button>
                  <div class="border-t border-gray-200"></div>
                  <button @click="showDeleteConfirm = true; selectedToDelete = { item: report, type: 'borrowing' }"
                    class="w-full text-left px-2 py-1 text-sm text-red-500 hover:bg-red-50 flex items-center gap-1 transition-colors">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0h4m-7 4v12m10-12v12" />
                    </svg>{{ $t('staff.delete') }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="borrowReports.length === 0" class="text-center py-4 text-gray-500">{{ $t('inventory.noBorrowRecords') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AddItemView from './AddItemView.vue';
import BorrowForm from './InventoryBorrowing.vue';
import { Plus } from 'lucide-vue-next';
import API from '@/plugin/axios';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps({ items: Array });
const emit = defineEmits(['delete-item', 'edit-item', 'item-added']);

const showModal = ref(false);
const selectedMaterial = ref(null);
const showMenuId = ref(null);
const showBorrowForm = ref(false);
const categories = ['Seeds', 'Fertilizer', 'Tools', 'Feed', 'Medicine'];
const showDeleteConfirm = ref(false);
const selectedToDelete = ref(null); // { item, type: 'material' or 'borrowing' }
const borrowReports = ref([]);
const isLoading = ref(false);
const isDeleting = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const openAdd = () => { selectedMaterial.value = null; showModal.value = true };
const openEdit = (item) => { selectedMaterial.value = { ...item }; showModal.value = true };
const closeModal = () => { showModal.value = false; selectedMaterial.value = null };
const handleMaterialAdded = (material) => { emit('item-added', material); closeModal(); };
const handleMaterialUpdated = (updated) => { emit('edit-item', updated); closeModal(); };
const toggleBorrowForm = () => { showBorrowForm.value = !showBorrowForm.value };
const closeBorrowForm = () => { showBorrowForm.value = false };

const fetchBorrowReports = async () => {
  isLoading.value = true;
  try {
    const response = await API.get('/borrowings');
    borrowReports.value = response.data;
    errorMessage.value = '';
  } catch (error) {
    console.error(t('inventory.errorFetchBorrowReports'), error);
    errorMessage.value = t('inventory.errorFetchBorrowRecords');
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchBorrowReports();
});

const handleBorrowSubmitted = async (data) => {
  isLoading.value = true;
  try {
    await API.post('/borrowings', data);
    if (data.material_id && data.quantity) {
      await API.put(`/materials/${data.material_id}/decrease-stock`, { quantity: data.quantity });
    }
    await fetchBorrowReports();
    emit('item-added'); // Notify parent of state change
    showBorrowForm.value = false;
    successMessage.value = t('inventory.successBorrowAdded');
    setTimeout(() => { successMessage.value = '' }, 3000);
  } catch (error) {
    console.error(t('inventory.errorBorrowSubmit'), error);
    errorMessage.value = error.response?.data?.message || t('inventory.errorBorrowAdd');
  } finally {
    isLoading.value = false;
  }
};

const cancelDelete = () => { showDeleteConfirm.value = false; selectedToDelete.value = null };
const confirmDelete = async () => {
  if (selectedToDelete.value) {
    isDeleting.value = true;
    try {
      const { item, type } = selectedToDelete.value;
      const endpoint = type === 'material' ? '/materials' : '/borrowings';
      await API.delete(`${endpoint}/${item.id}`);
      if (type === 'material') {
        emit('delete-item', item.id);
      } else {
        await fetchBorrowReports(); // Refresh borrow reports
        emit('item-added'); // Notify parent to refresh
      }
      successMessage.value = t(type === 'material' ? 'inventory.successBorrowDeleted' : 'inventory.successBorrowDeleted');
      setTimeout(() => { successMessage.value = '' }, 3000);
    } catch (error) {
      console.error(t('inventory.errorBorrowDelete'), error);
      errorMessage.value = t('inventory.errorBorrowDeleteMessage');
    } finally {
      isDeleting.value = false;
      showDeleteConfirm.value = false;
      selectedToDelete.value = null;
    }
  }
};

const returnBorrow = async (report) => {
  if (report.id) {
    try {
      await API.put(`/borrowings/${report.id}`, { returned_date: new Date().toISOString().split('T')[0] });
      await fetchBorrowReports();
      successMessage.value = t('inventory.successBorrowReturned');
      setTimeout(() => { successMessage.value = '' }, 3000);
    } catch (error) {
      console.error(t('inventory.errorBorrowReturn'), error);
      errorMessage.value = t('inventory.errorBorrowReturnMessage');
    }
  }
};

const getStatusClass = (status) => ({
  'ok': 'inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800',
  'low': 'inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800',
  'critical': 'inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800',
})[status] || 'inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800';
</script>