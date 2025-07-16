import axios from "axios";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useInstallmentsStore = defineStore('installments', () => {
  let installments = reactive([]);
  
  const fetchInstallments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/installments');
      response.data.forEach(data => {
        addInstallments(data);
      });
    } catch (error) {
      console.log(error);
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
      first: new Date(installment.paymentDates.first),
      second: new Date(installment.paymentDates.second),
      third: new Date(installment.paymentDates.third),
      fourth: new Date(installment.paymentDates.fourth)
    });

    installments.push({ ...installment, purchaseDate, dueDates, paymentDates });
  };

  return { installments, fetchInstallments, addInstallments };
});