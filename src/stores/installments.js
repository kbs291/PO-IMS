import axios from "axios";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { generateDueDates } from "@/utils/generateDueDates";

export const useInstallmentsStore = defineStore('installments', () => {
  let installments = reactive([]);
  
  const fetchInstallments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/installments');
      response.data.forEach(data => {
        const dataExists = installments.find(installment => installment.id === data.id);
        
        if (dataExists) {
          addInstallments(data);
        }
      });
    } catch (error) {
      console.log('Failed to fetch data');
    }
  };

  const addInstallments = (installment) => {
    const purchaseDate = ref(new Date(installment.purchaseDate));
    const dueDates = reactive({
      first: new Date(installment.dueDates.first),
      second: new Date(installment.dueDates.second),
      third: new Date(installment.dueDates.third),
      fourth: new Date(installment.dueDates.fourth)
    });
    const paymentDates = reactive({
      first: installment.paymentDates.first ? new Date(installment.paymentDates.first) : null,
      second: installment.paymentDates.second ? new Date(installment.paymentDates.second) : null,
      third: installment.paymentDates.third ? new Date(installment.paymentDates.third) : null,
      fourth: installment.paymentDates.fourth ? new Date(installment.paymentDates.fourth) : null
    });

    installments.push({ ...installment, purchaseDate, dueDates, paymentDates });
  };

  const createInstallment = (sale) => {
    const amountDue = sale.totalAmount / 4;
    const installmentObj = reactive({
      id: installments.length + 1,
      salesId: sale.id,
      name: sale.name,
      purchaseDate: new Date(sale.purchaseDate),
      numberOfCards: sale.numberOfCards,
      amountDue: {
        first: amountDue,
        second: amountDue,
        third: amountDue,
        fourth: amountDue
      },
      dueDates: generateDueDates(sale.purchaseDate),
      status: {
        first: 'pending',
        second: 'pending',
        third: 'pending',
        fourth: 'pending',
      },
      paymentDates: {
        first: '',
        second: '',
        third: '',
        fourth: ''
      }
    });

    addInstallments(installmentObj);
  }

  return { installments, fetchInstallments, addInstallments, createInstallment };
});