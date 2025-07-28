<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useSalesStore } from '@/stores/sales';
import POSalesTable from '@/components/table/POSalesTable.vue';

const salesStore = useSalesStore();
const { sales } = storeToRefs(salesStore);

onMounted(async () => await salesStore.fetchSales());
</script>

<template>
  <div class="card">
    <div class="card-title">PO Card Sales</div>
    <div class="card-content">
      <POSalesTable :sales="sales" />
    </div>
  </div>
</template>