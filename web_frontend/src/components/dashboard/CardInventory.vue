<template>
  <div :class="['p-4 rounded shadow w-full flex items-center gap-4', alert ? 'bg-red-100 text-red-700' : 'bg-white']">
    <component :is="icon" class="h-8 w-8" />
    <div>
      <div class="text-sm font-semibold">{{ title }}</div>
      <div class="text-xl font-bold">{{ value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardInventory',
  props: {
    title: String,
    value: String,
    icon: [Object, String],
    alert: Boolean
  }
};
</script>