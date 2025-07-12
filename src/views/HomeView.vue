<script setup>
import { reactive } from 'vue';
import { useSalesStore } from '@/stores/sales';
import { getFormattedDate } from '@/utils/formattedDate';
import AddSalesForm from '@/components/AddSalesForm.vue';
import SalesTable from '@/components/SalesTable.vue';

const salesStore = useSalesStore();

// temporary sales data
const salesTemp = reactive([
  {
    name: 'Karen',
    date: getFormattedDate(new Date("2025-03-18")),
    numberOfCards: 2,
    dueDates: salesStore.generateDueDates(getFormattedDate(new Date("2025-03-18"))),
  },
  {
    name: 'Jane',
    date: getFormattedDate(new Date("2025-04-07")),
    numberOfCards: 3,
    dueDates: salesStore.generateDueDates(getFormattedDate(new Date("2025-04-07"))),
  },
  {
    name: 'Alex',
    date: getFormattedDate(new Date("2025-06-30")),
    numberOfCards: 1,
    dueDates: salesStore.generateDueDates(getFormattedDate(new Date("2025-06-30"))),
  },
]);
salesTemp.forEach((sale) => salesStore.addSales(sale));

</script>

<template>
  
  <div class="row">
    <div class="col-12 mb-5">
      <AddSalesForm />
    </div>
    <div class="col-12 mt-3">
      <SalesTable :sales="salesStore.sales" />
    </div>
  </div>
</template>