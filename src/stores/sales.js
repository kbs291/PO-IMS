import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useSalesStore = defineStore('sales', () => {
  const sales = reactive([]);

  function generateDueDates(purchaseDate) {
    const date = ref(new Date(purchaseDate));
    const lastDate = ref(new Date(date.value.getFullYear(), date.value.getMonth() + 1, 0))
    const dueDates = reactive({
      first: '',
      second: '',
      third: '',
      fourth: '',
    });

    if (date.value.getDate() < 15) {
      dueDates.first = new Date(date.value.getFullYear(), date.value.getMonth(), 15);
      dueDates.second = new Date(date.value.getFullYear(), date.value.getMonth() + 1, 0);
      dueDates.third = new Date(date.value.getFullYear(), date.value.getMonth() + 1, 15);
      dueDates.fourth = new Date(date.value.getFullYear(), date.value.getMonth() + 2, 0);
    } else if (date.value.getDate() === lastDate.value.getDate()) {  
      dueDates.first = new Date(date.value.getFullYear(), date.value.getMonth() + 1, 15);
      dueDates.second = new Date(date.value.getFullYear(), date.value.getMonth() + 2, 0);
      dueDates.third = new Date(date.value.getFullYear(), date.value.getMonth() + 2, 15);
      dueDates.fourth = new Date(date.value.getFullYear(), date.value.getMonth() + 3, 0);
    } else {
      dueDates.first = new Date(date.value.getFullYear(), date.value.getMonth() + 1, 0);
      dueDates.second = new Date(date.value.getFullYear(), date.value.getMonth() + 1, 15);
      dueDates.third = new Date(date.value.getFullYear(), date.value.getMonth() + 2, 0);
      dueDates.fourth = new Date(date.value.getFullYear(), date.value.getMonth() + 2, 15);
    }

    return dueDates;
  }
  
  function addSales(sale) {
    sales.push(sale);
  }

  return { sales, addSales, generateDueDates };
});