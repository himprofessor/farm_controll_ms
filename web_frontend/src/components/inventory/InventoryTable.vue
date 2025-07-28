<template>
  <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
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
            <div class="flex space-x-2">
              <button 
                @click="$emit('edit', item)"
                class="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                title="Edit Item"
              >
                <EditIcon class="w-5 h-5" />
              </button>
              <button 
                @click="$emit('delete', item.id)"
                class="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete Item"
              >
                <TrashIcon class="w-5 h-5" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { AlertTriangleIcon, EditIcon, TrashIcon } from 'lucide-vue-next'

defineProps({
  items: Array
})

defineEmits(['edit', 'delete'])
</script>