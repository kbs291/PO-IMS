<script setup>
import { useInstallmentsStore } from '@/stores/installments';
import { storeToRefs } from 'pinia';
import { formatAmount } from '@/utils/formatAmount';
import { formatDate } from '@/utils/formatDate';
import { onMounted } from 'vue';

const installmentsStore = useInstallmentsStore();
const { installments } = storeToRefs(installmentsStore);

onMounted(async () => await installmentsStore.fetchInstallments());
</script>

<template>
  <h4 class="my-3">Installments</h4>

  <div class="table-responsive">
    <table class="table table-hover align-middle mt-4">
      <thead>
        <tr>
          <th scope="col">Sale ID</th>
          <th scope="col">Name</th>
          <th scope="col">Purchase Date</th>
          <th scope="col">Number of Cards</th>
          <th scope="col" class="text-end">Amount Due</th>
          <th scope="col">Due Date</th>
          <th scope="col">Status</th>
          <th scope="col">Payment Date</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <template v-for="(installment, index) in installments" :key="index">
          <tr>
            <td rowspan="4">{{ installment.salesId }}</td>
            <td rowspan="4">{{ installment.name }}</td>
            <td rowspan="4">{{ formatDate(installment.purchaseDate) }}</td>
            <td rowspan="4">{{ installment.numberOfCards }}</td>
            <td class="text-end border">{{ formatAmount(installment.amountDue.first) }}</td>
            <td class="border">{{ formatDate(installment.dueDates.first) }}</td>
            <td class="border">{{ installment.status.first }}</td>
            <td>{{ formatDate(installment.paymentDates.first) }}</td>
          </tr>
          <tr>
            <td class="text-end border">{{ formatAmount(installment.amountDue.second) }}</td>
            <td class="border">{{ formatDate(installment.dueDates.second) }}</td>
            <td class="border">{{ installment.status.second }}</td>
            <td>{{ formatDate(installment.paymentDates.second) }}</td>
          </tr>
          <tr>
            <td class="text-end border">{{ formatAmount(installment.amountDue.third) }}</td>
            <td class="border">{{ formatDate(installment.dueDates.third) }}</td>
            <td class="border">{{ installment.status.third }}</td>
            <td>{{ formatDate(installment.paymentDates.third) }}</td>
          </tr>
          <tr>
            <td class="text-end border">{{ formatAmount(installment.amountDue.fourth) }}</td>
            <td class="border">{{ formatDate(installment.dueDates.fourth) }}</td>
            <td class="border">{{ installment.status.fourth }}</td>
            <td>{{ formatDate(installment.paymentDates.fourth) }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>