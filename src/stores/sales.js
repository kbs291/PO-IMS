import { reactive } from "vue";
import { defineStore } from "pinia";

export const useSalesStore = defineStore('sales', () => {
  const sales = reactive([]);

  function addSales(sale) {
    sales.push(sale);
  }

  return { sales, addSales };
});