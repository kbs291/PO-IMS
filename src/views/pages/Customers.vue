<script setup>
import { useCustomersStore } from '@/stores/customers';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import CustomersTable from '@/components/table/CustomersTable.vue';

const customersStore = useCustomersStore();
const { customers } = storeToRefs(customersStore);

onMounted(async () => await customersStore.fetchCustomers());
</script>

<template>
  <div class="card">
    <div class="card-title">Customers</div>
    <div class="card-content">
      <CustomersTable :customers />
    </div>
  </div>
</template>