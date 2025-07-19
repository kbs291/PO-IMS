<script setup>
import { computed, defineProps, ref } from 'vue';
import { formatDate } from '@/utils/formatDate';
import { formatAmount } from '@/utils/formatAmount';
import { calculateTotal } from '@/utils/calculateTotal';

const month = ref(formatDate(new Date(), 'm-y'));
const tab = ref('all');
const props = defineProps({
  sales: {
    type: Array,
    required: true,
  },
});

const getSales = computed(() => {
  const date = new Date(month.value);
  if (tab.value === 'month') {
    return props.sales.filter((sale) => {
      const saleDate = new Date(sale.purchaseDate);
      return saleDate.getMonth() === date.getMonth() && saleDate.getFullYear() === date.getFullYear();
    });
  }
  return props.sales;
})
</script>

<template>
  <div class="d-flex justify-content-between align-items-center">
    <h4 class="m-0">PO Card Sales</h4>
    <div class="btn-group">
      <button type="button" class="border-0" :class="{ 'active': tab === 'all' }" @click="tab = 'all'">All</button>
      <button type="button" class="border-0" :class="{ 'active': tab === 'month' }" @click="tab = 'month'">By Month</button>
    </div>
  </div>

  <div>
    <div class="d-flex justify-content-end mt-4 mb-2" v-if="tab === 'month'">
      <input type="month" v-model="month" />
    </div>

    <div class="table-responsive" v-if="getSales.length > 0">
      <table class="table table-hover align-middle mt-2">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Purchase Date</th>
            <th scope="col">Number of Cards</th>
            <th scope="col" class="text-end">Total Amount</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="sale in getSales" :key="sale.id">
            <td>{{ sale.id }}</td>
            <td>{{ sale.name }}</td>
            <td>{{ formatDate(sale.purchaseDate) }}</td>
            <td>{{ sale.numberOfCards }}</td>
            <td class="text-end">{{ formatAmount(sale.totalAmount) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4">&nbsp;</td>
            <td class="text-end">{{ formatAmount(calculateTotal(getSales, 'totalAmount')) }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="p-5 text-center border rounded empty" v-else>No Data</div>
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