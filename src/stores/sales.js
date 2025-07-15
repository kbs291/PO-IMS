import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useSalesStore = defineStore('sales', () => {
  let sales = reactive([]);

  const fetchSales = async () => {
    try {
      const response = await axios.get('http://localhost:3000/sales');
      response.data.forEach((data) => {
        data.date = new Date(data.date);
        data.dueDates = generateDueDates(data.date);
        addSales(data);
      });
    } catch (error) {
      console.log('Failed to fetch data');
    }
  }
  
  const addSales = (sale) => {
    sales.push(sale);
  }

  const generateDueDates = (purchaseDate) => {
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

  return { sales, fetchSales, addSales, generateDueDates };
});