import { reactive, ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
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
        data.addedDate = new Date(data.addedDate);
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
    const addedDate = new Date(sale.addedDate);
    const purchaseDate = new Date(sale.purchaseDate);
    const totalAmount = sale.numberOfCards * 500;
    const numberOfInstallments = 4;
    const firstDueDate = generateDueDates(purchaseDate).first;

    sales.push({ ...sale, id, purchaseDate, totalAmount, numberOfInstallments, firstDueDate, addedDate });
    installmentsStore.createInstallment({ ...sale, id, purchaseDate, totalAmount, numberOfInstallments, firstDueDate, addedDate });
  }

  const updateSales = (sale) => {
    sales.map(item => {
      if (item.id === sale.id) {
        item.name = sale.name;
        item.purchaseDate = sale.purchaseDate;
        item.numberOfCards = sale.numberOfCards;
        item.totalAmount = sale.numberOfCards * 500;

        installmentsStore.updateInstallments(item);
      }
    });
  }

  const deleteSales = (sale) => {
    sales.map(item => {
      if (item.id === sale.id) {
        sales.splice(sales.findIndex(item => item.id === sale.id), 1);

        installmentsStore.deleteInstallments(item);
      }
    })
  }

  return { sales, fetchSales, addSales, updateSales, deleteSales, generateDueDates };
});