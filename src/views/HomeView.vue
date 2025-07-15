<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useSalesStore } from '@/stores/sales';
import AddSalesForm from '@/components/AddSalesForm.vue';
import SalesTable from '@/components/SalesTable.vue';

const salesStore = useSalesStore();
const { sales } = storeToRefs(salesStore);

onMounted(async () => {
  await salesStore.fetchSales();
});
</script>

<template>
  
  <div class="row">
    <div class="col-12 mb-5">
      <AddSalesForm />
    </div>
    <div class="col-12 mt-3">
      <SalesTable :sales="sales" />
    </div>
  </div>
</template>