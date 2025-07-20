<script setup>
import { formatAmount } from '@/utils/formatAmount';
import { formatDate } from '@/utils/formatDate';
import { calculateTotal } from '@/utils/calculateTotal';

defineProps({
  installments: {
    type: Array,
    required: true,
  },
  tab: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="table-responsive" v-if="installments.length > 0">
    <table class="table table-hover align-middle mt-4" v-if="tab === 'all'">
      <thead>
        <tr>
          <th scope="col">Sale ID</th>
          <th scope="col">Name</th>
          <th scope="col">Purchase Date</th>
          <th scope="col">Number of Cards</th>
          <th scope="col">Due Date</th>
          <th scope="col" class="text-end">Amount Due</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <template v-for="installment in installments" :key="installment.id">
          <tr>
            <td rowspan="4">{{ installment.saleId }}</td>
            <td rowspan="4">{{ installment.name }}</td>
            <td rowspan="4">{{ formatDate(installment.purchaseDate) }}</td>
            <td rowspan="4">{{ installment.numberOfCards }}</td>
            <td class="border">{{ formatDate(installment.dueDate.first) }}</td>
            <td class="text-end border">{{ formatAmount(installment.amountDue.first) }}</td>
          </tr>
          <tr>
            <td class="border">{{ formatDate(installment.dueDate.second) }}</td>
            <td class="text-end border">{{ formatAmount(installment.amountDue.second) }}</td>
          </tr>
          <tr>
            <td class="border">{{ formatDate(installment.dueDate.third) }}</td>
            <td class="text-end border">{{ formatAmount(installment.amountDue.third) }}</td>
          </tr>
          <tr>
            <td class="border">{{ formatDate(installment.dueDate.fourth) }}</td>
            <td class="text-end border">{{ formatAmount(installment.amountDue.fourth) }}</td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5">&nbsp;</td>
          <td class="text-end">{{ formatAmount(calculateTotal(installments, 'totalAmount')) }}</td>
        </tr>
      </tfoot>
    </table>

    <table class="table table-hover align-middle mt-4" v-else>
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Sale ID</th>
          <th scope="col">Name</th>
          <th scope="col">Purchase Date</th>
          <th scope="col">Due Date</th>
          <th scope="col" class="text-end">Amount Due</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="installment in installments" :key="installment.id">
          <td>{{ installment.id }}</td>
          <td>{{ installment.saleId }}</td>
          <td>{{ installment.name }}</td>
          <td>{{ formatDate(installment.purchaseDate) }}</td>
          <td>{{ formatDate(installment.dueDate) }}</td>
          <td class="text-end">{{ formatAmount(installment.amountDue) }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5">&nbsp;</td>
          <td class="text-end">{{ formatAmount(calculateTotal(installments, 'amountDue')) }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
  <div class="p-5 text-center border rounded empty" v-else>No Data</div>
</template>