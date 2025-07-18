import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useInstallmentsStore } from "./installments";
import { generateDueDates } from "@/utils/generateDueDates";
import axios from "axios";

export const useSalesStore = defineStore('sales', () => {
  const installmentsStore = useInstallmentsStore();
  const sales = reactive([]);

  const fetchSales = async () => {
    try {
      const response = await axios.get('http://localhost:3000/sales');
      response.data.forEach((data) => {
        data.id = Number(data.id);
        data.purchaseDate = new Date(data.purchaseDate);
        data.firstDueDate = new Date(data.firstDueDate);
        
        const dataExists = sales.find(sale => sale.id === data.id);
        if (!dataExists) {
          addSales(data);
        }
      });
    } catch (error) {
      console.log('Failed to fetch data');
    }
  }
  
  const addSales = (sale) => {
    const id = sales.length + 1;
    const purchaseDate = new Date(sale.purchaseDate);
    const totalAmount = sale.numberOfCards * 500;
    const numberOfInstallments = 4;
    const firstDueDate = generateDueDates(purchaseDate).first;

    sales.push({ ...sale, id, purchaseDate, totalAmount, numberOfInstallments, firstDueDate });
    installmentsStore.createInstallment({ ...sale, id, purchaseDate, totalAmount, numberOfInstallments, firstDueDate });
  }

  return { sales, fetchSales, addSales, generateDueDates };
});