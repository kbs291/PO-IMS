<script setup>
import { useSalesStore } from '@/stores/sales';
import AddSalesForm from '@/components/AddSalesForm.vue';
import SalesTable from '@/components/SalesTable.vue';

const salesStore = useSalesStore();

</script>

<template>
  <h1>Installment Management System</h1>
  
  <AddSalesForm />
  <SalesTable :salesList="salesStore.salesList" />
</template>