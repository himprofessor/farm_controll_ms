<template>
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div class="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <!-- Search Bar -->
          <div class="relative flex-1 max-w-md">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search maintenance records..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <!-- Filter Dropdown -->
          <select
            v-model="dateFilter"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>

          <!-- Add Button -->
          <button
            @click="openAddModal"
            class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add Maintenance
          </button>
        </div>
      </div>

      <!-- Table Section -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <!-- Table Header -->
        <div class="bg-green-600 text-white">
          <div class="grid grid-cols-12 gap-4 px-6 py-3.5 font-medium ">
            <div class="col-span-2 text-xs">DATE</div>
            <div class="col-span-2 text-xs">NAME</div>
            <div class="col-span-3 text-xs">DESCRIPTION</div>
            <div class="col-span-2 text-xs">PERFORMED BY</div>
            <div class="col-span-2 text-xs">AMOUNT</div>
            <div class="col-span-1 text-xs">ACTIONS</div>
          </div>
        </div>

        <!-- Table Body -->
        <div class="divide-y divide-gray-200 text-sm">
          <div
            v-for="maintenance in filteredMaintenances"
            :key="maintenance.id"
            class="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div class="col-span-2 text-gray-900">{{ formatDate(maintenance.maintenance_date) }}</div>
            <div class="col-span-2 text-gray-900 font-medium">{{ maintenance.name }}</div>
            <div class="col-span-3 text-gray-600">{{ maintenance.description }}</div>
            <div class="col-span-2 text-gray-600">{{ maintenance.performed_by }}</div>
            <div class="col-span-2 text-red-600 font-semibold">${{ maintenance.cost}}</div>
            <div class="col-span-1">
              <div class="relative">
                <button
                  @click="toggleActionMenu(maintenance.id)"
                  class="text-gray-400 hover:text-gray-600 p-1"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                  </svg>
                </button>
                
                <!-- Action Menu -->
                <div
                  v-if="activeActionMenu === maintenance.id"
                  class="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-32"
                >
                  <button
                    @click="editMaintenance(maintenance)"
                    class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Edit
                  </button>
                  <button
                    @click="deleteMaintenance(maintenance.id)"
                    class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredMaintenances.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No maintenance records</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by adding a new maintenance record.</p>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click="closeModal"
    >
      <div
        @click.stop
        class="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
      >
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-gray-900">
            {{ isEditing ? 'Edit Maintenance' : 'Add New Maintenance' }}
          </h2>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Equipment Name</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter equipment name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Maintenance Date</label>
            <input
              v-model="form.maintenance_date"
              type="date"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="form.description"
              required
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Describe the maintenance work"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Cost ($)</label>
            <input
              v-model.number="form.cost"
              type="number"
              step="0.01"
              min="0"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Performed By</label>
            <input
              v-model="form.performed_by"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter technician name"
            />
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {{ isEditing ? 'Update' : 'Add' }} Maintenance
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click="closeDeleteModal"
    >
      <div
        @click.stop
        class="bg-white rounded-lg shadow-xl max-w-sm w-full p-6"
      >
        <div class="flex items-center gap-4 mb-4">
          <div class="flex-shrink-0">
            <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900">Delete Maintenance Record</h3>
            <p class="text-sm text-gray-500 mt-1">Are you sure you want to delete this maintenance record? This action cannot be undone.</p>
          </div>
        </div>

        <div class="flex gap-3">
          <button
            @click="closeDeleteModal"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useMaintenanceStore } from "@/stores/maintenances";

const maintenanceStore = useMaintenanceStore();

const searchQuery = ref("");
const dateFilter = ref("all");
const showModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const editingId = ref(null);
const deleteId = ref(null);
const activeActionMenu = ref(null);


const form = ref({
  name: "",
  maintenance_date: "",
  description: "",
  cost: 0,
  performed_by: "",
});

// Load data on mount
onMounted(() => {
  maintenanceStore.fetchMaintenances();
});

// Computed list (search + filter)
const filteredMaintenances = computed(() => {
  let filtered = maintenanceStore.maintenances;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (m) =>
        m.name.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query) ||
        m.performed_by.toLowerCase().includes(query)
    );
  }

  if (dateFilter.value !== "all") {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    filtered = filtered.filter((m) => {
      const maintenanceDate = new Date(m.maintenance_date);
      switch (dateFilter.value) {
        case "today":
          return maintenanceDate >= today;
        case "week":
          return (
            maintenanceDate >=
            new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
          );
        case "month":
          return (
            maintenanceDate >=
            new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
          );
        default:
          return true;
      }
    });
  }

  return filtered.sort(
    (a, b) => new Date(b.maintenance_date) - new Date(a.maintenance_date)
  );
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US");
};

const openAddModal = () => {
  isEditing.value = false;
  editingId.value = null;
  resetForm();
  showModal.value = true;
};

const editMaintenance = (maintenance) => {
  isEditing.value = true;
  editingId.value = maintenance.id;
  form.value = { ...maintenance };
  showModal.value = true;
  activeActionMenu.value = null;
};

const deleteMaintenance = (id) => {
  deleteId.value = id;
  showDeleteModal.value = true;
  activeActionMenu.value = null;
};

const confirmDelete = async () => {
  await maintenanceStore.deleteMaintenance(deleteId.value);
  closeDeleteModal();
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  deleteId.value = null;
};

const resetForm = () => {
  form.value = {
    name: "",
    maintenance_date: "",
    description: "",
    cost: 0,
    performed_by: "",
  };
};

const submitForm = async () => {
  if (isEditing.value) {
    await maintenanceStore.updateMaintenance(editingId.value, form.value);
  } else {
    await maintenanceStore.addMaintenance(form.value);
  }
  closeModal();
};

const toggleActionMenu = (id) => {
  activeActionMenu.value = activeActionMenu.value === id ? null : id;
};
</script>
