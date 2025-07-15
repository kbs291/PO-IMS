<script setup>
import { defineProps } from 'vue';
import { formatDate } from '@/utils/formatDate';
import { formatAmount } from '@/utils/formatAmount';

defineProps({
  sales: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <h4 class="mb-3">Sales</h4>

  <section v-if="sales.length > 0">
    <div class="table-responsive">
      <table class="table table-striped table-hover align-middle mt-4">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Purchase Date</th>
            <th scope="col">Number of Cards</th>
            <th scope="col">First Due Date</th>
            <th scope="col" class="text-end">Total Amount</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(sale, index) in sales" :key="index">
            <td>{{ sale.name }}</td>
            <td>
              <span class="d-inline-block border rounded-pill p-2 px-3">{{ formatDate(sale.purchaseDate) }}</span>
            </td>
            <td>{{ sale.numberOfCards }}</td>
            <td>
              <span class="d-inline-block border rounded-pill p-2 px-3">{{ formatDate(sale.firstDueDate) }}</span>
            </td>
            <td class="text-end">{{ formatAmount(sale.totalAmount) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  <section v-else>
    <div class="p-5 text-center border rounded empty">No Data</div>
  </section>
</template>

<style scoped>
.empty {
  border-style: dashed !important;
}
</style>