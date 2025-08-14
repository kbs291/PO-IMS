<script setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSalesStore } from '@/stores/sales';
import POSalesTable from '@/components/table/POSalesTable.vue';

const salesStore = useSalesStore();
const { sales } = storeToRefs(salesStore);

onMounted(async () => sales.value.length === 0 && await salesStore.fetchSales());
</script>

<template>
  <div class="card">
    <div class="card-title">PO Card Sales</div>
    <div class="card-content">
      <POSalesTable :sales />
    </div>
  </div>
</template>