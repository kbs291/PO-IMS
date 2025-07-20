import axios from "axios";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { generateDueDates } from "@/utils/generateDueDates";

export const useInstallmentsStore = defineStore('installments', () => {
  const installments = reactive([]);
  
  const fetchInstallments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/installments');
      response.data.forEach(data => {
        const dataExists = installments.find(installment => installment.id === data.id);
        
        if (dataExists) {
          /**
           * Assumption: 
           * - Data structure from the API is the same as
           *   the createInstallment()  */ 
          installments.push(data);
        }
      });
    } catch (error) {
      console.log('Failed to fetch data');
    }
  };

  const createInstallment = (sale) => {
    const dueDates = generateDueDates(sale.purchaseDate);
    const dateParams = ['first', 'second', 'third', 'fourth'];
    let count = 0;

    while (count < sale.numberOfInstallments) {
      const installmentObj = {
        id: installments.length + 1,
        saleId: sale.id,
        name: sale.name,
        purchaseDate: sale.purchaseDate,
        numberOfCards: sale.numberOfCards,
        dueDate: dueDates[dateParams[count]],
        amountDue: sale.totalAmount / sale.numberOfInstallments,
        status: 'pending',
        paymentDate: null
      }
      installments.push({ ...installmentObj });
      count++;
    }
  }

  return { installments, fetchInstallments, createInstallment };
});