import { reactive } from "vue";
import { defineStore } from "pinia";

export const useSalesStore = defineStore('sales', () => {
  const salesList = reactive([]);

  function addSales(sale) {
    salesList.push(sale);
  }

  return { salesList, addSales };
});