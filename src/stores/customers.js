import { reactive } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useCustomersStore = defineStore('customers', () => {
  const customers = reactive([]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/customers');
      response.data.forEach(data => {
        const dataExists = customers.find(customer => customer.id === data.id);

        if (!dataExists) {
          data['fullName'] = `${data.firstName} ${data.lastName}`;
          customers.push(data);
        }
      });

    } catch (error) {
      console.log('Failed to fetch data');
    }
  }

  return { customers, fetchCustomers };
});