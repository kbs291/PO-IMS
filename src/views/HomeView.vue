<script setup>
import { useSalesStore } from '@/stores/sales';
import AddSalesForm from '@/components/AddSalesForm.vue';
import SalesTable from '@/components/SalesTable.vue';

const salesStore = useSalesStore();

</script>

<template>
  <div class="row">
    <div class="col-md-5">
      <AddSalesForm />
    </div>
    <div class="col-md-7">
      <SalesTable :sales="salesStore.sales" />
    </div>
  </div>
</template>