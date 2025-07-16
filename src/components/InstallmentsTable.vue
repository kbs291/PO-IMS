<script setup>
import { useInstallmentsStore } from '@/stores/installments';
import { storeToRefs } from 'pinia';
import { formatAmount } from '@/utils/formatAmount';
import { formatDate } from '@/utils/formatDate';
import { onMounted } from 'vue';

const installmentsStore = useInstallmentsStore();
const { installments, getInstallments } = storeToRefs(installmentsStore);

onMounted(async () => await installmentsStore.fetchInstallments());
</script>

<template>
  <h4 class="my-3">Installments</h4>

  <section v-if="installments.length > 0">
    <div class="table-responsive">
      <table class="table table-striped-columns table-hover align-middle mt-4">
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
          <template v-for="installment in getInstallments" :key="installment.id">
            <tr>
              <td rowspan="4">{{ installment.saleId }}</td>
              <td rowspan="4">{{ installment.name }}</td>
              <td rowspan="4">{{ formatDate(installment.purchaseDate) }}</td>
              <td rowspan="4">{{ installment.numberOfCards }}</td>
              <td class="text-end border">{{ formatAmount(installment.amountDue.first) }}</td>
              <td class="border">{{ formatDate(installment.dueDate.first) }}</td>
              <td class="border">{{ installment.status.first }}</td>
              <td>{{ installment.paymentDate.first && formatDate(installment.paymentDate.first) }}</td>
            </tr>
            <tr>
              <td class="text-end border">{{ formatAmount(installment.amountDue.second) }}</td>
              <td class="border">{{ formatDate(installment.dueDate.second) }}</td>
              <td class="border">{{ installment.status.second }}</td>
              <td>{{ installment.paymentDate.second && formatDate(installment.paymentDate.second) }}</td>
            </tr>
            <tr>
              <td class="text-end border">{{ formatAmount(installment.amountDue.third) }}</td>
              <td class="border">{{ formatDate(installment.dueDate.third) }}</td>
              <td class="border">{{ installment.status.third }}</td>
              <td>{{ installment.paymentDate.fourth && formatDate(installment.paymentDate.fourth) }}</td>
            </tr>
            <tr>
              <td class="text-end border">{{ formatAmount(installment.amountDue.fourth) }}</td>
              <td class="border">{{ formatDate(installment.dueDate.fourth) }}</td>
              <td class="border">{{ installment.status.fourth }}</td>
              <td>{{ installment.paymentDate.fourth && formatDate(installment.paymentDate.fourth) }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </section>
  <section v-else>
    <div class="p-5 text-center border rounded empty">No Data</div>
  </section>
</template>