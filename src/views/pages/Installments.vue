<script setup>
import { computed, onMounted } from 'vue';
import { useInstallmentsStore } from '@/stores/installments';
import { useSalesStore } from '@/stores/sales';
import { storeToRefs } from 'pinia';
import InstallmentsTable from '@/components/table/InstallmentsTable.vue';

const installmentsStore = useInstallmentsStore();
const { installments } = storeToRefs(installmentsStore);
const salesStore = useSalesStore();
const { sales } = storeToRefs(salesStore);

onMounted(async () => { 
  /** 
   * Notes:
   * - Temporarily added fetchSales() to address empty table on page refresh
   * - Will remove this function once backend is ready
   */
  if (sales.value.length === 0) await salesStore.fetchSales();
  if (installments.value.length === 0) await installmentsStore.fetchInstallments();
});

const installmentsWithSaleGroup = computed(() => {
  let sortedInstallments = installments.value;
  sortedInstallments.map(installment => {
    installment.saleGroup = installments.value.filter(i => i.saleId === installment.saleId).sort((a, b) => a.dueDate - b.dueDate);
  });
  return sortedInstallments;
});
</script>

<template>
  <div class="card">
    <div class="card-title">Installments</div>
    <div class="card-content">
      <InstallmentsTable :installments="installmentsWithSaleGroup" />
    </div>
  </div>
</template>