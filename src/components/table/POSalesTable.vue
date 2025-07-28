<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { defineProps } from 'vue';
import { formatAmount } from '@/utils/formatAmount';
import { calculateTotal } from '@/utils/calculateTotal';

const props = defineProps({
  sales: {
    type: Array,
    required: true,
  },
});

const formatDate = (value) => {
  return value.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};
</script>

<template>
  <div v-if="sales.length > 0">
    <DataTable :value="sales" tableStyle="min-width: 50rem">
      <Column field="id" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="purchaseDate" header="Purchase Date">
        <template #body="slotProps">
          {{ formatDate(slotProps.data.purchaseDate) }}
        </template>
      </Column>
      <Column field="numberOfCards" header="Quantity"></Column>
      <Column field="totalAmount" header="Amount">
        <template #body="slotProps">
          {{ formatAmount(slotProps.data.totalAmount) }}
        </template>
      </Column>
    </DataTable>
  </div>


  <!-- <div v-if="sales.length > 0">
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
  </div> -->
  <div v-else>No Data</div>
</template>