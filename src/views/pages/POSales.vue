<script setup>
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSalesStore } from '@/stores/sales';
import { formatDate } from '@/utils/formatDate';
import AddSalesForm from '@/components/AddSalesForm.vue';
import POSalesTable from '@/components/table/POSalesTable.vue';

const month = ref(formatDate(new Date(), 'm-y'));
const tab = ref('all');
const salesStore = useSalesStore();
const { sales } = storeToRefs(salesStore);

onMounted(async () => await salesStore.fetchSales());

const getSales = computed(() => {
  const date = new Date(month.value);
  if (tab.value === 'month') {
    return sales.value.filter((sale) => {
      const saleDate = new Date(sale.purchaseDate);
      return saleDate.getMonth() === date.getMonth() && saleDate.getFullYear() === date.getFullYear();
    });
  }
  return sales.value;
})
</script>

<template>
  <div class="card">
    <div class="card-title">PO Card Sales</div>
    <!-- <div>
      <AddSalesForm />
    </div> -->
    <div>
      <!-- <div>
        <div class="btn-group">
          <button type="button":class="{ 'active': tab === 'all' }" @click="tab = 'all'">All</button>
          <button type="button" :class="{ 'active': tab === 'month' }" @click="tab = 'month'">By Month</button>
        </div>
      </div> -->

      <div v-if="tab === 'month'">
        <input type="month" v-model="month" />
      </div>
      <POSalesTable :sales="getSales" />
    </div>
  </div>
</template>

<style scoped>
.btn-group button {
  color: var(--bs-secondary);
  background: none;
  &.active {
    color: rgba(0, 0, 0, 1);
  }
}
</style>