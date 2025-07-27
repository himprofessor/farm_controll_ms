<template>
  <div class="bg-white shadow rounded">
    <table class="min-w-full text-sm text-left">
      <thead class="bg-gray-50 text-gray-600">
        <tr>
          <th class="p-3">Item Name</th>
          <th class="p-3">Category</th>
          <th class="p-3">Current Stock</th>
          <th class="p-3">Status</th>
          <th class="p-3">Value</th>
          <th class="p-3">Supplier</th>
          <th class="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id" class="border-t hover:bg-gray-50">
          <td class="p-3">
            <div class="font-semibold">{{ item.name }}</div>
            <div class="text-xs text-gray-500">Expires: {{ item.expires || '-' }}</div>
          </td>
          <td class="p-3">{{ item.category }}</td>
          <td class="p-3">
            {{ item.stock }}<br />
            <span class="text-xs text-gray-500">Min: {{ item.min }}</span>
          </td>
          <td class="p-3">
            <span
              :class="{
                'bg-red-100 text-red-600': item.status === 'critical',
                'bg-yellow-100 text-yellow-600': item.status === 'low',
                'bg-green-100 text-green-600': item.status === 'good'
              }"
              class="px-2 py-1 rounded text-xs"
            >
              {{ item.status }}
            </span>
          </td>
          <td class="p-3">
            ${{ item.value }}<br />
            <span class="text-xs text-gray-500">@{{ item.unitPrice }}</span>
          </td>
          <td class="p-3">
            {{ item.supplier }}<br />
            <span class="text-xs text-gray-500">Last: {{ item.last }}</span>
          </td>
          <td class="p-3 space-x-2">
            <button class="text-green-500 hover:underline">✏️</button>
            <button class="text-red-500 hover:underline">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'InventoryTable',
  props: {
    items: Array
  }
};
</script>
