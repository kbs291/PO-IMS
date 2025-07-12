import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useSalesStore = defineStore('sales', () => {
  const sales = reactive([]);

  function generateDueDates(purchaseDate) {
    const date = ref(new Date(purchaseDate));
    
    const day = date.value.getDate();
    const year = date.value.getFullYear();
    const month = date.value.getMonth();
    const lastDay = ref(new Date(year, month + 1, 0).getDate())
    
    const dueDates = reactive({
      first: '',
      second: '',
      third: '',
      fourth: '',
    });

    if (day < 15) {
      dueDates.first = new Date(year, month, 15);
      dueDates.second = new Date(year, month + 1, 0);
      dueDates.third = new Date(year, month + 1, 15);
      dueDates.fourth = new Date(year, month + 2, 0);
    } else if (day === lastDay.value) {  
      dueDates.first = new Date(year, month + 1, 15);
      dueDates.second = new Date(year, month + 2, 0);
      dueDates.third = new Date(year, month + 2, 15);
      dueDates.fourth = new Date(year, month + 3, 0);
    } else {
      dueDates.first = new Date(year, month + 1, 0);
      dueDates.second = new Date(year, month + 1, 15);
      dueDates.third = new Date(year, month + 2, 0);
      dueDates.fourth = new Date(year, month + 2, 15);
    }

    return dueDates;
  }

  function addSales(sale) {
    sales.push(sale);
  }

  return { sales, addSales, generateDueDates };
});