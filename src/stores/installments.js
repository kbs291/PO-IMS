import axios from "axios";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
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

  const getInstallments = computed(() => {
    const newInstallments = reactive([]);
    const newArray = Map.groupBy(installments, installment => installment.saleId);
    
    newArray.forEach((arr) => {
      arr.sort((a, b) => { return new Date(a.dueDate) - new Date(b.dueDate) })
    });

    newArray.forEach((value, key) => {
      let installmentObj = reactive({});
      const id = key;
      const keyIndex = [ 'first', 'second', 'third', 'fourth' ];

      const dueDate = reactive({});
      const status = reactive({});
      const amountDue = reactive({});
      const paymentDate = reactive({});
      const installmentId = reactive({});

      value.forEach((element, index) => {
        dueDate[keyIndex[index]] = element.dueDate;
        status[keyIndex[index]] = element.status;
        amountDue[keyIndex[index]] = element.amountDue;
        paymentDate[keyIndex[index]] = element.paymentDate;
        installmentId[keyIndex[index]] = element.id;
        installmentObj = { ...element }
      });
      newInstallments.push({ ...installmentObj, id, dueDate, status, amountDue, paymentDate, installmentId });
    });

    return newInstallments;
  });

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

  return { installments, getInstallments, fetchInstallments, createInstallment };
});