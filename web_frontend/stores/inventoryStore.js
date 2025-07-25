import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const InventoryStore = defineStore("inventory", () => {
    const items = ref([]);
    const totalItems = computed(() => items.value.length);
   

    function addItem(item) {
        items.value.push(item);
    }

    function removeItem(item) {
        const index = items.value.indexOf(item);
        if (index > -1) {
            items.value.splice(index, 1);
        }
    }



    function editItem(oldItem, newItem) {
        const index = items.value.indexOf(oldItem);
        if (index > -1) {
            items.value[index] = newItem;
        }
    }

    return {
        items,
        totalItems,
        addItem,
        removeItem,
 
        editItem,
    };
});
