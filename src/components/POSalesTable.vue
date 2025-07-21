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
  <div v-if="sales.length > 0">
    <table>
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Purchase Date</th>
          <th scope="col">Number of Cards</th>
          <th scope="col">Total Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sale in sales" :key="sale.id">
          <td>{{ sale.id }}</td>
          <td>{{ sale.name }}</td>
          <td>{{ formatDate(sale.purchaseDate) }}</td>
          <td>{{ sale.numberOfCards }}</td>
          <td>{{ formatAmount(sale.totalAmount) }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4">&nbsp;</td>
          <td>{{ formatAmount(calculateTotal(sales, 'totalAmount')) }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
  <div v-else>No Data</div>
</template>