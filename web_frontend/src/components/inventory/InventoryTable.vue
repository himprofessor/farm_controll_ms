<template>
  <div class="bg-white rounded-xl shadow-sm border overflow-hidden pb-20">
    <table class="w-full">
      <thead class="bg-gray-50 border-b border-gray-200">
        <tr>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Item Name</th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Current Stock</th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Value</th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Supplier</th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-100">
        <tr v-for="item in items" :key="item.id" class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-5">
            <div>
              <div class="text-sm font-semibold text-gray-900">{{ item.name }}</div>
              <div class="text-sm text-gray-500">Expires: {{ item.expiry }}</div>
            </div>
          </td>
          <td class="px-6 py-5">
            <span class="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
              {{ item.category }}
            </span>
          </td>
          <td class="px-6 py-5">
            <div>
              <div class="text-sm font-semibold text-gray-900">{{ item.currentStock }}</div>
              <div class="text-sm text-gray-500">Min: {{ item.minStock }}</div>
            </div>
          </td>
          <td class="px-6 py-5">
            <span 
              :class="{
                'bg-red-100 text-red-700 border border-red-200': item.status === 'critical',
                'bg-yellow-100 text-yellow-700 border border-yellow-200': item.status === 'low',
                'bg-green-100 text-green-700 border border-green-200': item.status === 'good'
              }"
              class="px-3 py-1 text-xs font-semibold rounded-full flex items-center space-x-1 w-fit"
            >
              <AlertTriangleIcon v-if="item.status === 'critical'" class="w-3 h-3" />
              <span>{{ item.status }}</span>
            </span>
          </td>
          <td class="px-6 py-5">
            <div>
              <div class="text-sm font-semibold text-gray-900">${{ item.value.toFixed(2) }}</div>
              <div class="text-sm text-gray-500">@${{ item.unitPrice.toFixed(2) }}/{{ item.unit }}</div>
            </div>
          </td>
          <td class="px-6 py-5">
            <div>
              <div class="text-sm font-semibold text-gray-900">{{ item.supplier }}</div>
              <div class="text-sm text-gray-500">Last: {{ item.lastOrder }}</div>
            </div>
          </td>
          <td class="px-6 py-5">
            <div class="relative">
              <button 
                @click="toggleDropdown(item.id)"
                class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="More actions"
              >
                <MoreVerticalIcon class="w-5 h-5" />
              </button>
              
              <!-- Dropdown Menu -->
              <div 
                v-if="activeDropdown === item.id"
                class="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10"
                @click.stop
              >
                <button
                  @click="handleEdit(item)"
                  class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                >
                  <EditIcon class="w-4 h-4 text-green-600" />
                  <span>Edit Item</span>
                </button>
                <button
                  @click="handleDelete(item.id)"
                  class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                >
                  <TrashIcon class="w-4 h-4 text-red-600" />
                  <span>Delete Item</span>
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    
    <!-- Overlay to close dropdown when clicking outside -->
    <div 
      v-if="activeDropdown"
      class="fixed inset-0 z-5"
      @click="closeDropdown"
    ></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AlertTriangleIcon, EditIcon, TrashIcon, MoreVerticalIcon } from 'lucide-vue-next'

defineProps({
  items: Array
})

const emit = defineEmits(['edit', 'delete'])

const activeDropdown = ref(null)

const toggleDropdown = (itemId) => {
  if (activeDropdown.value === itemId) {
    activeDropdown.value = null
  } else {
    activeDropdown.value = itemId
  }
}

const closeDropdown = () => {
  activeDropdown.value = null
}

const handleEdit = (item) => {
  emit('edit', item)
  closeDropdown()
}

const handleDelete = (itemId) => {
  emit('delete', itemId)
  closeDropdown()
}
</script>