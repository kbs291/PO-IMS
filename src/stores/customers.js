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
          data.fullName = `${data.firstName} ${data.lastName}`;
          data.addedDate = new Date(data.addedDate);
          customers.push({ ...data });
        }
      });

    } catch (error) {
      console.log('Failed to fetch data');
    }
  }

  const addCustomer = (customer) => {
    const id = customers.length + 1;
    customer.fullName = `${customer.firstName} ${customer.lastName}`;
    customers.push({ ...customer, id });
  }

  const editCustomer = (customer) => {
    customers.map(cust =>  {
      if (cust.id === customer.id) {
        cust.firstName = customer.firstName;
        cust.lastName = customer.lastName;
        cust.fullName = `${customer.firstName} ${customer.lastName}`;
        cust.contactNumber = customer.contactNumber;
        cust.addedDate = customer.addedDate;
      }
    });
  }

  const deleteCustomer = (customer) => {
    customers.splice(customers.findIndex(item => item.id === customer.id), 1);
  }

  return { customers, fetchCustomers, addCustomer, editCustomer, deleteCustomer };
});