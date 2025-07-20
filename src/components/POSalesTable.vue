<script setup>
import { defineProps } from 'vue';
import { formatDate } from '@/utils/formatDate';
import { formatAmount } from '@/utils/formatAmount';
import { calculateTotal } from '@/utils/calculateTotal';

const props = defineProps({
  sales: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="table-responsive" v-if="sales.length > 0">
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
        <tr v-for="sale in sales" :key="sale.id">
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
          <td class="text-end">{{ formatAmount(calculateTotal(sales, 'totalAmount')) }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
  <div class="p-5 text-center border rounded empty" v-else>No Data</div>
</template>